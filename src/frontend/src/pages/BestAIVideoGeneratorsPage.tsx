import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  ChevronRight,
  Sparkles,
  UserCircle,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { ToolCard, ToolCardSkeleton } from "../components/ToolCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useToolsByCategory } from "../hooks/useQueries";

const COMPARISON_HIGHLIGHTS = [
  {
    icon: <UserCircle size={20} style={{ color: "oklch(0.75 0.18 200)" }} />,
    badge: "Best for Creators",
    badgeStyle: {
      background: "oklch(0.6 0.18 200 / 0.12)",
      color: "oklch(0.75 0.18 200)",
      border: "oklch(0.6 0.18 200 / 0.3)",
    },
    tool: "Runway ML",
    emoji: "🎬",
    reason:
      "Runway ML is the go-to for content creators and filmmakers. Its Gen-3 Alpha model delivers cinema-quality video generation with precise creative control over motion, style, and scene composition.",
  },
  {
    icon: <Briefcase size={20} style={{ color: "oklch(0.72 0.2 60)" }} />,
    badge: "Best for Business",
    badgeStyle: {
      background: "oklch(0.72 0.2 60 / 0.12)",
      color: "oklch(0.82 0.16 60)",
      border: "oklch(0.72 0.2 60 / 0.3)",
    },
    tool: "Synthesia",
    emoji: "📽️",
    reason:
      "Synthesia is the industry leader for business video production. Create professional training videos, product demos, and presentations using AI avatars — no camera, no crew required.",
  },
  {
    icon: <Wallet size={20} className="text-emerald-400" />,
    badge: "Best Free Option",
    badgeStyle: {
      background: "oklch(0.65 0.2 145 / 0.12)",
      color: "oklch(0.75 0.18 145)",
      border: "oklch(0.65 0.2 145 / 0.3)",
    },
    tool: "CapCut AI",
    emoji: "✂️",
    reason:
      "CapCut's AI features — auto-captions, smart cut, background removal, and AI effects — are completely free. It's the best starting point for creators who want AI-powered video editing without a subscription.",
  },
];

const FAQ_ITEMS = [
  {
    question: "What is the best AI video generator in 2026?",
    answer:
      "For artistic short-form content, Runway ML Gen-3 leads the pack. For text-to-video with coherent motion, Sora (OpenAI) is groundbreaking. For business presentations, Synthesia and HeyGen are the top choices. For video editing with AI assistance, CapCut and Pictory are excellent.",
  },
  {
    question: "Can I generate a full video from just text?",
    answer:
      "Yes — tools like Sora, Runway ML, Kling AI, and Pika Labs can generate videos from text prompts. Quality has improved dramatically, with coherent motion, realistic physics, and consistent subjects across frames. Longer, high-quality videos still require iteration and editing.",
  },
  {
    question: "How much does AI video generation cost?",
    answer:
      "Pricing varies widely. Runway ML starts at $15/month for 625 credits. Synthesia starts at $29/month. Sora is available within ChatGPT Plus ($20/month). Many tools like CapCut and basic Pictory offer free tiers. Costs scale with video length and resolution.",
  },
  {
    question:
      "Are AI-generated videos good enough for YouTube or social media?",
    answer:
      "For short-form content (Instagram Reels, TikTok, YouTube Shorts), AI-generated videos are absolutely social-media ready. For long-form YouTube content, AI is best used as a production assistant — automating captions, B-roll, and voiceover — rather than generating entire videos.",
  },
  {
    question:
      "What's the difference between AI video generation and AI video editing?",
    answer:
      "AI video generation creates video from scratch (text, image, or concept prompts). AI video editing enhances existing footage — auto-cutting, removing backgrounds, adding captions, changing styles, or synthesizing new scenes. Tools like Runway do both; tools like Pictory and CapCut focus on editing.",
  },
];

