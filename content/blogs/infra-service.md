---

title: Different architectures in AWS I have been using for my projects
slug: infra-service
description: This article shows how I have been using AWS services in my projects from an infrastructure and cost-optimization perspective.
---

# Different architectures in AWS I have been using for my projects

When I started building applications with AWS, I initially looked at cloud services mainly as tools that I could connect to my application. Over time, I started looking at them differently.

Instead of asking only **"Which AWS service can I use?"**, I started asking:

> **"What responsibility should this service have in my infrastructure, and why should I use it instead of putting everything on my application server?"**

That change in thinking helped me understand AWS architecture much better.

In my recent projects, I have worked with services such as **Amazon S3, AWS Lambda, API Gateway, CloudWatch, Amplify, Route 53, IAM, CloudFront, and Amazon Bedrock**. I have also used external services such as PostgreSQL/NeonDB and Clerk for database and authentication requirements.

This article is not about describing my projects one by one. Instead, I want to explain **how I think about each AWS service as an infrastructure component**, why I use it, how it fits into an architecture, and where I try to avoid unnecessary infrastructure and cost.

---

# 1. Amazon S3 — My storage layer

One of the AWS services I have used most directly is **Amazon S3**.

For applications that need to store files, S3 is a natural fit because I don't need to run my own file server or attach storage to an application server just to store user uploads.

The important thing for me is that I don't think of S3 as simply:

> "A place where files are stored."

I think of it as a **separate storage layer in the infrastructure**.

A simplified architecture looks like:

```text
User
  │
  │ Upload
  ▼
Application
  │
  │ Generate secure upload URL
  ▼
S3
```

The application is responsible for deciding **who is allowed to upload what**, while S3 is responsible for actually storing the object.

This separation is important because file storage can grow independently from the application itself.

If my application server had to receive every uploaded file and then forward it to storage, the server would become unnecessarily involved in transferring potentially large amounts of data.

Instead, I prefer the architecture where the browser communicates directly with S3.

---

# 2. Presigned URLs — Removing file traffic from the application

One of the most useful patterns I have implemented with S3 is **direct browser-to-S3 uploads using presigned URLs**.

The architecture looks like:

```text
                  ┌──────────────┐
                  │   Browser    │
                  └──────┬───────┘
                         │
                 Request upload URL
                         │
                         ▼
                  ┌──────────────┐
                  │  Application │
                  └──────┬───────┘
                         │
                  Generate presigned URL
                         │
                         ▼
                  ┌──────────────┐
                  │      S3      │
                  └──────────────┘
                         ▲
                         │
                  Direct file upload
                         │
                         │
                      Browser
```

This is one of the places where infrastructure decisions have a direct impact on application performance.

The application server does not need to receive the complete file and then upload it again to S3.

Instead, the application generates a temporary URL with controlled access, and the browser uploads the file directly to S3.

I used this architecture in my personal cloud storage platform, where the application is designed around direct browser-to-S3 uploads.

From an infrastructure perspective, I like this approach because **the application layer does not become the bottleneck for file transfer**.

It also means that storage and application compute can scale independently.

---

# 3. AWS Lambda — Compute without maintaining servers

Another service I use heavily is **AWS Lambda**.

The main reason I use Lambda is not simply because it is "serverless."

The bigger reason is that many parts of my applications do not require a continuously running server.

For example:

```text
API Request
    ↓
API Gateway
    ↓
Lambda
    ↓
Process request
    ↓
Response
```

Instead of running a Node.js server continuously and paying for that compute capacity even when there are no requests, I can execute the required code when an event occurs.

This is especially useful for APIs, event processing, automation, and small backend operations.

In my fault detection system, I used Lambda together with API Gateway and CloudWatch to create cloud-native processing and monitoring workflows.

---

# 4. Lambda from a cost perspective

Cost is one of the reasons I prefer serverless architecture for many of my smaller applications.

With a traditional server-based architecture, I need to think about:

```text
Server
CPU
Memory
Operating System
Scaling
Availability
Patching
Idle capacity
```

With Lambda, the infrastructure responsibility changes.

I primarily think about:

```text
Function
Memory
Execution time
Invocations
Concurrency
```

