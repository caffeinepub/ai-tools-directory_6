import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowLeftRight,
  ExternalLink,
  Sparkles,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ToolCard } from "../components/ToolCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useGetSimilarTools, useGetToolById } from "../hooks/useQueries";

// Category color definitions (matches ToolCard.tsx)
const categoryColors: Record<
  string,
  { bg: string; text: string; border: string; glow: string }
> = {
  "AI Image Tools": {
    bg: "bg-purple-500/15",
    text: "text-purple-300",
    border: "border-purple-500/30",
    glow: "oklch(0.55 0.22 285 / 0.25)",
  },
  "AI Video Tools": {
    bg: "bg-blue-500/15",
    text: "text-blue-300",
    border: "border-blue-500/30",
    glow: "oklch(0.6 0.18 200 / 0.25)",
  },
  "AI Chatbots": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    glow: "oklch(0.65 0.2 145 / 0.25)",
  },
  "AI Writing Tools": {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    glow: "oklch(0.72 0.2 60 / 0.25)",
  },
  "AI Music Tools": {
    bg: "bg-pink-500/15",
    text: "text-pink-300",
    border: "border-pink-500/30",
    glow: "oklch(0.7 0.22 355 / 0.25)",
  },
};

const defaultColor = {
  bg: "bg-primary/10",
  text: "text-primary",
  border: "border-primary/20",
  glow: "oklch(0.72 0.18 200 / 0.25)",
};

// ── Loading skeleton ────────────────────────────────────────────────
function ToolDetailSkeleton() {
  return (
    <div data-ocid="tool_detail.loading_state" className="space-y-12">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back button skeleton */}
          <Skeleton className="h-8 w-28 mb-8 rounded-lg" />

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Emoji skeleton */}
            <Skeleton className="w-28 h-28 rounded-2xl shrink-0" />

            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-10 w-3/4 rounded-lg" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-5/6 rounded" />
              <Skeleton className="h-5 w-2/3 rounded" />
              <Skeleton className="h-12 w-40 rounded-xl mt-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Similar tools skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Skeleton className="h-8 w-56 mb-8 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-5 flex flex-col gap-4 animate-pulse"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 rounded-xl bg-muted/40" />
                <div className="h-5 w-24 rounded-full bg-muted/40 mt-1" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 rounded bg-muted/40" />
                <div className="h-4 w-full rounded bg-muted/30" />
                <div className="h-4 w-5/6 rounded bg-muted/30" />
              </div>
              <div className="h-10 rounded-lg bg-muted/30" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Tool not found ───────────────────────────────────────────────────