export function BestAIVideoGeneratorsPage() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useMetaTags({
    title: "Best AI Video Generators in 2026",
    description:
      "The best AI video generation tools of 2026 — Runway ML, Sora, Synthesia, HeyGen, Pictory and more. Create stunning videos with AI.",
    canonicalUrl: `${origin}/best-ai-video-generators`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best AI Video Generators in 2026",
      description:
        "A curated list of the top AI video generation tools in 2026.",
      url: `${origin}/best-ai-video-generators`,
    },
  });

  const {
    data: videoTools = [],
    isLoading,
    isError,
  } = useToolsByCategory("AI Video Tools");

  return (
    <main data-ocid="video-generators.page" className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden noise-overlay"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.2 220 / 0.2) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.6 0.18 200 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        }}
        aria-label="Best AI Video Generators hero"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link
              to="/"
              data-ocid="video-generators.home.link"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-foreground font-medium">
              Best AI Video Generators
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5 border"
              style={{
                background: "oklch(0.6 0.18 200 / 0.1)",
                borderColor: "oklch(0.6 0.18 200 / 0.35)",
                color: "oklch(0.75 0.15 200)",
              }}
            >
              <Sparkles size={12} aria-hidden="true" />
              Updated for 2026
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.1] mb-5 max-w-3xl">
              Best{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.6 0.2 220))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI Video Generators
              </span>{" "}
              in 2026
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
              AI video generation has made a quantum leap in 2026. From
              text-to-video tools that create cinematic sequences in seconds, to
              AI avatars delivering polished business presentations — creating
              professional video content has never been more accessible. Compare
              the best tools below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tools Grid ─────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label="AI video generation tools"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            All AI Video Generation Tools
          </h2>
          <p className="text-muted-foreground text-sm">
            The complete list of AI video tools ranked by quality and use case.
          </p>
        </motion.div>

        {isError && (
          <div
            data-ocid="video-generators.error_state"
            className="py-20 text-center text-muted-foreground"
          >
            Failed to load tools. Please refresh the page.
          </div>
        )}

        <div
          data-ocid="video-generators.tools.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <ToolCardSkeleton key={i} index={i} />
              ))
            : videoTools.map((tool, i) => (
                <ToolCard key={tool.id.toString()} tool={tool} index={i} />
              ))}
        </div>

        {!isLoading && !isError && videoTools.length === 0 && (
          <div
            data-ocid="video-generators.empty_state"
            className="py-20 text-center text-muted-foreground"
          >
            No video tools available at the moment.
          </div>
        )}
      </section>

      {/* ── Comparison Highlights ──────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label="Tool comparison highlights"
      >
        <div
          className="rounded-2xl p-8 sm:p-12"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.15 0.022 265), oklch(0.17 0.028 210))",
            border: "1px solid oklch(0.6 0.18 200 / 0.2)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 text-center"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
              Which Video AI is Right for You?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our top picks for creators, businesses, and budget-conscious
              users.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {COMPARISON_HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.badge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                className="glass-card rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      background: item.badgeStyle.background,
                      color: item.badgeStyle.color,
                      borderColor: item.badgeStyle.border,
                    }}
                  >
                    {item.icon}
                    {item.badge}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <h3 className="font-display font-bold text-foreground text-lg">
                    {item.tool}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.reason}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20"
        aria-label="Frequently asked questions"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
            AI Video Generator FAQ
          </h2>
          <p className="text-muted-foreground text-sm">
            Common questions about AI video generation.
          </p>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          data-ocid="video-generators.faq.panel"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              data-ocid={`video-generators.faq.item.${i + 1}`}
              className="glass-card rounded-xl border-0 px-5 overflow-hidden"
              style={{
                border: "1px solid oklch(0.6 0.18 200 / 0.2)",
              }}
            >
              <AccordionTrigger
                data-ocid={`video-generators.faq.toggle.${i + 1}`}
                className="font-display font-semibold text-foreground text-left py-4 hover:no-underline hover:text-primary transition-colors"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