This doesn't mean Lambda is automatically cheaper in every possible situation.

If an application has constant, predictable, heavy workloads, other compute options may make more sense.

For my projects, where workloads can be event-driven or relatively variable, Lambda lets me avoid introducing infrastructure that I don't actually need.

The important principle is:

> **I don't want to pay for infrastructure simply because my application might need it. I want the infrastructure to match the workload whenever possible.**

---

# 5. API Gateway — The entry point for backend APIs

When Lambda becomes the compute layer, I need something that can expose those functions as APIs.

This is where **Amazon API Gateway** comes into the architecture.

A common pattern I use is:

```text
Client
  │
  ▼
API Gateway
  │
  ▼
Lambda
  │
  ▼
Application logic
```

API Gateway gives me an API-facing layer instead of exposing Lambda directly to clients.

This creates a clean separation:

```text
Internet
   ↓
API Layer
   ↓
Compute Layer
```

In my fault detection system, API Gateway is part of the cloud-native architecture alongside Lambda and CloudWatch.

From an infrastructure perspective, I prefer this separation because API management and application computation become two different responsibilities.

---

# 6. API Gateway + Lambda is a useful serverless boundary

I usually think of API Gateway and Lambda as a pair.

API Gateway handles the API-facing side while Lambda handles the actual backend execution.

For example:

```text
GET /faults
       │
       ▼
API Gateway
       │
       ▼
Lambda
       │
       ▼
Process / retrieve data
       │
       ▼
JSON response
```

This architecture also makes it easier to think about individual responsibilities.

If something goes wrong, I can ask:

> Is the request reaching API Gateway?

> Is API Gateway successfully invoking Lambda?

> Is Lambda failing?

> Is the backend logic failing?

> Is the downstream service failing?

This separation becomes very useful when monitoring and debugging.

---

# 7. AWS Amplify — Simplifying application deployment

I have also used **AWS Amplify** for deploying my web applications.

For me, the value of Amplify is primarily operational simplicity.

When building a web application, I don't necessarily want to spend time manually configuring every component of the deployment infrastructure.

A simplified architecture is:

```text
Git Repository
      │
      ▼
AWS Amplify
      │
      ▼
Web Application
```

Amplify gives me a managed way to connect the application deployment process with my frontend project.

This is particularly useful for personal projects because I can keep my infrastructure relatively simple while still having a repeatable deployment process.

---

# 8. Why I don't put everything on one server

One of the biggest architectural decisions I have gradually moved toward is **separating responsibilities**.

A simple traditional architecture might look like:

```text
                    One Server
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Frontend       Backend        Files
```

It may work, but everything becomes dependent on the same infrastructure.

My AWS-based approach is more like:

```text
Frontend
   │
   ▼
Amplify / CloudFront
   │
   │
   ├──────────────► API Gateway
   │                    │
   │                    ▼
   │                 Lambda
   │
   └──────────────► S3
```

Now different responsibilities can scale independently.

The frontend doesn't need to be responsible for backend execution.

The backend doesn't need to transfer large files.

Storage doesn't need to run on the application server.

This separation is one of the main reasons I prefer cloud-native architectures.

---

# 9. Amazon CloudFront — Putting a distribution layer in front

Another service in my AWS skill set is **Amazon CloudFront**.

I think of CloudFront as a distribution and caching layer between users and the origin.

Conceptually:

```text
User
  │
  ▼
CloudFront
  │
  ▼
Origin
```

The reason I would put a CDN layer in front of content is that users may be geographically far away from the infrastructure serving that content.

Instead of every request always going directly to the origin, CloudFront can serve cached content from its edge locations when appropriate.

From an infrastructure perspective, this can improve:

* Latency
* Content delivery performance
* Origin load
* Scalability

But I don't treat CloudFront as something I automatically add to every application.

If an application is tiny and the additional complexity does not provide a meaningful benefit, adding another layer simply because it is an AWS service doesn't necessarily make sense.

---

# 10. Route 53 — Connecting domains to infrastructure

I use **Amazon Route 53** as the DNS layer for applications.