function ToolNotFound() {
  return (
    <div
      data-ocid="tool_detail.error_state"
      className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: "oklch(0.22 0.03 265 / 0.8)" }}
        >
          <AlertCircle size={36} className="text-muted-foreground" />
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Tool Not Found
        </h1>
        <p className="text-muted-foreground max-w-sm">
          This tool doesn't exist or may have been removed from the directory.
        </p>
        <Link
          to="/"
          data-ocid="tool_detail.error_state"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25"
        >
          <ArrowLeft size={16} />
          Back to Directory
        </Link>
      </motion.div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export function ToolDetailPage() {
  const { toolId } = useParams({ from: "/tool/$toolId" });

  const toolQuery = useGetToolById(toolId);
  const similarQuery = useGetSimilarTools(toolId, 4);

  const tool = toolQuery.data;
  const similarTools = similarQuery.data ?? [];

  // Meta tags (update once tool loads)
  useMetaTags({
    title: tool ? `${tool.name} - AI Tools Directory` : "AI Tool Details",
    description: tool
      ? tool.description.slice(0, 160)
      : "Explore AI tool details and discover similar tools.",
    canonicalUrl: tool ? `${window.location.origin}/tool/${toolId}` : undefined,
    jsonLd: tool
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.description,
          applicationCategory: tool.category,
          url: tool.websiteUrl,
        }
      : undefined,
  });

  const colors = tool
    ? (categoryColors[tool.category] ?? defaultColor)
    : defaultColor;

  // Loading state
  if (toolQuery.isLoading) {
    return (
      <main className="min-h-screen">
        <ToolDetailSkeleton />
      </main>
    );
  }

  // Error / not found
  if (toolQuery.isError || (!toolQuery.isLoading && tool === null)) {
    return (
      <main className="min-h-screen">
        <ToolNotFound />
      </main>
    );
  }

  if (!tool) return null;

  return (
    <main className="min-h-screen">
      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section
        data-ocid="tool_detail.hero.section"
        className="relative overflow-hidden"
        aria-label={`${tool.name} details`}
      >
        {/* Radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 55% at 30% 0%, ${colors.glow} 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 80% 60%, oklch(0.55 0.22 285 / 0.08) 0%, transparent 55%),
              oklch(0.12 0.018 265)
            `,
          }}
        />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-8"
          >
            <Link
              to="/"
              data-ocid="tool_detail.link"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Back to Directory
            </Link>
          </motion.div>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="glass-card rounded-2xl p-8 sm:p-10"
            style={{
              borderColor: `oklch(${
                colors === defaultColor
                  ? "0.72 0.18 200"
                  : colors.glow.replace("oklch(", "").split(" / ")[0]
              } / 0.35)`,
            }}
          >
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Large emoji container */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 0.15,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="relative shrink-0"
              >
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-5xl sm:text-6xl select-none"
                  style={{
                    background: "oklch(0.20 0.03 265 / 0.8)",
                    boxShadow: `0 8px 32px ${colors.glow}, inset 0 1px 1px oklch(0.5 0.05 265 / 0.2)`,
                  }}
                  aria-hidden="true"
                >
                  {tool.logoEmoji}
                </div>
              </motion.div>

              {/* Tool info */}
              <div className="flex-1 min-w-0">
                {/* Category badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="mb-3"
                >
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    <Tag size={11} />
                    {tool.category}
                  </span>
                </motion.div>

                {/* Tool name */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4 tracking-tight"
                >
                  {tool.name}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
                >
                  {tool.description}
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.38 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="tool_detail.visit.button"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 200 / 0.9), oklch(0.65 0.22 220 / 0.9))",
                      color: "oklch(0.1 0.015 265)",
                      boxShadow:
                        "0 4px 20px oklch(0.72 0.18 200 / 0.4), inset 0 1px 0 oklch(0.85 0.1 200 / 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                        "0 6px 28px oklch(0.72 0.18 200 / 0.55), inset 0 1px 0 oklch(0.85 0.1 200 / 0.3)";
                      (e.currentTarget as HTMLAnchorElement).style.transform =
                        "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                        "0 4px 20px oklch(0.72 0.18 200 / 0.4), inset 0 1px 0 oklch(0.85 0.1 200 / 0.3)";
                      (e.currentTarget as HTMLAnchorElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Visit {tool.name}
                  </a>
                  <Link
                    to="/compare"
                    search={{ toolA: toolId }}
                    data-ocid="tool_detail.compare.button"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background border border-border hover:border-primary/40 hover:bg-primary/8 text-muted-foreground hover:text-foreground"
                    style={{ background: "oklch(0.20 0.028 265 / 0.6)" }}
                  >
                    <ArrowLeftRight size={16} aria-hidden="true" />
                    Compare
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Similar AI Tools Section ───────────────────────────────── */}
      <section
        data-ocid="tool_detail.similar.section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        aria-label="Similar AI Tools"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "oklch(0.72 0.18 200 / 0.12)",
              border: "1px solid oklch(0.72 0.18 200 / 0.25)",
            }}
          >
            <Sparkles size={18} className="text-primary" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
              Similar AI Tools
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Based on category and relevance
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.18 200 / 0.3), oklch(0.38 0.04 265 / 0.2), transparent)",
          }}
        />

        {/* Grid or empty state */}
        <AnimatePresence mode="wait">
          {similarQuery.isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl p-5 flex flex-col gap-4 animate-pulse"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-xl bg-muted/40" />
                    <div className="h-5 w-24 rounded-full bg-muted/40 mt-1" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 rounded bg-muted/40" />
                    <div className="h-4 w-full rounded bg-muted/30" />
                    <div className="h-4 w-5/6 rounded bg-muted/30" />
                  </div>
                  <div className="h-10 rounded-lg bg-muted/30" />
                </div>
              ))}
            </motion.div>
          ) : similarTools.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-3 py-14 text-center"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.22 0.03 265 / 0.7)" }}
              >
                <Sparkles size={24} className="text-muted-foreground/60" />
              </div>
              <p className="text-muted-foreground text-sm">
                No similar tools found yet. Check back soon.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.07 },
                },
              }}
            >
              {similarTools.map((similarTool, i) => (
                <motion.div
                  key={similarTool.id.toString()}
                  data-ocid={`tool_detail.similar.item.${i + 1}`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: "easeOut" },
                    },
                  }}
                >
                  <ToolCard tool={similarTool} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
