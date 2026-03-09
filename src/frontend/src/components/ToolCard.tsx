import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import type { Tool } from "../backend.d.ts";

const categoryColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "AI Image Tools": {
    bg: "bg-purple-500/15",
    text: "text-purple-300",
    border: "border-purple-500/30",
  },
  "AI Video Tools": {
    bg: "bg-blue-500/15",
    text: "text-blue-300",
    border: "border-blue-500/30",
  },
  "AI Chatbots": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
  },
  "AI Writing Tools": {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
  },
  "AI Music Tools": {
    bg: "bg-pink-500/15",
    text: "text-pink-300",
    border: "border-pink-500/30",
  },
};

const defaultColor = {
  bg: "bg-primary/10",
  text: "text-primary",
  border: "border-primary/20",
};

interface ToolCardProps {
  tool: Tool;
  index: number;
  showNewBadge?: boolean;
}

export function ToolCard({ tool, index, showNewBadge = false }: ToolCardProps) {
  const colors = categoryColors[tool.category] ?? defaultColor;

  return (
    <Link
      to="/tool/$toolId"
      params={{ toolId: tool.id.toString() }}
      data-ocid={`tool.card.item.${index + 1}`}
      className="block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
    >
      <motion.article
        className="glass-card rounded-xl p-5 flex flex-col gap-4 group transition-all duration-300 relative h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
        whileHover={{ y: -4 }}
      >
        {/* New badge */}
        {showNewBadge && (
          <span
            className="absolute top-3 left-3 z-10 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: "oklch(0.65 0.2 145)",
              color: "oklch(0.98 0.005 265)",
              boxShadow: "0 0 8px oklch(0.65 0.2 145 / 0.5)",
            }}
            aria-label="New tool"
          >
            New
          </span>
        )}

        {/* Top row: emoji + category badge */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 select-none"
            style={{
              background: "oklch(0.22 0.03 265 / 0.7)",
              boxShadow: "inset 0 1px 1px oklch(0.5 0.05 265 / 0.2)",
            }}
            aria-hidden="true"
          >
            {tool.logoEmoji}
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border} shrink-0 mt-1`}
          >
            {tool.category}
          </span>
        </div>

        {/* Tool name */}
        <div className="flex-1">
          <h3 className="font-display font-semibold text-foreground text-lg leading-tight mb-2">
            {tool.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {tool.description}
          </p>
        </div>

        {/* Visit button — stops propagation to avoid double navigation */}
        <a
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="tool.card.visit.button"
          onClick={(e) => e.stopPropagation()}
          className={`
            inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
            transition-all duration-200
            border ${colors.border} ${colors.text}
            hover:brightness-110
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
            group-hover:opacity-100 opacity-85
          `}
          style={{
            background: "oklch(0.20 0.025 265 / 0.5)",
          }}
        >
          Visit Tool
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </motion.article>
    </Link>
  );
}

export function ToolCardSkeleton({ index }: { index: number }) {
  return (
    <div
      data-ocid="home.loading_state"
      className="glass-card rounded-xl p-5 flex flex-col gap-4 animate-pulse"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-14 h-14 rounded-xl bg-muted/40" />
        <div className="h-5 w-24 rounded-full bg-muted/40 mt-1" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="h-5 w-3/4 rounded bg-muted/40" />
        <div className="h-4 w-full rounded bg-muted/30" />
        <div className="h-4 w-5/6 rounded bg-muted/30" />
        <div className="h-4 w-2/3 rounded bg-muted/30" />
      </div>
      <div className="h-10 rounded-lg bg-muted/30" />
    </div>
  );
}
