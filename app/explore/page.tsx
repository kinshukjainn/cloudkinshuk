export default function Page() {
  const interests = [
    {
      title: "Exploring Technology",
      description:
        "I enjoy exploring new technologies, understanding how things work, and discovering ideas beyond my usual tech stack.",
      tag: "Curiosity",
    },
    {
      title: "Problem Solving",
      description:
        "I like breaking down complex problems, understanding the fundamentals, and finding practical ways to solve them.",
      tag: "Thinking",
    },
    {
      title: "Engineering",
      description:
        "Coming from an Electrical Engineering background, I've always been interested in how systems work in the real world.",
      tag: "Background",
    },
    {
      title: "Learning & Reading",
      description:
        "I enjoy learning new concepts, reading about interesting ideas, and documenting things I discover along the way.",
      tag: "Learning",
    },
  ];

  const favourites = [
    { label: "Field of interest", value: "Technology & Engineering" },
    { label: "Currently exploring", value: "AI, Cloud & System Design" },
    { label: "Favourite kind of work", value: "Building useful products" },
    { label: "Learning approach", value: "Understand before implementing" },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        {/* Header */}
        <header className="mb-16">
          <p className="mb-4 text-sm text-neutral-500">Portfolio / Explore</p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-600">
            A little space beyond code. Things I enjoy, ideas I explore, and
            interests that shape the way I think and approach life.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-16 border-y border-neutral-200 py-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            A little about me
          </p>

          <h2 className="max-w-3xl text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">
            Curious by nature, an engineer by education, and someone who enjoys
            understanding how things work.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-neutral-600">
            My interests go beyond software development. From understanding
            electrical systems to exploring cloud technologies and AI, I enjoy
            learning about the world around me and finding connections between
            different fields.
          </p>
        </section>

        {/* Interests */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              Outside the code
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Things I enjoy
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {interests.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-neutral-200 p-6 transition-colors hover:bg-neutral-50"
              >
                <span className="text-xs text-neutral-400">{item.tag}</span>

                <h3 className="mt-4 text-lg font-medium">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Current interests */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              Right now
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              A few current interests
            </h2>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {favourites.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-between gap-2 py-5 sm:flex-row"
              >
                <span className="text-sm text-neutral-500">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-neutral-200 pt-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            That&apos;s a little more about me
          </p>

          <h2 className="mt-4 text-2xl font-medium tracking-tight">
            Always curious. Always exploring.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600">
            There&apos;s always something new to discover, understand, or
            experiment with. This page is a small reflection of that journey.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-neutral-200 pt-6">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Kinshuk Jain. Built with curiosity.
          </p>
        </footer>
      </div>
    </main>
  );
}