The important thing about DNS is that it creates the connection between a human-readable domain and the infrastructure behind it.

Conceptually:

```text
example.com
     │
     ▼
Route 53
     │
     ▼
AWS infrastructure
```

The application itself shouldn't need to know that users are accessing some complicated AWS endpoint.

Users should be able to use a proper domain while Route 53 handles the DNS resolution.

This also gives me flexibility because the infrastructure behind the domain can change without changing what users type into the browser.

---

# 11. IAM — The service I don't want to ignore

If there is one AWS service that affects almost every other AWS service, it is **IAM**.

IAM determines who or what is allowed to perform an action.

I think about IAM using a simple question:

> **Who is trying to do what, and on which resource?**

For example:

```text
Lambda
   │
   ▼
IAM Role
   │
   ▼
Permission
   │
   ▼
S3
```

Lambda should not automatically have access to every AWS resource.

It should receive only the permissions it needs.

For example, if a function only needs to read objects from S3, I don't want to give it broad administrative access to the entire AWS account.

This is both a security principle and an architectural principle.

---

# 12. Least privilege as an infrastructure decision

I try to think about IAM permissions as part of the architecture rather than something I configure at the end.

Suppose my application contains:

```text
API Gateway
     ↓
Lambda
     ↓
S3
```

The Lambda function might need access to a specific S3 bucket or specific operations.

The architecture should therefore look conceptually like:

```text
Lambda
  │
  └── IAM Role
         │
         └── Specific S3 permissions
```

Instead of:

```text
Lambda
  │
  └── Administrator access to everything
```

The second approach may make development easier temporarily, but it creates unnecessary security risk.

---

# 13. CloudWatch — Observability rather than just logging

I use **Amazon CloudWatch** as the monitoring and observability layer in my AWS architecture.

A system that works is not necessarily a system that I can operate.

I want to know:

```text
Is the application running?
Are requests failing?
Is Lambda producing errors?
Are there unusual patterns?
What happened before a failure?
```

CloudWatch gives me a place to collect and inspect logs and metrics.

A simplified architecture becomes:

```text
Application
    │
    ├── Logs
    │
    ├── Metrics
    │
    ▼
CloudWatch
```

For my fault detection work, monitoring is particularly important because the purpose of the system itself is to identify abnormalities and potential failures.

This creates an interesting relationship between the application and the infrastructure:

> **The application processes the problem, while the infrastructure also needs to tell me whether the application itself is healthy.**

---

# 14. Amazon Bedrock — AI as another infrastructure component

For my AI-oriented work, I have also used **Amazon Bedrock**.

I don't think of Bedrock as just "an AI API."

From an infrastructure perspective, it becomes another managed capability that my application can consume.

A simplified architecture can look like:

```text
Application
     │
     ▼
Backend / Lambda
     │
     ▼
Amazon Bedrock
     │
     ▼
Model inference
```

This allows the application to use foundation models without me having to manage the underlying model-serving infrastructure myself.

That fits the same architectural philosophy I use elsewhere:

> **Use managed infrastructure when managing that infrastructure myself would not provide enough value.**

---

# 15. Combining the services

Once these services are considered individually, they start forming a larger infrastructure pattern.

A simplified architecture based on the AWS services I have been working with can look like:

```text
                         USERS
                           │
                           ▼
                    ┌─────────────┐
                    │ CloudFront  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Amplify   │
                    └──────┬──────┘
                           │
               ┌───────────┴───────────┐
               │                       │
               ▼                       ▼
        API Gateway                    S3
               │                       ▲
               ▼                       │
            Lambda              Direct Upload
               │
        ┌──────┴───────┐
        │              │
        ▼              ▼
    Application     Bedrock
      Logic
        │
        ▼
   External DB /
   Data Services

        └──────────────┐
                       ▼
                  CloudWatch

Route 53
   │
   └── DNS → Application Infrastructure

IAM
   │
   └── Controls access across AWS resources
```

This isn't one single architecture that I use for every project.

Rather, these are building blocks that I choose depending on the problem I am solving.

---

# 16. Cost optimization is about avoiding unnecessary infrastructure

When I think about cost optimization, I don't think only about finding the cheapest AWS service.

