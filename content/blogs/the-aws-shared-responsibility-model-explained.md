---
title: The AWS shared responsiblity model explained 
slug: the-aws-shared-responsibility-model-explained
description: This blogs is about my thoughts and clear explaination of how  the AWS shared responsiblity model works
---


Managing a cloud environment can be compared to leasing office space in a modern
commercial building. As the tenant (Customer), you are responsible for your
operations within the space. AWS, as the building owner, maintains the structure,
utilities, and core infrastructure. If there's a structural issue with the building,
that falls under AWS's purview. However, if sensitive documents are left unsecured
in an unlocked office, that responsibility lies with you as the tenant.

## I. The Foundation: Security OF the Cloud (AWS's Responsibility)

Before examining your responsibilities, it's important to understand what AWS
manages. They handle the "Security OF the Cloud," which encompasses the physical and
foundational infrastructure layer. Think of this as the building's foundation,
security perimeter, and essential utilities.

**Physical Infrastructure:** AWS manages and secures the actual data centers. This
includes physical access controls, environmental systems, and hardware maintenance.
You don't need to concern yourself with physical security measures — AWS employs
comprehensive security protocols including biometric access controls and 24/7
monitoring.

**The Virtualization Layer:** AWS manages the hypervisors that partition physical
hardware into virtual instances. They ensure proper isolation between customers,
preventing any cross-tenant access or data leakage.

**Global Infrastructure:** This includes Regions, Availability Zones, and Edge
Locations. AWS ensures redundancy and availability, similar to a building having
backup power generators and multiple emergency exits to maintain operations during
disruptions.

## II. Customer Responsibility: Security IN the Cloud

This is where your active management becomes essential. AWS provides the
infrastructure and tools; you determine how to configure and use them. Here are the
core principles of **Customer Responsibility** within the shared model.

### 1. Data Protection and Encryption

AWS provides robust encryption tools (such as KMS and CloudHSM), but implementing
them is your responsibility. Storing sensitive information without encryption is
analogous to leaving confidential files on an unlocked desk in a shared workspace.

- **Client-side Encryption:** Encrypt data before transmission to AWS services,
  ensuring data is protected throughout its lifecycle.
- **Server-side Encryption:** Enable encryption at rest for your data stores. AWS
  makes this straightforward with simple configuration options that should be
  implemented as standard practice.

### 2. Identity and Access Management (IAM)

Identity and Access Management (IAM) functions as your organization's access control
system. Granting excessive permissions is comparable to distributing master keys to
every employee — it creates unnecessary security exposure.

- **Principle of Least Privilege:** Grant users and services only the minimum
  permissions necessary to perform their designated functions.
- **Multi-Factor Authentication (MFA):** MFA should be considered mandatory, not
  optional. Relying solely on passwords in today's security landscape is insufficient
  protection.

### 3. Operating System and Application Maintenance

When running EC2 instances (virtual servers), you own the operating system layer. AWS
does not perform automatic system updates or security patches on your behalf  this
falls under your operational responsibility.

- **OS Maintenance:** You must implement regular security patches and system updates
  to maintain a secure environment.
- **Application Security:** Any custom applications you deploy are your
  responsibility. If your application contains vulnerabilities such as SQL injection
  flaws, addressing them is part of your security obligations.

### 4. Network Security Configuration

Security Groups function as virtual firewalls for your instances. Configuring overly
permissive rules (such as allowing all traffic from `0.0.0.0/0`) is equivalent to
removing all access controls from your network perimeter.

- **Proper Network Segmentation:** Only expose necessary ports (such as `80` for HTTP
  or `443` for HTTPS) and restrict access to specific IP ranges when possible.
- **Network Access Control Lists (ACLs):** These provide an additional layer of
  network security, functioning as perimeter controls while Security Groups act as
  resource-level protections.

### 5. Amazon S3 Bucket Security

Amazon S3 is a powerful storage solution, but misconfigurations can inadvertently
expose data. If your S3 bucket becomes publicly accessible due to misconfiguration,
this represents a configuration oversight on the customer side, not an AWS security
breach.

- **Block Public Access:** Utilize account-level settings to prevent public access
  unless you're specifically hosting public content such as a static website.
- **Versioning:** Enable S3 Versioning to maintain object history, allowing recovery
  from accidental deletions or modifications.

### 6. Monitoring and Logging

CloudTrail and CloudWatch serve as your monitoring and audit tools. Neglecting to
review logs is comparable to ignoring early warning signs of potential issues before
they escalate into serious incidents.

- **CloudTrail:** This service provides comprehensive audit logs of API calls and
  user activities, enabling you to track who performed which actions and when.
- **CloudWatch:** This monitors system performance and application health. Unusual
  patterns, such as unexpected CPU spikes during off-hours, may indicate security
  incidents or misconfigurations that require investigation.

## III. The Responsibility Framework

To visualize this model, imagine a layered architecture. The foundation layer
(physical infrastructure) is managed by AWS. The middle layers (operating systems and
network configuration) represent shared or customer responsibility depending on the
service model. The top layer (data, applications, and access management) is strictly
the customer's responsibility.

## IV. Understanding the Division of Responsibility

The Shared Responsibility Model is designed to provide clarity about the division of
security obligations. AWS maintains and secures the underlying infrastructure, while
you maintain control over your data, applications, and configurations within that
infrastructure.

Treating cloud infrastructure as a fully managed service without active oversight is
a significant risk. Like managing any enterprise system, it requires ongoing
attention: regular monitoring, proper configuration management, user access controls,
and **consistent review of security logs and metrics.**

---

## Written by

**Kinshuk Jain**

- Website — [cloudkinshuk.in](https://cloudkinshuk.in)
- LinkedIn — [linkedin.com/in/kinshukjainn](https://www.linkedin.com/in/kinshukjainn/)
- X (Twitter) — [@realkinshuk004](https://x.com/realkinshuk004)
