"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ChevronsRight,
  GitCommit,
  ExternalLink,
  Hash,
} from "lucide-react";

/* ── TYPES ──────────────────────────────────────────────── */
type WatchItem = {
  title: string;
  category: "Anime" | "Movie" | "Series";
  year?: string;
  rating?: string;
  note?: string;
};

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

/* ── CONFIGURATION ──────────────────────────────────────── */
const RANDOM_CONFIG = {
  githubUsername: "kinshukjainn",
  discord: {
    username: "kijauk", // Replace with your exact Discord handle
    displayTag: "kinshukjainn",
    inviteOrProfileUrl: "https://discord.com/kijauk/", // Optional: add your Discord User ID at the end
  },
  watchBanner: {
    image: "/randomprofile.png", // Place your banner image in /public/anime-banner.jpg
    fallbackGradient: true,
    subtitle: "Personal Watchlist & Archive",
  },
  watchlist: [
    // Anime
    {
      title: "Attack on Titan",
      category: "Anime",
      year: "2013–2023",
      rating: "10/10",
    },
    { title: "Death Note", category: "Anime", year: "2006", rating: "9.5/10" },
    {
      title: "Chainsaw Man",
      category: "Anime",
      year: "2011",
      rating: "9.5/10",
    },
    {
      title: "Jojos Bizare adventure",
      category: "Anime",
      year: "1987-still airing",
      rating: "9/10",
    },
    {
      title: "Jujutsu Kaisen",
      category: "Anime",
      year: "2020–Present",
      rating: "8.5/10",
    },
    {
      title: "Demon Slayer(all Parts)",
      category: "Anime",
      year: "2019–Present",
      rating: "8.5/10",
    },
    {
      title: "Fullmetal Alchemist: Brotherhood",
      category: "Anime",
      year: "2009",
      rating: "9.5/10",
    },
    {
      title: "My hero Academia",
      category: "Anime",
      year: "2004",
      rating: "9.5/10",
    },

    // Series
    {
      title: "Special Ops",
      category: "Series",
      year: "2015–2019",
      rating: "10/10",
    },
    { title: "Asur", category: "Series", year: "2017–2020", rating: "9.5/10" },
    {
      title: "Pritam and Pedro",
      category: "Series",
      year: "2026",
      rating: "7/10",
    },
    {
      title: "Squid Game",
      category: "Series",
      year: "2021–2025",
      rating: "8.5/10",
    },
    {
      title: "Mirzapur",
      category: "Series",
      year: "2019-present",
      rating: "7.5/10",
    },
    {
      title: "The Railway Men",
      category: "Series",
      year: "2023",
      rating: "9.5/10",
    },
    {
      title: "Mumbai Diaries 26/11",
      category: "Series",
      year: "2022-25",
      rating: "9.5/10",
    },
    {
      title: "Scam 1992",
      category: "Series",
      year: "2021",
      rating: "9.5/10",
    },

    // Movies
    { title: "Oppenhiemer", category: "Movie", year: "2023", rating: "10/10" },
    { title: "Oddesey", category: "Movie", year: "2026", rating: "9/10" },
    {
      title: "The Substance",
      category: "Movie",
      year: "2023",
      rating: "8/10",
    },
    { title: "Dune", category: "Movie", year: "2022", rating: "9.8/10" },
    {
      title: "Dune part -2 ",
      category: "Movie",
      year: "2024",
      rating: "9.5/10",
    },
    {
      title: "Chaava",
      category: "Movie",
      year: "2016",
      rating: "9/10",
    },
    {
      title: "Avengers : Endgame",
      category: "Movie",
      year: "2016",
      rating: "9/10",
    },
    {
      title: "Avengers : Infinity war",
      category: "Movie",
      year: "2016",
      rating: "9/10",
    },
    {
      title: "Ant-man and the wasp Quantamania",
      category: "Movie",
      year: "2016",
      rating: "9/10",
    },
    {
      title: "Dhurandhar",
      category: "Movie",
      year: "2025",
      rating: "9/10",
    },
    {
      title: "Dhurandhar: The Revenge",
      category: "Movie",
      year: "2026",
      rating: "9/10",
    },
  ] as WatchItem[],
};

/* ── SHARED THEME COMPONENTS ────────────────────────────── */

