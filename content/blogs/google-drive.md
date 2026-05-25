---
title: I Built My Own Google Drive. Here's How It Actually Works.
slug: google-drive
description: This blogs is about my idea and thoughts about how i built my own google drive. Here's how it actually works.

---


I got tired of depending on someone else's cloud. So I built my own — a full cloud
storage app where I can upload files, preview images and videos, download anything, and
manage storage, all on infrastructure I control. No Google. No Dropbox. Just me, some
code, and a few clever services stitched together. Let me walk you through exactly how I
did it, piece by piece.

## 1. The Big Picture — What Does This Thing Actually Do?

Before I get into the code, let me tell you what the app does from a user's perspective.
You sign up, you land on a clean dark dashboard, and you see an upload button. You drag
in your files — images, videos, PDFs, spreadsheets, whatever — and they show up in a
grid or list view. You can preview images and videos right in the browser, search through
your files, download them, or delete them. There's a storage bar that shows how much
space you've used out of your plan limit.

That's it. Simple, fast, and mine. But under the hood? There are three completely
separate systems working together to make this feel seamless. And honestly, figuring out
how to make them talk to each other was the hardest part.

## 2. The Three Pillars — My Tech Stack

Here's the thing most people don't realize about cloud storage: the files don't live in
your database. Your database doesn't store a single byte of your actual photos or
documents. It just keeps track of where they are. The real architecture has three layers,
and each one does exactly one job:

**Clerk** handles authentication — the sign-up, login, and "who is this person?" part. I
don't store passwords. I don't manage sessions. Clerk does all of that and sends me a
webhook every time something happens: a user signs up, updates their profile, or deletes
their account.

**AWS S3** is the actual warehouse. Every file you upload lands in an S3 bucket. It's
cheap, it's practically infinite, and it's designed to store files reliably. S3 doesn't
know anything about your users or plans — it just holds bytes.

**NeonDB (PostgreSQL)** is the brain. It keeps a record of every user, every file they
own, how much storage they've used, and what plan they're on. When you open the app and
see your files listed neatly, that's the database talking. When you hit your storage limit
and get blocked from uploading, that's the database enforcing the rules.

> **The key insight:** S3 stores the files. NeonDB remembers who owns them. Clerk decides
> who's allowed in. None of these three systems know about each other — my code is the glue.

## 3. How Uploads Actually Work — The Part That Surprised Me

Here's something I didn't know before building this: your files never pass through your
server. Seriously. When you click "Upload Files" in my app, the file goes directly from
your browser to AWS S3. My server never touches it.

How? Through something called a **presigned URL**. Here's the flow in plain English:

1. You pick a file.
2. My frontend asks the server: "hey, this user wants to upload a 4 MB PNG called
   `vacation.png` — is that cool?"
3. The server checks: Is this user logged in? Have they hit their file count limit? Will
   this push them over their storage limit?
4. If everything checks out, the server asks AWS to generate a temporary, one-time-use
   upload URL that expires in 60 seconds.
5. The server hands that URL back to the browser.
6. The browser uploads the file directly to S3 using that URL.
7. Once S3 confirms the upload, the browser calls the server again to say "it's done."
8. The server verifies the file actually landed in S3, records it in the database, and
   updates the user's storage counter.

Why go through all this trouble? Because if every file passed through my server, I'd need
a beefy (and expensive) server to handle the bandwidth. With presigned URLs, my server
just does the bookkeeping while S3 does the heavy lifting. It's the same pattern Google
Drive and Dropbox use under the hood.

## 4. The Database Schema — Where I Made It Smart

I'm going to be honest: I rewrote my database schema three times before I got it right.
The first version had storage limits hardcoded directly on the user row. That worked until
I realized I'd have to update every single user row if I ever changed the free plan limits.
Terrible idea.

So I created a separate `plans` table. It has two rows right now — "free" and "pro." The
free plan gets 2 GB of storage and 25 files. The pro plan gets 50 GB and practically
unlimited files. Every user has a `plan_id` column that points to one of these plans. If I
ever want to change the free tier to 5 GB, I update one row in the `plans` table and every
free user instantly gets the new limit. No migration scripts. No loops. One SQL statement.

The `files` table is straightforward — it stores the S3 key (the path to the file in the
bucket), the original filename, the size in bytes, and the MIME type. The important part is
the foreign key: every file row points back to a user, and I set it up with
`ON DELETE CASCADE`. That means if a user is deleted from the database, all their file
records vanish automatically.

> **Lesson learned:** Never hardcode limits on individual rows when those limits belong to
> a category. Put them in a reference table and point to it. Future you will be grateful.

## 5. The Hardest Bug — Orphaned Files

