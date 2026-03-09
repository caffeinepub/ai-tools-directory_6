import { AlertCircle, Search, Sparkles, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import type { Tool } from "../backend.d.ts";
import { ToolCard, ToolCardSkeleton } from "../components/ToolCard";
import { useMetaTags } from "../hooks/useMetaTags";
import {
  useAllTools,
  useLatestTools,
  useToolsByCategory,
} from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "AI Image Tools",
  "AI Video Tools",
  "AI Chatbots",
  "AI Writing Tools",
  "AI Music Tools",
  "AI Productivity Tools",
];

const categoryIcons: Record<string, string> = {
  All: "✨",
  "AI Image Tools": "🎨",
  "AI Video Tools": "🎬",
  "AI Chatbots": "💬",
  "AI Writing Tools": "✍️",
  "AI Music Tools": "🎵",
  "AI Productivity Tools": "🛠️",
};

export function HomePage() {
  useMetaTags({
    title: "Discover the Best AI Tools",
    description:
      "Explore the top AI tools for image generation, video creation, chatbots, writing, and music — curated and updated regularly.",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch all tools on mount
  const allToolsQuery = useAllTools();

  // Latest tools — auto-refreshes every 60s
  const latestToolsQuery = useLatestTools(8);

  // Fetch by category when needed (not "All")
  const categoryQuery = useToolsByCategory(
    activeCategory,
    activeCategory !== "All" && !searchQuery.trim(),
  );

  // Determine which data source to use
  const baseTools: Tool[] = useMemo(() => {
    if (activeCategory === "All") {
      return allToolsQuery.data ?? [];
    }
    return categoryQuery.data ?? allToolsQuery.data ?? [];
  }, [activeCategory, allToolsQuery.data, categoryQuery.data]);

  // Client-side search filter
  const displayedTools: Tool[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      if (activeCategory === "All") return baseTools;
      return baseTools.filter((t) => t.category === activeCategory);
    }
    return baseTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    );
  }, [baseTools, searchQuery, activeCategory]);

  const isLoading =
    allToolsQuery.isLoading ||
    (activeCategory !== "All" && categoryQuery.isLoading);
  const isError = allToolsQuery.isError;

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setSearchQuery("");
  }, []);

  return (
    <main className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden hero-gradient noise-overlay"
        aria-label="Hero section"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{
                background: "oklch(0.55 0.22 285 / 0.12)",
                borderColor: "oklch(0.55 0.22 285 / 0.3)",
                color: "oklch(0.78 0.15 285)",
              }}
            >
              <Zap size={12} aria-hidden="true" />
              100+ AI Tools Curated
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.1] mb-5">
              Discover the Best{" "}
              <span
                className="block sm:inline"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.65 0.2 285), oklch(0.68 0.22 355))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI Tools
              </span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Your curated directory of the most powerful AI tools — for
              creators, developers, and businesses who want to work smarter.
            </p>

            {/* Search bar */}
            <div className="max-w-xl mx-auto">
              <div
                className="search-glow relative flex items-center rounded-xl border transition-all duration-300"
                style={{
                  background: "oklch(0.18 0.025 265 / 0.9)",
                  borderColor: "oklch(0.32 0.035 265)",
                }}
              >
                <Search
                  size={18}
                  className="absolute left-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  data-ocid="home.search.input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground text-sm rounded-xl outline-none"
                  aria-label="Search AI tools"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Latest AI Tools ────────────────────────────────────── */}
      <section
        data-ocid="home.latest_tools.section"
        className="relative overflow-hidden latest-tools-band"
        aria-label="Latest AI Tools"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="relative flex items-center">
              <Sparkles size={20} className="text-primary" aria-hidden="true" />
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse"
                style={{ background: "oklch(0.65 0.2 145)" }}
                aria-hidden="true"
              />
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              Latest AI Tools
            </h2>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border"
              style={{
                background: "oklch(0.65 0.2 145 / 0.12)",
                borderColor: "oklch(0.65 0.2 145 / 0.3)",
                color: "oklch(0.75 0.18 145)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "oklch(0.65 0.2 145)" }}
                aria-hidden="true"
              />
              Live
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Updated daily — new tools added automatically
          </p>

          {/* Horizontal scroll row */}
          <ul
            className="flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-hide list-none"
            aria-label="Latest AI tools"
          >
            {latestToolsQuery.isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list items have no identity
                  <li key={i} className="snap-start shrink-0 w-64 sm:w-72">
                    <ToolCardSkeleton index={i} />
                  </li>
                ))
              : (latestToolsQuery.data ?? []).map((tool, i) => (
                  <li
                    key={tool.id.toString()}
                    className="snap-start shrink-0 w-64 sm:w-72"
                    data-ocid={`home.latest.tool.item.${i + 1}`}
                  >
                    <ToolCard tool={tool} index={i} showNewBadge={true} />
                  </li>
                ))}
          </ul>
        </div>
      </section>

      {/* ── Category Tabs + Tools Grid ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide snap-x"
          role="tablist"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                role="tab"
                aria-selected={isActive}
                data-ocid="home.category.tab"
                onClick={() => handleCategoryChange(cat)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                  border transition-all duration-200 snap-start shrink-0
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${
                    isActive
                      ? "bg-primary/15 text-primary border-primary/35"
                      : "text-muted-foreground hover:text-foreground border-border hover:border-border/80 hover:bg-secondary/80"
                  }
                `}
              >
                <span aria-hidden="true">{categoryIcons[cat]}</span>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results info */}
        <AnimatePresence mode="wait">
          {!isLoading && !isError && (
            <motion.p
              key="count"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-sm mb-6"
            >
              {searchQuery
                ? `${displayedTools.length} result${displayedTools.length !== 1 ? "s" : ""} for "${searchQuery}"`
                : `${displayedTools.length} tool${displayedTools.length !== 1 ? "s" : ""}${activeCategory !== "All" ? ` in ${activeCategory}` : ""}`}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Error state */}
        {isError && (
          <div
            data-ocid="home.error_state"
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: "oklch(0.64 0.21 25 / 0.15)",
                border: "1px solid oklch(0.64 0.21 25 / 0.3)",
              }}
            >
              <AlertCircle
                size={24}
                className="text-destructive"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-display font-semibold text-foreground">
              Failed to load tools
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Something went wrong while loading the tools. Please refresh the
              page and try again.
            </p>
          </div>
        )}

        {/* Tools grid */}
        <div
          data-ocid="home.tools.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          aria-label="AI tools"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no identity
                <ToolCardSkeleton key={i} index={i} />
              ))
            : displayedTools.map((tool, i) => (
                <ToolCard key={tool.id.toString()} tool={tool} index={i} />
              ))}
        </div>

        {/* Empty state */}
        {!isLoading && !isError && displayedTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          >
            <div className="text-5xl mb-2" aria-hidden="true">
              🔍
            </div>
            <h3 className="font-display font-semibold text-foreground text-xl">
              No tools found
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              {searchQuery
                ? `No AI tools match "${searchQuery}". Try a different search term.`
                : "No tools available in this category yet."}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Clear search
              </button>
            )}
          </motion.div>
        )}
      </section>
    </main>
  );
}