function SubHeading({ title }: { title: string }) {
  return (
    <h3 className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-4">
      {title}
    </h3>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-[28px] font-light text-[#0066cc] mb-6">{title}</h2>
  );
}

/* ── GITHUB COMMITS GRAPH (THEME-MATCHED) ───────────────── */

function GitHubCommitsGraph({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchContributions() {
      try {
        // Public GitHub contributions API
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        );
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();

        if (!active) return;

        const contributions: ContributionDay[] = data.contributions || [];
        const total =
          data.total?.lastYear ??
          contributions.reduce((acc, d) => acc + d.count, 0);

        // Group flat days array into 7-day weeks
        const grouped: ContributionDay[][] = [];
        for (let i = 0; i < contributions.length; i += 7) {
          grouped.push(contributions.slice(i, i + 7));
        }

        setWeeks(grouped);
        setTotalCommits(total);
      } catch {
        // Clean deterministic fallback if offline or rate-limited
        const fallbackWeeks: ContributionDay[][] = [];
        let sum = 0;
        const now = new Date();
        for (let w = 51; w >= 0; w--) {
          const week: ContributionDay[] = [];
          for (let d = 0; d < 7; d++) {
            const dateObj = new Date(now);
            dateObj.setDate(now.getDate() - (w * 7 + (6 - d)));
            const seed = (w * 13 + d * 7) % 11;
            const level = (
              seed > 7 ? 4 : seed > 5 ? 3 : seed > 3 ? 2 : seed > 1 ? 1 : 0
            ) as 0 | 1 | 2 | 3 | 4;
            const count = level === 0 ? 0 : level * 2;
            sum += count;
            week.push({
              date: dateObj.toISOString().split("T")[0],
              count,
              level,
            });
          }
          fallbackWeeks.push(week);
        }
        if (active) {
          setWeeks(fallbackWeeks);
          setTotalCommits(sum);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchContributions();
    return () => {
      active = false;
    };
  }, [username]);

  // Blue monochromatic palette matching your #0066cc theme
  const levelColors: Record<number, string> = {
    0: "bg-[#f2f2f2] border-[#e5e5e5]",
    1: "bg-[#cce0f5] border-[#b8d4f0]",
    2: "bg-[#66a3e0] border-[#5294d6]",
    3: "bg-[#0066cc] border-[#005bb5]",
    4: "bg-[#004080] border-[#003366]",
  };

  return (
    <div className="border border-[#dddddd] bg-[#fafafa] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#eeeeee]">
        <div className="flex items-center gap-2">
          <GitCommit className="h-4 w-4 text-[#0066cc]" />
          <span className="text-[13px] font-bold text-[#333333]">
            @{username}
          </span>
          <span className="text-[12px] text-[#666666]">
            —{" "}
            {loading
              ? "Loading activity..."
              : `${totalCommits} contributions in the last year`}
          </span>
        </div>

        <div className="text-[11px] text-[#666666] h-4">
          {hoveredDay ? (
            <span>
              <strong className="text-[#333333]">
                {hoveredDay.count} commits
              </strong>{" "}
              on {hoveredDay.date}
            </span>
          ) : (
            <span>Hover over a square to inspect daily commits</span>
          )}
        </div>
      </div>

      {/* Scrollable Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-[3px] min-w-full">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  title={`${day.count} contributions on ${day.date}`}
                  className={`w-[11px] h-[11px] border transition-colors ${
                    levelColors[day.level]
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Legend */}
      <div className="mt-3 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#777777]">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0066cc] hover:underline inline-flex items-center gap-1"
        >
          View full GitHub profile <ExternalLink className="h-3 w-3" />
        </a>

        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              className={`inline-block w-[10px] h-[10px] border ${levelColors[lvl]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */

export default function RandomStuffPage() {
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [watchMenuOpen, setWatchMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Anime" | "Series" | "Movie"
  >("All");
  const [bannerOk, setBannerOk] = useState(true);

  const handleCopyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(RANDOM_CONFIG.discord.username);
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    } catch {
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    }
  };

  // Counts
  const animeCount = RANDOM_CONFIG.watchlist.filter(
    (i) => i.category === "Anime",
  ).length;
  const seriesCount = RANDOM_CONFIG.watchlist.filter(
    (i) => i.category === "Series",
  ).length;
  const movieCount = RANDOM_CONFIG.watchlist.filter(
    (i) => i.category === "Movie",
  ).length;
  const totalWatched = RANDOM_CONFIG.watchlist.length;

  const filteredWatchlist =
    selectedFilter === "All"
      ? RANDOM_CONFIG.watchlist
      : RANDOM_CONFIG.watchlist.filter(
          (item) => item.category === selectedFilter,
        );

  return (
    <div className="min-h-screen bg-white text-[#333333]">
      <main className="mx-auto w-full max-w-[1024px] px-6 py-10">
        {/* ============ TOP NAVIGATION & HEADER ============ */}
        <header className="mb-14 border-b border-[#eeeeee] pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <SubHeading title="OFF-THE-CLOCK & LOGS" />
              <h1 className="text-[36px] font-thin text-[#0066cc] mb-2 leading-tight">
                Random Stuff..
              </h1>
              <p className="text-[13px] leading-[1.6] text-[#333333] max-w-[620px]">
                A corner of the internet for things outside my resume — daily
                commit streaks, where to ping me on Discord, and a running log
                of every anime, series, and movie I have watched.
              </p>
            </div>

            {/* ============ DISCORD ID + DISCORD BUTTON ============ */}
            <div className="border border-[#dddddd] bg-[#fafafa] p-4 min-w-[260px]">
              <SubHeading title="DISCORD" />
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#333333]">
                  <Hash className="h-4 w-4 text-[#0066cc]" />
                  <span>{RANDOM_CONFIG.discord.displayTag}</span>
                </div>
                <span className="text-[11px] text-[#666666] bg-white border border-[#dddddd] px-2 py-0.5">
                  ID: {RANDOM_CONFIG.discord.username}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyDiscord}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0066cc] text-white px-4 py-2 text-[13px] font-bold hover:bg-[#005bb5] transition-colors cursor-pointer"
                >
                  {copiedDiscord ? (
                    <>
                      <Check className="h-4 w-4" /> Copied Discord ID
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy Discord ID
                    </>
                  )}
                </button>

                <a
                  href={RANDOM_CONFIG.discord.inviteOrProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Discord"
                  className="inline-flex items-center justify-center border border-[#cccccc] bg-white text-[#0066cc] px-3 py-2 text-[13px] font-bold hover:bg-[#f5f5f5]"
                >
                  Discord <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <h1 className="text-[26px] font-light text-[#0066cc] mb-4 mt-2 leading-tight">
          Blog/Articles i usually follow
        </h1>

        <div className="w-full min-w-[260px] space-y-5 transition-all duration-200 hover:border-gray-400 hover:bg-white">
          <div>
            <h2 className="flex items-center gap-2 text-base font-normal text-black">
              <ChevronsRight
                className="h-5 w-5 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>WhatsApp (Beta Version) Blogs for Android</span>
              <a
                className="font-bold font-mono text-blue-800 underline"
                href="https://wabetainfo.com/"
              >
                {"["} Link {"]"}
              </a>
            </h2>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-base font-normal text-black">
              <ChevronsRight
                className="h-5 w-5 shrink-0 text-black"
                aria-hidden="true"
              />
              <span>Amazon Web services documention</span>
              <a
                className="font-bold font-mono text-blue-800 underline"
                href="https://aws.amazon.com/blogs/"
              >
                {"["} Link {"]"}
              </a>
            </h2>
          </div>
        </div>

        <h1 className="text-[26px]  font-light text-[#0066cc] mb-4 pt-15 leading-tight">
          Spotify Playlist ( Public Verison)
        </h1>

        <div>
          <h2 className="flex items-center gap-2 text-base font-normal text-black">
            <ChevronsRight
              className="h-5 w-5 shrink-0 text-black"
              aria-hidden="true"
            />
            <span>Doodle dev</span>
            <a
              className="font-bold font-mono text-blue-800 underline"
              href="https://open.spotify.com/playlist/09MVJaYJ7dRtdabwvPQSVs?si=9b4ab54c8b2d49fa&pt=58ee1a6ad8ddb9a8bddf60e5ce72dc9f"
            >
              {"["} Link {"]"}
            </a>
          </h2>
          <p className="mt-1 ml-7 font-normal text-sm text-gray-700">
            This playlist is completly designed by me and the song in this
            playlist are those which i listen on repeat without getting boared
            and when i am free or grinding in vscode
          </p>
        </div>

        {/* ============ GITHUB COMMITS GRAPH SECTION ============ */}
        <section className="mt-16 mb-16">
          <div className="flex items-baseline justify-between">
            <SectionHeading title="GitHub Activity" />
            <SubHeading title="COMMIT GRAPH" />
          </div>
          <GitHubCommitsGraph username={RANDOM_CONFIG.githubUsername} />
        </section>

        {/* ============ WATCHLIST (DROPDOWN BUTTON + PHOTO BANNER) ============ */}
        <section className="mb-16 border-t border-[#eeeeee] pt-10">
          <SectionHeading title="Watchlist Archive" />

          {/* Split Row: Left = Toggle Button with Arrow | Right = Photo Banner with Title Overlay */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* LEFT COLUMN: Button with Arrow + Stats */}
            <div className="md:col-span-5 flex flex-col justify-between border border-[#dddddd] bg-[#fafafa] p-5">
              <div>
                <SubHeading title="ANIME, MOVIES & SERIES" />
                <p className="text-[13px] text-[#333333] leading-[1.6] mb-4">
                  A collection of movies and shows I&apos;ve binged or watched
                  in theatres whenever my brain needed a restart. Basically, my
                  alternative to debugging life&apos;s problems.
                </p>

                {/* Breakdown Badges */}
                <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                  <div className="bg-white border border-[#dddddd] py-2 px-1">
                    <div className="text-[16px] font-bold text-[#0066cc]">
                      {animeCount}
                    </div>
                    <div className="text-[10px] uppercase text-[#777777] font-bold">
                      Anime
                    </div>
                  </div>
                  <div className="bg-white border border-[#dddddd] py-2 px-1">
                    <div className="text-[16px] font-bold text-[#0066cc]">
                      {seriesCount}
                    </div>
                    <div className="text-[10px] uppercase text-[#777777] font-bold">
                      Series
                    </div>
                  </div>
                  <div className="bg-white border border-[#dddddd] py-2 px-1">
                    <div className="text-[16px] font-bold text-[#0066cc]">
                      {movieCount}
                    </div>
                    <div className="text-[10px] uppercase text-[#777777] font-bold">
                      Movies
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button with Arrow */}
              <button
                type="button"
                onClick={() => setWatchMenuOpen((prev) => !prev)}
                aria-expanded={watchMenuOpen}
                className="w-full inline-flex items-center justify-between bg-[#0066cc] text-white px-5 py-3 text-[14px] font-bold hover:bg-[#005bb5] transition-colors cursor-pointer"
              >
                <span>
                  {watchMenuOpen
                    ? `Hide Watchlist (${totalWatched} Titles)`
                    : `View Watched List (${totalWatched} Titles)`}
                </span>
                {watchMenuOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* RIGHT COLUMN: Photo Banner with Title Overlay ("How many anime I have watched") */}
            <div className="md:col-span-7 relative border border-[#dddddd] bg-[#1a2634] min-h-[210px] overflow-hidden flex items-end">
              {bannerOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={RANDOM_CONFIG.watchBanner.image}
                  alt="How many anime I have watched banner"
                  onError={() => setBannerOk(false)}
                  className="absolute inset-0 w-max h-max object-cover"
                />
              ) : (
                /* Clean architectural fallback if /anime-banner.jpg is not added yet */
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #003366 0%, #0066cc 55%, #1e293b 100%)",
                  }}
                />
              )}

              {/* Dark gradient overlay for crisp text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />

              {/* Title & Counter overlaid on Photo Banner */}
              <div className="relative z-10 p-6 w-full text-white">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#0066cc] text-white px-2 py-0.5 mb-2">
                  {RANDOM_CONFIG.watchBanner.subtitle}
                </span>
                <h3 className="text-[24px] sm:text-[28px] font-light leading-tight text-white">
                  Anime / Movies / Series finished
                </h3>
                <p className="text-[12px] text-white/80 mt-1">
                  Plus {seriesCount} TV Series & {movieCount} Movies (
                  {totalWatched} total logged)
                </p>
              </div>
            </div>
          </div>

          {/* ============ EXPANDABLE DROPDOWN MENU LIST ============ */}
          {watchMenuOpen && (
            <div className="mt-6 border border-[#dddddd] bg-white p-6">
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-[#eeeeee]">
                <div className="flex flex-wrap items-center gap-2">
                  {(["All", "Anime", "Series", "Movie"] as const).map((tab) => {
                    const isActive = selectedFilter === tab;
                    const count =
                      tab === "All"
                        ? totalWatched
                        : RANDOM_CONFIG.watchlist.filter(
                            (i) => i.category === tab,
                          ).length;

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setSelectedFilter(tab)}
                        className={`px-3 py-1 text-[12px] font-bold border transition-colors cursor-pointer ${
                          isActive
                            ? "bg-[#0066cc] text-white border-[#0066cc]"
                            : "bg-[#fafafa] text-[#333333] border-[#dddddd] hover:border-[#0066cc] hover:text-[#0066cc]"
                        }`}
                      >
                        {tab === "Movie" ? "Movies" : tab} ({count})
                      </button>
                    );
                  })}
                </div>

                <span className="text-[11px] text-[#888888] uppercase font-bold">
                  Showing {filteredWatchlist.length} entries
                </span>
              </div>

              {/* Watchlist — plain list, title only */}
              <ul className="space-y-2">
                {filteredWatchlist.map((item, index) => (
                  <li
                    key={`${item.title}-${index}`}
                    className="flex items-start gap-2 text-[13px] leading-snug text-[#333333]"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#0066cc]" />
                    <span className="min-w-0 break-words">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="border-t border-[#eeeeee] pt-6 flex flex-col md:flex-row justify-between text-[11px] text-[#888888] uppercase tracking-wide">
          <span>Kinshuk Jain © {new Date().getFullYear()}</span>
          <span>Hand-coded • No templates</span>
        </footer>
      </main>
    </div>
  );
}