This was the sneakiest problem I ran into, and it took me a while to even realize it
existed. Here's the scenario: a user deletes their account. Clerk fires a webhook. My
server deletes the user from NeonDB. CASCADE wipes all their file records. Done, right?

Wrong. The actual files are still sitting in S3. NeonDB can't send API calls to AWS — it's
a database, not an application server. So now I have files in S3 that no one knows about, no
one can see, and no one can delete through the app. But AWS still charges me for storing
them. These are called **orphaned files**, and at scale they can silently eat your budget.

The fix was simple once I understood the problem. Before deleting the user from the
database, my webhook handler now lists every file under that user's S3 prefix and deletes
them all in batches. Only after S3 is completely clean does it delete the user row from
NeonDB. Order matters here — if I deleted the database row first, I'd lose the references I
need to find the S3 files.

For regular file deletions through the app UI, this was never a problem. My delete function
already removes the file from S3 first, then deletes the database row and decrements the
storage counter, all in one go. The issue was only with account deletions, where the
database cascade was doing the cleanup without telling S3.

## 6. The Frontend — Making It Feel Like a Real Product

I built the UI in Next.js with React, and I'll admit I spent way too long on it. But I
wanted it to feel like something you'd actually want to use, not a weekend project that
looks like one. Dark theme, grid and list views, a search bar that filters in real time, a
kebab menu on each file with download and delete options, and a full-screen file previewer
for images, videos, and PDFs.

One thing I'm proud of: the delete flow. When you hit delete, you get a confirmation modal
(because accidental deletes are painful). But I also did optimistic updates — the file
disappears from the UI instantly before the server confirms the deletion. If the server
call fails, the file list refreshes to restore it. This makes the app feel snappy even
though there's a network round-trip happening in the background.

Uploads support multiple files at once. You select a batch, they all upload in parallel
using `Promise.all`, and when they're all done, the file list refreshes and the storage
counter updates. If any single upload in the batch fails — say you hit your storage limit
halfway through — the error surfaces clearly and the successful uploads still go through.

## 7. Security — The Stuff You Don't See

Every server action starts with the same line: check if the user is authenticated. If not,
throw "Unauthorized." But there's a second layer that's just as important — I verify that
the S3 key being operated on actually belongs to the logged-in user. Every file in S3 lives
under the path `uploads/{userId}/`. So when someone tries to delete or download a file, my
server checks that the key starts with their user ID prefix. Without this check, a malicious
user could potentially pass someone else's file key and delete their stuff.

The presigned upload URLs are also locked down. They expire in 60 seconds, are restricted to
the exact file size the user declared, and the content type must match. You can't request an
upload URL for a 1 KB file and then upload a 1 GB file — S3 will reject it.

For downloads, I generate short-lived signed URLs with a `Content-Disposition` header set to
"attachment." This means clicking download actually downloads the file instead of opening it
in a new tab. Small detail, but it matters for user experience.

## What I'd Do Next

This is a real, working app. But if I were to keep building, here's what I'd add:

- **A garbage collector script.** A cron job that runs weekly, lists every object in the S3
  bucket, checks if each one still has a matching database record, and deletes any orphans.
  This is a safety net for edge cases — maybe a server action crashed halfway through, or a
  webhook got dropped. The garbage collector catches whatever falls through the cracks.
- **Folders and organization.** Right now every file lives in a flat list. Adding virtual
  folders would just mean adding a "folder" column to the `files` table and filtering by it.
  S3 doesn't actually have folders — it's all just key prefixes — so the folder structure
  would live entirely in the database.
- **Stripe integration for the Pro plan.** The `plans` table is already there, the limits are
  already enforced. All that's missing is a payment flow that flips the user's `plan_id` from
  "free" to "pro" after a successful checkout.
- **File sharing with signed links.** Generate a time-limited URL that anyone can use to
  download a specific file, even without an account. The infrastructure already supports this
  — I just need a UI for it.

> **The bottom line:** You don't need to be a cloud architect to build your own cloud storage.
> You need a file bucket, a database, an auth provider, and the patience to figure out how they
> fit together. The hard part isn't any single piece — it's making sure they stay in sync when
> things go wrong.

If you're thinking about building something like this yourself, just start. Pick your stack,
get uploads working first, and solve problems as they come. You'll learn more about cloud
infrastructure in one weekend of building than in a month of reading about it.

---

## Written by

**Kinshuk Jain**

- Website — [cloudkinshuk.in](https://cloudkinshuk.in)
- LinkedIn — [linkedin.com/in/kinshukjainn](https://www.linkedin.com/in/kinshukjainn/)
- X (Twitter) — [@realkinshuk004](https://x.com/realkinshuk004)
