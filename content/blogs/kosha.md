# Kosha — Your Personal Cloud Storage

A real cloud storage platform  where your files never touch my server.

Not a tutorial clone. Not a Firebase wrapper. A from-scratch reverse-engineering of the architecture behind Dropbox and Google Drive  built by a student to actually understand how the real thing works.

**Stack:** Next.js 16 · TypeScript 5 · React 19 · AWS S3 · PostgreSQL (NeonDB) · Clerk · Tailwind CSS 4

[Creator](https://cloudkinshuk.in) · [How I built this](https://cloudkinshuk.in/home-blog/blogG) · [Leave feedback](https://clkfeedbacks.cloudkinshuk.in)

---

## The Problem with Most "Cloud Storage" Tutorials

Every cloud storage tutorial online stores files on the server, drops them in a folder, and calls it done. That breaks the moment two users sign up.

I wanted to understand how the *real* thing works — the architecture serving billions of files without melting. So I built it properly.

---

## How It Actually Works

When a user uploads a file, **the server never sees a single byte**. Here's the flow:

```
┌──────────┐   1. "Can I upload?"     ┌──────────┐
│  Browser │ ───────────────────────► │  Server  │
└──────────┘                          └────┬─────┘
                                           │ checks identity, quota, plan tier
                                           │ generates 60s presigned URL
┌──────────┐   2. presigned S3 URL    ┌────▼─────┐
│  Browser │ ◄─────────────────────── │  Server  │
└────┬─────┘                          └──────────┘
     │ 3. PUT file directly to S3
     ▼
┌──────────┐
│  AWS S3  │
└────┬─────┘
     │ 4. confirms delivery
     ▼
┌──────────┐   5. verify + record     ┌──────────┐
│  Server  │ ───────────────────────► │ Postgres │
└──────────┘    (atomic transaction)  └──────────┘
```

The server's job is just to be the **gatekeeper and bookkeeper** — never the pipe. That's the same pattern Google Drive and Dropbox use.

---

## Highlights

- **Zero-touch uploads** — files travel browser → S3 directly via presigned URLs that self-destruct in 60 seconds.
- **Quota enforcement** — per-user storage and file-count limits are checked *before* the presigned URL is issued, not after the upload.
- **Plan tiers via reference table** — limits live in a `plans` table, not hardcoded per-row. Migrating tiers means one row change, not a backfill.
- **Atomic storage accounting** — verification, file record insert, and storage-counter update happen in a single PostgreSQL transaction. No drift.
- **Orphaned-file cleanup** — when a user deletes their account, a Clerk webhook purges every S3 object under their prefix *before* the database cascade fires. Order matters: delete the references first and you've lost the map to the files.
- **Search** — fuzzy client-side search over file metadata via Fuse.js.

---

## Tech Stack

| Layer           | Choice                                   |
| --------------- | ---------------------------------------- |
| Framework       | Next.js 16 (App Router) + React 19       |
| Language        | TypeScript                               |
| Auth & webhooks | Clerk + Svix                             |
| Storage         | AWS S3 (presigned PUT)                   |
| Database        | NeonDB (serverless PostgreSQL)           |
| Styling         | Tailwind CSS v4                          |
| Animation       | Framer Motion                            |
| Search          | Fuse.js                                  |

---

## Getting Started

### Prerequisites

- Node.js 20+
- An AWS account with an S3 bucket and an IAM user with `s3:PutObject`, `s3:GetObject`, and `s3:DeleteObject` permissions
- A NeonDB (or any PostgreSQL) database
- A Clerk application

### Installation

```bash
git clone https://github.com/<your-username>/kosha.git
cd pvtcldstrg
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# AWS S3
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=your-bucket-name

# Redis
UPSTASH_REDIS_REST_URL=https://xxxx-xxx1234.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxrrrrrrrYTFkZTNlYTE5MzY0YWIwOQ
```

### S3 Bucket CORS

Your bucket needs to allow direct browser uploads:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedOrigins": ["http://localhost:3000", "https://your-domain.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### Run It

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Wire Up the Clerk Webhook

Point your Clerk dashboard's webhook to `https://your-domain.com/api/webhooks/clerk` and subscribe to at least `user.created` and `user.deleted`. The deletion handler is what keeps S3 from filling with ghost files.

---

## Project Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

---

## A Note on AI

I used AI heavily building this — specifically Claude. But not the way people assume. I didn't paste *"build me a Google Drive"* and copy the output. That doesn't work for something like this.

I'd hit a wall  understanding presigned URLs, or chasing down why my storage counter was drifting  and dump my actual code into the conversation asking *"what's wrong here?"* It would spot the architectural flaw I was too close to see. The migration from hardcoded limits to a `plans` reference table came from a conversation where I explained my problem and got walked through *why* a reference table beats per-row limits. The orphaned-files fix was the same  I described the symptom, got the root cause back.

**AI didn't build this. I did.** AI was the senior engineer I didn't have access to  available at 2 AM when I was stuck, patient enough to explain concepts three different ways, honest enough to say my first approach was bad.

If you're a student thinking about building: stop watching tutorials. Pick a real product, figure out *why* it works the way it does, and rebuild it. Use AI as a thinking partner, not a vending machine. That's where the learning lives.

Full write-up → [How I built this](https://cloudkinshuk.in/home-blog/blogG)

---

## Connect

- **Portfolio:** [cloudkinshuk.in](https://cloudkinshuk.in)
- **Blog:** [cloudkinshuk.in/home-blog](https://cloudkinshuk.in/home-blog)
- **Twitter:** [@realkinshuk004](https://twitter.com/realkinshuk004)
- **Email:** [kinshuk25jan04@gmail.com](mailto:kinshuk25jan04@gmail.com)
- **Feedback:** [clkfeedbacks.cloudkinshuk.in](https://clkfeedbacks.cloudkinshuk.in)

---

## License

MIT — do whatever, just don't sell it as your own.

---

*Built by [Kinshuk Jain](https://cloudkinshuk.in) · The app is live. The code is real. I understand every line because I fought for each one.*
