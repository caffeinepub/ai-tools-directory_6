import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  Check,
  ChevronDown,
  ExternalLink,
  RotateCcw,
  Search,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Tool } from "../backend.d.ts";
import { getComparisonMeta } from "../data/comparisonData";
import { useMetaTags } from "../hooks/useMetaTags";
import { useAllTools } from "../hooks/useQueries";

// ── Star rating display ─────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <span key={i} className="relative inline-block" aria-hidden="true">
            <Star size={16} className="text-muted-foreground/30" fill="none" />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star
                  size={16}
                  className="text-amber-400"
                  fill="currentColor"
                />
              </span>
            )}
          </span>
        );
      })}
      <span className="ml-1.5 text-sm font-semibold text-foreground">
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-muted-foreground">/5</span>
    </div>
  );
}

// ── Price tier badge ────────────────────────────────────────────────
function TierBadge({ tier }: { tier: "free" | "freemium" | "paid" }) {
  const config = {
    free: {
      label: "Free",
      className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    },
    freemium: {
      label: "Freemium",
      className: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    },
    paid: {
      label: "Paid",
      className: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    },
  };
  const c = config[tier];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${c.className}`}
    >
      {c.label}
    </span>
  );
}

// ── Tool selector combobox ──────────────────────────────────────────
interface ToolSelectorProps {
  label: string;
  tools: Tool[];
  selected: Tool | null;
  onSelect: (tool: Tool) => void;
  onClear: () => void;
  ocidSelect: string;
  ocidClear: string;
  color: string;
}

function ToolSelector({
  label,
  tools,
  selected,
  onSelect,
  onClear,
  ocidSelect,
  ocidClear,
  color,
}: ToolSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return tools.slice(0, 40);
    const q = query.toLowerCase();
    return tools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      )
      .slice(0, 30);
  }, [tools, query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        {label}
      </p>

      {selected ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-xl p-4 flex items-center gap-4"
          style={{ borderColor: `${color}40` }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: "oklch(0.20 0.03 265 / 0.8)" }}
          >
            {selected.logoEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-lg text-foreground truncate">
              {selected.name}
            </p>
            <span className="text-xs text-muted-foreground">
              {selected.category}
            </span>
          </div>
          <button
            type="button"
            data-ocid={ocidClear}
            onClick={onClear}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
            aria-label={`Clear ${label}`}
          >
            <X size={16} />
          </button>
        </motion.div>
      ) : (
        <div>
          <button
            type="button"
            data-ocid={ocidSelect}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="listbox"
            className="w-full glass-card rounded-xl px-4 py-4 flex items-center justify-between text-left transition-all duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ borderColor: open ? `${color}50` : undefined }}
          >
            <span className="text-muted-foreground text-sm">
              Select a tool...
            </span>
            <ChevronDown
              size={16}
              className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 right-0 top-full mt-1.5 rounded-xl overflow-hidden z-50"
                style={{
                  background: "oklch(0.16 0.022 265)",
                  border: "1px solid oklch(0.32 0.035 265 / 0.6)",
                  boxShadow:
                    "0 8px 32px oklch(0.06 0.01 265 / 0.6), 0 2px 8px oklch(0.06 0.01 265 / 0.4)",
                }}
              >
                {/* Search input */}
                <div
                  className="p-2 border-b"
                  style={{ borderColor: "oklch(0.28 0.025 265 / 0.5)" }}
                >
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search tools..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-transparent pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                      aria-label="Search tools"
                    />
                  </div>
                </div>

                {/* Tool list */}
                <div className="max-h-64 overflow-y-auto p-1.5 scrollbar-hide">
                  {filtered.length === 0 ? (
                    <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                      No tools found
                    </p>
                  ) : (
                    filtered.map((tool) => (
                      <button
                        key={tool.id.toString()}
                        type="button"
                        aria-selected={false}
                        onClick={() => {
                          onSelect(tool);
                          setOpen(false);
                          setQuery("");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:bg-secondary"
                      >
                        <span className="text-xl shrink-0">
                          {tool.logoEmoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {tool.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {tool.category}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ── Comparison table row ────────────────────────────────────────────
interface TableRowProps {
  label: string;
  cellA: React.ReactNode;
  cellB: React.ReactNode;
  highlight?: "a" | "b" | null;
}

function ComparisonRow({ label, cellA, cellB, highlight }: TableRowProps) {
  return (
    <div className="grid grid-cols-[140px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr] border-b border-border/40 last:border-b-0">
      {/* Label */}
      <div className="px-4 py-5 flex items-start">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground leading-tight mt-0.5">
          {label}
        </span>
      </div>

      {/* Tool A cell */}
      <div
        className={`px-4 py-5 border-l border-border/40 transition-colors ${
          highlight === "a" ? "bg-primary/8" : ""
        }`}
        style={
          highlight === "a"
            ? { background: "oklch(0.72 0.18 200 / 0.07)" }
            : undefined
        }
      >
        {cellA}
      </div>

      {/* Tool B cell */}
      <div
        className={`px-4 py-5 border-l border-border/40 transition-colors ${
          highlight === "b" ? "bg-accent/8" : ""
        }`}
        style={
          highlight === "b"
            ? { background: "oklch(0.55 0.22 285 / 0.07)" }
            : undefined
        }
      >
        {cellB}
      </div>
    </div>
  );
}

// ── Popular pairs ───────────────────────────────────────────────────
const POPULAR_PAIRS: { a: string; b: string; label: string }[] = [
  { a: "ChatGPT", b: "Claude", label: "ChatGPT vs Claude" },
  { a: "Midjourney", b: "DALL-E 3", label: "Midjourney vs DALL-E 3" },
  { a: "Runway ML", b: "Synthesia", label: "Runway vs Synthesia" },
  { a: "Jasper AI", b: "Copy.ai", label: "Jasper vs Copy.ai" },
  { a: "ElevenLabs", b: "Suno AI", label: "ElevenLabs vs Suno" },
  { a: "Google Gemini", b: "Perplexity AI", label: "Gemini vs Perplexity" },
];

// ── Main page ───────────────────────────────────────────────────────
export function ComparisonPage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as {
    toolA?: string;
    toolB?: string;
  };

  const { data: allTools = [], isLoading } = useAllTools();

  const [toolA, setToolA] = useState<Tool | null>(null);
  const [toolB, setToolB] = useState<Tool | null>(null);

  useMetaTags({
    title: "Compare AI Tools — Side-by-Side Comparison | AI Tools Directory",
    description:
      "Compare AI tools side by side. See price, features, rating, and ease of use in a clear table format.",
    canonicalUrl: `${window.location.origin}/compare`,
  });

  // Initialize from URL params (only on initial tool load)
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time init when tools first load
  useEffect(() => {
    if (!allTools.length) return;
    const paramA = searchParams.toolA;
    const paramB = searchParams.toolB;
    if (paramA) {
      const found = allTools.find((t) => t.id.toString() === paramA);
      if (found) setToolA(found);
    }
    if (paramB) {
      const found = allTools.find((t) => t.id.toString() === paramB);
      if (found) setToolB(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTools.length]);

  // Sync URL params when tools change
  const handleSelectToolA = (tool: Tool) => {
    setToolA(tool);
    navigate({
      to: "/compare",
      search: {
        toolA: tool.id.toString(),
        ...(toolB ? { toolB: toolB.id.toString() } : {}),
      },
    });
  };

  const handleSelectToolB = (tool: Tool) => {
    setToolB(tool);
    navigate({
      to: "/compare",
      search: {
        ...(toolA ? { toolA: toolA.id.toString() } : {}),
        toolB: tool.id.toString(),
      },
    });
  };

  const handleClearA = () => {
    setToolA(null);
    navigate({
      to: "/compare",
      search: toolB ? { toolB: toolB.id.toString() } : {},
    });
  };

  const handleClearB = () => {
    setToolB(null);
    navigate({
      to: "/compare",
      search: toolA ? { toolA: toolA.id.toString() } : {},
    });
  };

  const handleReset = () => {
    setToolA(null);
    setToolB(null);
    navigate({ to: "/compare", search: {} });
  };

  // Pair quick-select from popular pairs
  const handlePairSelect = (
    _pairLabel: string,
    pairA: string,
    pairB: string,
  ) => {
    const foundA = allTools.find((t) => t.name === pairA);
    const foundB = allTools.find((t) => t.name === pairB);
    if (foundA) setToolA(foundA);
    if (foundB) setToolB(foundB);
    navigate({
      to: "/compare",
      search: {
        ...(foundA ? { toolA: foundA.id.toString() } : {}),
        ...(foundB ? { toolB: foundB.id.toString() } : {}),
      },
    });
  };

  const metaA = toolA ? getComparisonMeta(toolA.name) : null;
  const metaB = toolB ? getComparisonMeta(toolB.name) : null;
  const bothSelected = !!toolA && !!toolB && !!metaA && !!metaB;

  return (
    <main data-ocid="compare.page" className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        aria-label="Compare AI Tools"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% -10%, oklch(0.55 0.22 285 / 0.18) 0%, transparent 60%),
              radial-gradient(ellipse 40% 35% at 15% 70%, oklch(0.72 0.18 200 / 0.10) 0%, transparent 55%),
              oklch(0.12 0.018 265)
            `,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 200 / 0.9), oklch(0.55 0.22 285 / 0.9))",
                  boxShadow: "0 6px 24px oklch(0.72 0.18 200 / 0.35)",
                }}
              >
                <ArrowLeftRight size={22} className="text-white" />
              </div>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground tracking-tight mb-4">
              Compare{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.65 0.22 285))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI Tools
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Pick any two AI tools and see a side-by-side breakdown of price,
              features, rating, and ease of use.
            </p>
          </motion.div>

          {/* ── Selector cards ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative"
          >
            {/* VS badge */}
            <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-foreground"
                style={{
                  background: "oklch(0.22 0.03 265)",
                  border: "2px solid oklch(0.38 0.04 265 / 0.5)",
                  boxShadow: "0 2px 12px oklch(0.06 0.01 265 / 0.5)",
                }}
              >
                VS
              </div>
            </div>

            {/* Tool A */}
            <div
              className="glass-card rounded-2xl p-6"
              style={{ borderColor: "oklch(0.72 0.18 200 / 0.3)" }}
            >
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
              ) : (
                <ToolSelector
                  label="Tool A"
                  tools={allTools}
                  selected={toolA}
                  onSelect={handleSelectToolA}
                  onClear={handleClearA}
                  ocidSelect="compare.tool_a.select"
                  ocidClear="compare.tool_a.clear.button"
                  color="oklch(0.72 0.18 200)"
                />
              )}
            </div>

            {/* Tool B */}
            <div
              className="glass-card rounded-2xl p-6"
              style={{ borderColor: "oklch(0.55 0.22 285 / 0.3)" }}
            >
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
              ) : (
                <ToolSelector
                  label="Tool B"
                  tools={allTools}
                  selected={toolB}
                  onSelect={handleSelectToolB}
                  onClear={handleClearB}
                  ocidSelect="compare.tool_b.select"
                  ocidClear="compare.tool_b.clear.button"
                  color="oklch(0.55 0.22 285)"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Comparison table or empty state ──────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <AnimatePresence mode="wait">
          {!bothSelected ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              data-ocid="compare.empty_state"
              className="flex flex-col items-center justify-center gap-6 py-24 text-center"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: "oklch(0.20 0.028 265 / 0.8)",
                  border: "1px solid oklch(0.38 0.04 265 / 0.3)",
                }}
              >
                <ArrowLeftRight
                  size={32}
                  className="text-muted-foreground/50"
                />
              </div>
              <div className="max-w-sm">
                <h2 className="font-display font-bold text-xl text-foreground mb-2">
                  Select two tools to compare
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose Tool A and Tool B from the dropdowns above, or pick a
                  popular pair below to get started instantly.
                </p>
              </div>

              {/* Popular pairs */}
              {allTools.length > 0 && (
                <div className="w-full max-w-lg">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    Popular comparisons
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {POPULAR_PAIRS.map((pair) => (
                      <button
                        key={pair.label}
                        type="button"
                        onClick={() =>
                          handlePairSelect(pair.label, pair.a, pair.b)
                        }
                        className="glass-card rounded-xl px-4 py-3 text-sm text-left font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 flex items-center gap-2.5"
                      >
                        <Zap size={13} className="text-primary shrink-0" />
                        {pair.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-8"
            >
              {/* Table header */}
              <div
                data-ocid="compare.table"
                className="glass-card rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid oklch(0.38 0.04 265 / 0.4)",
                }}
              >
                {/* Sticky header row */}
                <div
                  className="grid grid-cols-[140px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr] border-b"
                  style={{
                    background: "oklch(0.16 0.022 265 / 0.95)",
                    borderColor: "oklch(0.38 0.04 265 / 0.4)",
                  }}
                >
                  <div className="px-4 py-5" />

                  {/* Tool A header */}
                  <div
                    className="px-4 py-5 border-l"
                    style={{
                      borderColor: "oklch(0.38 0.04 265 / 0.4)",
                      background: "oklch(0.72 0.18 200 / 0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{toolA!.logoEmoji}</span>
                      <div>
                        <p className="font-display font-bold text-base text-foreground leading-tight">
                          {toolA!.name}
                        </p>
                        <span className="text-xs text-primary/80">Tool A</span>
                      </div>
                    </div>
                  </div>

                  {/* Tool B header */}
                  <div
                    className="px-4 py-5 border-l"
                    style={{
                      borderColor: "oklch(0.38 0.04 265 / 0.4)",
                      background: "oklch(0.55 0.22 285 / 0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{toolB!.logoEmoji}</span>
                      <div>
                        <p className="font-display font-bold text-base text-foreground leading-tight">
                          {toolB!.name}
                        </p>
                        <span className="text-xs text-accent/80">Tool B</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row: Overview */}
                <ComparisonRow
                  label="Overview"
                  cellA={
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {toolA!.description}
                    </p>
                  }
                  cellB={
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {toolB!.description}
                    </p>
                  }
                />

                {/* Row: Category */}
                <ComparisonRow
                  label="Category"
                  cellA={
                    <Badge variant="outline" className="text-xs">
                      {toolA!.category}
                    </Badge>
                  }
                  cellB={
                    <Badge variant="outline" className="text-xs">
                      {toolB!.category}
                    </Badge>
                  }
                />

                {/* Row: Price */}
                <ComparisonRow
                  label="Price"
                  cellA={
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        {metaA!.price}
                      </p>
                      <TierBadge tier={metaA!.priceTier} />
                    </div>
                  }
                  cellB={
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        {metaB!.price}
                      </p>
                      <TierBadge tier={metaB!.priceTier} />
                    </div>
                  }
                />

                {/* Row: Key Features */}
                <ComparisonRow
                  label="Features"
                  cellA={
                    <ul className="space-y-1.5">
                      {metaA!.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check
                            size={13}
                            className="text-primary mt-0.5 shrink-0"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  }
                  cellB={
                    <ul className="space-y-1.5">
                      {metaB!.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check
                            size={13}
                            className="text-accent mt-0.5 shrink-0"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  }
                />

                {/* Row: Rating */}
                <ComparisonRow
                  label="Rating"
                  highlight={
                    metaA!.rating > metaB!.rating
                      ? "a"
                      : metaB!.rating > metaA!.rating
                        ? "b"
                        : null
                  }
                  cellA={<StarRating rating={metaA!.rating} />}
                  cellB={<StarRating rating={metaB!.rating} />}
                />

                {/* Row: Ease of Use */}
                <ComparisonRow
                  label="Ease of Use"
                  highlight={
                    metaA!.easeOfUse > metaB!.easeOfUse
                      ? "a"
                      : metaB!.easeOfUse > metaA!.easeOfUse
                        ? "b"
                        : null
                  }
                  cellA={
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {metaA!.easeOfUse.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {metaA!.easeLabel}
                        </span>
                      </div>
                      <Progress
                        value={(metaA!.easeOfUse / 5) * 100}
                        className="h-2 w-full max-w-[180px]"
                        style={
                          {
                            "--progress-foreground": "oklch(0.72 0.18 200)",
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  }
                  cellB={
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {metaB!.easeOfUse.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {metaB!.easeLabel}
                        </span>
                      </div>
                      <Progress
                        value={(metaB!.easeOfUse / 5) * 100}
                        className="h-2 w-full max-w-[180px]"
                        style={
                          {
                            "--progress-foreground": "oklch(0.55 0.22 285)",
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  }
                />

                {/* Row: Visit */}
                <ComparisonRow
                  label="Website"
                  cellA={
                    <a
                      href={toolA!.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="compare.tool_a.visit.button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.72 0.18 200 / 0.85), oklch(0.65 0.22 220 / 0.85))",
                        color: "oklch(0.1 0.015 265)",
                        boxShadow: "0 3px 14px oklch(0.72 0.18 200 / 0.3)",
                      }}
                    >
                      <ExternalLink size={14} />
                      Visit {toolA!.name}
                    </a>
                  }
                  cellB={
                    <a
                      href={toolB!.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="compare.tool_b.visit.button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.55 0.22 285 / 0.85), oklch(0.65 0.2 305 / 0.85))",
                        color: "oklch(0.98 0.005 265)",
                        boxShadow: "0 3px 14px oklch(0.55 0.22 285 / 0.3)",
                      }}
                    >
                      <ExternalLink size={14} />
                      Visit {toolB!.name}
                    </a>
                  }
                />
              </div>

              {/* Reset + suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                className="mt-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">
                      Compare Different Tools
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Try one of these popular matchups
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="compare.reset.button"
                    onClick={handleReset}
                    className="gap-2 shrink-0"
                  >
                    <RotateCcw size={14} />
                    Reset Comparison
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {POPULAR_PAIRS.map((pair) => {
                    const isActive =
                      (toolA?.name === pair.a && toolB?.name === pair.b) ||
                      (toolA?.name === pair.b && toolB?.name === pair.a);
                    return (
                      <button
                        key={pair.label}
                        type="button"
                        onClick={() =>
                          handlePairSelect(pair.label, pair.a, pair.b)
                        }
                        disabled={isActive}
                        className={`glass-card rounded-xl px-4 py-3 text-sm text-left font-medium transition-all duration-200 flex items-center gap-2 ${
                          isActive
                            ? "opacity-50 cursor-default border-primary/30 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:border-primary/30"
                        }`}
                      >
                        <Zap size={13} className="text-primary shrink-0" />
                        {pair.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
