export type NavItem = { title: string; slug: string };
export type NavSection = { title: string; items: NavItem[] };

export const navigation: NavSection[] = [
  {
    title: "Blogs",
    items: [
      { title: "Welcome to the Blogs", slug: "introduction" },
      {
        title: "How Instagram Is Engineered Under The Hood",
        slug: "how-instagram-is-engineered-under-the-hood",
      },
      {
        title: "Linux is go to `os` for development",
        slug: "linux-is-go-to-os-for-development",
      },
      {
        title: " How AWS Lambda Scales Seamlessly",
        slug: "how-aws-lambda-scales-seamlessly",
      },
      {
        title: " The AWS Shared Responsibility Model Explained",
        slug: "the-aws-shared-responsibility-model-explained",
      },
      {
        title: " I Built My Own Google Drive. Here's How It Actually Works.",
        slug: "google-drive",
      },
      {
        title: " The Power of Blogging: Why I'm Committed to Sharing Knowledge",
        slug: "the-power-of-blogging-why-im-committed-to-sharing-knowledge",
      },
    ],
  },
  {
    title: "Project Documentation",
    items: [{ title: "Welcome to the Project Documentation", slug: "welcome" }],
  },
];
