---
title: How i use AI in my workbench/workspace
slug: ai-view
description: In this blog i will be talking/discussing about that how i use ai in my daily workload and how i speed up my development
---

## How artificial intelligence has changed the development ?

From past **2 yrs** the way of developing a product/project has changed rapidly and it has become much more faster and optmized. Due to artificial intelligence the amount code written in a particular amount of time has been increasing exponentially , becuase of that the ability to push multiple features or to create a multiple pr has been increased.

These changes has made each of us to use ai **aggressively** in our workload to **speed up our work effieciently** . There is a catch also as we are increasing its use , we are also using ai for the workloads or the task about **which we dont have any knowledge or context**. This shift has created a lot of decline in the critical thinking of human being that how a human brain is designed to always think critically in difficult situation/task.

## How i use ai in different ways to boost my workload/development

### - **For building UI/UX**

This is the peak thing i have done in my workspace. Building UI and design on your own is a good brainstorming with css and graphics but also at the same time its frustrating. As css is complex and not easy to get with i choose to write css for the ui development with ai , and it increased my speed of developing the ui.

I use to give long prompts to [`chatgpt`](https://chatgpt.com) , [`claude`](https://claude.ai) , `perplexity` and many more to create ui on my instructions and designs provided by me. By providing them images of other websites as references to create different and unique designs it use to be much easier to get the same result i always wanted to build. The ui which i created with ai made more eager to try different designs of ui of different companies.

**For Example:**

> 1. In my portfolio once i tried to mimic and painted the ui of **android 17** which is based on **marterial 3 design** , i was not able to copy the whole design but reached upto the mark .
> 2. Once i was building a **cloud storage platfrom Kosha** , in which i tried to clone the ui of `linode cloud` and also `google cloud` just to give a better look to it and then created my own design out of it by blending them into one.

### - **For db scripts**

As for all my projects from the starting i was using sql database. The biggest reason of using sql database in my project i mention in my early blog [`Why i used postgress SQL in projects`](https://cloudkinshuk.in/blogs/db-sql) . In that blog i listed all reasons to use sql db . Now how i used ai for this , simple thing was that i use to explain comepete schema to ai and all the fields then ai use to give me structured sql script to copy paste and db created. Now which ORM i used ? so i used NeonDB for my sql which is called serverless DB.

- **What i use to explain in my prompts ?**

The details i use to give it to the ai for building the proper database schema were :
`all the schema fields` , `field types` , `what rules to apply` , `what kind of field it will be` , `how many tables there will be` , `what will be the tables name` , `which field table should be connected to which feild`

By giving detailed prompting and this much details the chances of getting an error or halcination of an ai reduces a lot , as it has all the context of what the user needs.

**For Example**

Here is a demo prompt shown below :

**1. Prompt Format**

```bash
ROLE        → Who the AI should act as
APP CONTEXT → What the application does and who uses it
ENTITIES    → Main things you need to store
RELATIONSHIPS → How those things connect
ACCESS PATTERNS → How data will be read/written most often
SCALE       → Expected volume, growth, traffic
TECH STACK  → Database engine, ORM, language
CONSTRAINTS → Business rules, compliance, performance needs
OUTPUT FORMAT → What you want back (DDL, ERD, explanation...)

```

**2. Formated Prompt**

**Example application:** An online food-delivery platform

```text
You are a senior database architect with 15+ years of experience designing
production-grade schemas.

## Application
I'm building a food-delivery platform (like Zomato/Swiggy) for the Indian market.
Users browse restaurants, place orders, pay online, and track delivery.
Restaurants manage menus; delivery partners accept and complete deliveries.

## Core Entities (initial list)
- Users (customers, restaurant owners, delivery partners, admins)
- Restaurants and their branches
- Menu categories, menu items, item variants (size, add-ons)
- Orders and order items
- Payments and refunds
- Delivery assignments and live location tracking
- Ratings and reviews
- Coupons and promotions
- Addresses

## Key Business Rules
- A user can have multiple saved addresses.
- An order contains items from exactly ONE restaurant branch.
- Menu item prices can change; past orders must keep the price at time of purchase.
- An order has a status lifecycle: placed → accepted → preparing → picked_up → delivered / cancelled.
- A payment can be partially refunded.
- Coupons have usage limits (global and per-user) and expiry dates.
- Soft-delete is required for users, restaurants, and menu items.

## Access Patterns (most frequent queries)
1. Fetch all menu items for a restaurant (very frequent, read-heavy).
2. Fetch a user's last 20 orders with items.
3. Find nearby restaurants by latitude/longitude.
4. Update delivery partner location every 5 seconds.
5. Daily revenue report per restaurant.

## Scale
- 2 million users, 50,000 restaurants
- ~500,000 orders/day at peak
- Location updates: ~100,000 writes/minute

## Tech Stack
- Primary DB: PostgreSQL 16
- Location tracking: open to a different store if better (suggest one)
- Backend: Node.js with Prisma ORM

## Non-Functional Requirements
- Must support audit trails (who changed what, when).
- GDPR/DPDP-style user data deletion.
- Optimize for read performance on menus and order history.

## What I Want Back
1. An ER diagram in Mermaid syntax.
2. Complete `CREATE TABLE` SQL with data types, PKs, FKs, constraints, defaults.
3. Recommended indexes, each with a one-line reason tied to an access pattern above.
4. Normalization decisions: where you denormalized and why.
5. Partitioning/sharding strategy for high-volume tables.
6. Which data should NOT live in PostgreSQL, and what to use instead.
7. A list of trade-offs, risks, and things I should clarify with my team.
8. Ask me clarifying questions first if anything is ambiguous.
```

- **Ai giving its own schema**

The big mistake which offten many developers make is that they trust ai blindly. Never give ai the access and full freedom to create its own `db` for your vague requirements. This can make ai doing a lot of mistakes , also creating a wrong `schema` for the application can result in serious problems and `errors`.

### - Asking how it works

Now everytime i write a code whether its a frontend code or backend code its written by ai even though we have prompted it. But after the ai has wrote the code and finished even though its working i always ask ai that **"how this code works"**.

The reasons for which i ask "How it works" are listed below :

- Because it makes me understand that what code ai has written
- Atleast the code which is there is not a ghost for me , like if someone ask me then atleast i can explain overview of the code that whats happening.
- This gives more awareness of my project overall and also i learn new things as i am developing projects.

## My Final thoughts

The real summary of this blog is that , i have been using ai in those parts of my workspace where i had complete knowledge and context and made my work and developement much faster and optimized

**Follow for more**

- [cloudkinshuk.in](https://cloudkinshuk.in)
- [x.com/@realkinshuk004](https://x.com/@realkinshuk004)
- [blogs](https://cloudkinshuk.in/blogs)
- [Email@kinshuk](kinshuk25jan04@gmail.com)
