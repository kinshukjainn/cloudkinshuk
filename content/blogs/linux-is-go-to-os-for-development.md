---

title: Linux is go to OS for development
slug: linux-is-go-to-os-for-development
description: This blog is about how linux is very good os for development and production
---



As a student navigating the world of software development, my comfort zone has
always been Windows. It's the OS I grew up with. For years, it has served me well
as I've dived into technologies like React, TypeScript, and TailwindCSS. I've even
managed cloud services like AWS Amplify and Route 53 straight from my familiar
Windows desktop.

But as I started working with more powerful tools like Docker, Kubernetes, and the
broader AWS ecosystem, I kept hearing the same advice from seniors and online
communities: "You should use Linux." For a long time, I resisted. Why switch when
everything works?

My perspective changed when I discovered WSL2 (Windows Subsystem for Linux). It was
my first real taste of the Linux world, and it opened my eyes. Without ever leaving
Windows, I began to understand why Linux is considered the gold standard for
developers. This isn't a Windows vs. Linux debate, but my personal observation on
the real, practical advantages Linux offers, especially for students like us.

## The Command Line Isn't Scary, It's Powerful

On **Windows**, we often rely on graphical interfaces to get things done. The
command line can feel like an afterthought. In Linux, the command line, or shell,
is the heart of the operating system. When I started using it through WSL2, I
realized it wasn't just for running an occasional command; it was for controlling
everything.

Simple commands for finding files, managing processes, and connecting to servers
are incredibly fast and efficient. Most importantly, the servers where our
applications will eventually run (like an AWS EC2 instance) don't have a fancy user
interface. They are managed entirely through the command line. Getting comfortable
with it early on is a massive advantage for any future developer.

## Software Installation Is a Breeze

Remember the process of installing a new tool on Windows? You search for it online,
find the right download page, download a `.exe` file, and click "Next" through a
series of installation windows.

In the Linux world, this is handled by a package manager. For Ubuntu (which is what
I use in WSL2), the package manager is called `apt`. Instead of hunting for
software, I can just open my terminal and type a single command:

```bash
sudo apt install nodejs
```

That's it. The package manager finds the right version, installs it, and sets it up
for me. It's like having an app store for all your development tools. It saves an
incredible amount of time and helps avoid the classic "path" configuration headaches
that often frustrate beginners on Windows.

## Develop in the Same Environment Your Code Will Run In

This is perhaps the biggest "aha!" moment I had. Most of the internet — from the
servers that host websites to the containers managed by Docker and Kubernetes —
runs on Linux.

When you develop on a non-Linux system, your code runs in an environment that is
slightly different from where it will be deployed. This can lead to the dreaded
"but it works on my machine!" problem, where code that runs perfectly for you breaks
when it's deployed to a server.

By using Linux (via WSL2), you create a development environment that is nearly
identical to the production environment. This consistency means fewer surprises and
easier debugging. My work with Docker became so much smoother once I was building and
running containers in a native Linux environment right on my Windows machine.

## You Are in Complete Control

Linux is open source, which gives you an incredible amount of freedom and control.
You can customize almost every aspect of the operating system to fit your workflow
perfectly. While this can seem daunting, it means you can build a lightweight,
distraction-free environment tailored specifically for coding.

## Personal Advice

For students, this also has a very practical benefit: Linux can run on almost
anything. Have an old laptop that struggles to run Windows 10 or 11? A lightweight
Linux distribution can bring it back to life and turn it into a perfectly capable
development machine.

## My Final Thoughts

I'm still a Windows user and love the Windows operating system — no OS can come close
to it, and I love its ecosystem and interface for day-to-day tasks. But incorporating
Linux into my workflow through WSL2 has been a game-changer. It has made me a more
efficient developer and better prepared me for the environments where my code will
ultimately live.

If you're a student developer who, like me, has only ever used Windows, I highly
recommend giving WSL2 a try. You don't have to abandon your familiar OS. You can get
the best of both worlds and gain a crucial skill that will serve you throughout your
career in software.

---

## Written by

**Kinshuk Jain**

- Website — [cloudkinshuk.in](https://cloudkinshuk.in)
- LinkedIn — [linkedin.com/in/kinshukjainn](https://www.linkedin.com/in/kinshukjainn/)
- X (Twitter) — [@realkinshuk004](https://x.com/realkinshuk004)
