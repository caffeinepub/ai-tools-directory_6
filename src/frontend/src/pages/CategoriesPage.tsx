import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import type { Tool } from "../backend.d.ts";
import { ToolCard, ToolCardSkeleton } from "../components/ToolCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useAllTools } from "../hooks/useQueries";
import { categoryToSlug } from "./CategorySeoPage";

const CATEGORY_META: Record<
  string,
  {
    icon: string;
    color: string;
    bg: string;
    border: string;
    description: string;
  }
> = {
  "AI Image Tools": {
    icon: "🎨",
    color: "text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/25",
    description:
      "Generate stunning visuals, artwork, and graphics with AI-powered image tools.",
  },
  "AI Video Tools": {
    icon: "🎬",
    color: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    description:
      "Create, edit, and enhance videos with cutting-edge AI video generation tools.",
  },
  "AI Chatbots": {
    icon: "💬",
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    description:
      "Conversational AI assistants that can help you research, code, and create.",
  },
  "AI Writing Tools": {
    icon: "✍️",
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    description:
      "Write faster and better with AI tools for content, copywriting, and editing.",
  },
  "AI Music Tools": {
    icon: "🎵",
    color: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/25",
    description:
      "Compose, generate, and produce music tracks using the latest AI music tools.",
  },
  "AI Productivity Tools": {
    icon: "🛠️",
    color: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/25",
    description:
      "Boost your output with AI tools for coding, meetings, automation, and project management.",
  },
};

const CATEGORY_ORDER = [
  "AI Image Tools",
  "AI Video Tools",
  "AI Chatbots",
  "AI Writing Tools",
  "AI Music Tools",
  "AI Productivity Tools",
];

export function CategoriesPage() {
  useMetaTags({
    title: "Browse by Category",
    description:
      "Explore AI tools organized by category — image generation, video, chatbots, writing, and music.",
  });

  const { data: allTools = [], isLoading } = useAllTools();

  // Group tools by category
  const grouped = useMemo(() => {
    const map: Record<string, Tool[]> = {};
    for (const tool of allTools) {
      if (!map[tool.category]) map[tool.category] = [];
      map[tool.category].push(tool);
    }
    return map;
  }, [allTools]);

  // Use known order, then any extra categories at end
  const orderedCategories = useMemo(() => {
    const extra = Object.keys(grouped).filter(
      (c) => !CATEGORY_ORDER.includes(c),
    );
    return [...CATEGORY_ORDER, ...extra].filter(
      (c) => CATEGORY_ORDER.includes(c) || grouped[c]?.length,
    );
  }, [grouped]);

  return (
    <main data-ocid="categories.page" className="min-h-screen">
      {/* Page header */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.15 0.025 265), oklch(0.12 0.018 265))",
          borderBottom: "1px solid oklch(0.28 0.025 265 / 0.5)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight mb-4">
              Browse by{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.55 0.22 285))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Category
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Explore our curated collection of AI tools, organized by what they
              do best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {isLoading
          ? CATEGORY_ORDER.map((cat, sectionIdx) => {
              const meta = CATEGORY_META[cat];
              return (
                <section key={cat} aria-label={cat}>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${meta?.bg} ${meta?.border} border shrink-0`}
                    >
                      {meta?.icon}
                    </div>
                    <div>
                      <div className="h-6 w-48 rounded bg-muted/40 mb-1 animate-pulse" />
                      <div className="h-4 w-32 rounded bg-muted/30 animate-pulse" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no identity
                      <ToolCardSkeleton key={i} index={sectionIdx * 4 + i} />
                    ))}
                  </div>
                </section>
              );
            })
          : orderedCategories.map((cat, sectionIdx) => {
              const tools = grouped[cat] ?? [];
              const meta = CATEGORY_META[cat] ?? {
                icon: "🤖",
                color: "text-primary",
                bg: "bg-primary/10",
                border: "border-primary/20",
                description: `Explore ${cat} tools.`,
              };

              return (
                <motion.section
                  key={cat}
                  aria-label={cat}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: sectionIdx * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {/* Section header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${meta.bg} border ${meta.border} shrink-0`}
                    >
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <a
                          href={`/category/${categoryToSlug(cat)}`}
                          data-ocid={`categories.${categoryToSlug(cat)}.link`}
                          className="font-display font-bold text-xl text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded inline-flex items-center gap-1.5 group"
                        >
                          {cat}
                          <ChevronRight
                            size={16}
                            aria-hidden="true"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </a>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${meta.bg} ${meta.color} border ${meta.border}`}
                        >
                          {tools.length} tool{tools.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">
                        {meta.description}
                      </p>
                    </div>
                  </div>

                  {/* Tools grid */}
                  {tools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {tools.map((tool, i) => (
                        <ToolCard
                          key={tool.id.toString()}
                          tool={tool}
                          index={sectionIdx * 10 + i}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">
                      No tools in this category yet.
                    </div>
                  )}

                  {/* Divider */}
                  {sectionIdx < orderedCategories.length - 1 && (
                    <div
                      className="mt-16 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, oklch(0.32 0.035 265 / 0.5), transparent)",
                      }}
                    />
                  )}
                </motion.section>
              );
            })}
      </div>
    </main>
  );
}