I think about **not creating infrastructure that I don't need in the first place**.

For example, if a workload can be handled by Lambda, I don't necessarily need a continuously running server.

If files can be uploaded directly to S3, I don't need my backend to act as a file-transfer server.

If content can be cached at the edge, I don't want every request to unnecessarily reach the origin.

If I can use a managed service instead of maintaining the infrastructure myself, I consider whether the operational simplicity is worth the service cost.

This leads to a general principle:

> **Cost optimization starts at the architecture level, not at the billing page.**

---

# 17. But "serverless = cheap" is not always true

I also don't think serverless should automatically be considered the cheapest option.

Every architecture has trade-offs.

For example, Lambda is excellent for many event-driven workloads, but if I have a continuously running, predictable workload, another compute model might be more appropriate.

Similarly, adding CloudFront, API Gateway, multiple services, or additional infrastructure layers can introduce additional costs and operational complexity.

Therefore, my approach is not:

> "Use as many AWS services as possible."

It is:

> **"Use the smallest architecture that properly solves the problem, and introduce additional infrastructure when there is a clear reason for it."**

---

# 18. Why I prefer managed services

One pattern that appears repeatedly in my AWS architecture is the use of managed services.

Instead of managing:

```text
Servers
Operating systems
Patching
Scaling
Networking
Storage servers
Monitoring infrastructure
```

my preference is often to use managed AWS capabilities where they make sense.

For example:

```text
Storage       → S3
Compute       → Lambda
API layer     → API Gateway
Monitoring    → CloudWatch
DNS           → Route 53
CDN           → CloudFront
AI            → Bedrock
Deployment    → Amplify
```

This doesn't remove engineering responsibility.

It changes where the engineering effort goes.

Instead of spending most of my time maintaining infrastructure, I can focus more on:

* Application logic
* Security
* Data flow
* Reliability
* User requirements
* Observability
* Architecture

---

# 19. Infrastructure should follow the application requirement

One thing I have learned from working with these services is that there is no single "AWS architecture."

The architecture should come from the requirements.

If I need file storage:

```text
S3
```

If I need an API:

```text
API Gateway
+
Lambda
```

If I need monitoring:

```text
CloudWatch
```

If I need DNS:

```text
Route 53
```

If I need global content delivery:

```text
CloudFront
```

If I need AI model capabilities:

```text
Bedrock
```

If I need secure access:

```text
IAM
```

The services are not the architecture by themselves.

**The architecture is the relationship between these services and the problem I am solving.**

---

# 20. What I have learned from building this way

The biggest change in my thinking has been moving from:

> "I need to deploy my application somewhere."

to:

> **"What should each part of my application be responsible for?"**

Once I think this way, the architecture becomes easier to design.

The frontend doesn't need to store files.

The backend doesn't need to transfer every file.

The API layer doesn't need to contain all the application logic.

The storage layer doesn't need to know about the UI.

The monitoring system doesn't need to be part of the application logic.

Each service gets a specific responsibility.

That separation makes the system easier to reason about.

---

# Final thoughts

The AWS services I have been using are not just a collection of technologies that I put on my resume. Each one represents a particular infrastructure decision.

**S3** gives me a dedicated object storage layer.

**Lambda** gives me event-driven compute without maintaining servers.

**API Gateway** provides an API boundary between clients and backend logic.

**Amplify** simplifies application deployment.

**CloudFront** provides a distribution and caching layer when it is useful.

**Route 53** provides the DNS layer.

**IAM** controls access between users, applications, and AWS resources.

**CloudWatch** provides the visibility needed to understand what is happening inside the system.

**Bedrock** gives my applications access to managed AI capabilities without requiring me to operate model-serving infrastructure myself.

The most important lesson for me has been that **AWS architecture is not about using the maximum number of services. It is about assigning the right responsibility to the right component.**

When I design infrastructure now, I try to ask three questions:

> **What problem am I solving?**

> **What is the simplest AWS architecture that solves it properly?**

> **Can I make that architecture secure, observable, scalable, and cost-conscious?**

That is how I have been approaching AWS in my projects, and it has also changed the way I think about cloud infrastructure in general.
