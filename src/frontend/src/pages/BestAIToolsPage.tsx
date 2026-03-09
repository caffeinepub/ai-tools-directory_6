import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";
import {
  BrainCircuit,
  ChevronRight,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { ToolCard, ToolCardSkeleton } from "../components/ToolCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useAllTools } from "../hooks/useQueries";

const WHY_USE_ITEMS = [
  {
    icon: <Zap size={22} className="text-primary" />,
    title: "Save Hours Every Week",
    description:
      "AI tools automate repetitive tasks — from drafting emails to generating images — so you can focus on high-impact work.",
  },
  {
    icon: <BrainCircuit size={22} className="text-accent" />,
    title: "Amplify Your Creativity",
    description:
      "Whether you're a designer, writer, or developer, AI tools extend your capabilities far beyond what's possible manually.",
  },
  {
    icon: <Rocket size={22} style={{ color: "oklch(0.72 0.2 60)" }} />,
    title: "Stay Ahead of the Curve",
    description:
      "The AI landscape evolves rapidly. Using the right tools today gives you a competitive edge in every field.",
  },
];

const FAQ_ITEMS = [
  {
    question: "What are the best AI tools in 2026?",
    answer:
      "The best AI tools depend on your use case. For chatbots and research, ChatGPT, Claude, and Gemini top the charts. For image generation, Midjourney and Leonardo AI lead the pack. For writing, Jasper and Copy.ai are widely used. This directory covers 100+ tools across every major category.",
  },
  {
    question: "Are AI tools free to use?",
    answer:
      "Many AI tools offer free tiers or trials. ChatGPT, Claude, Gemini, Canva AI, DALL-E, Grammarly, and many others have generous free plans. Paid plans typically unlock higher usage limits, advanced models, and commercial licenses.",
  },
  {
    question: "Which AI tool is best for generating images?",
    answer:
      "Midjourney is widely regarded as the gold standard for artistic image generation. DALL-E 3 (integrated into ChatGPT) is excellent for everyday use. Leonardo AI offers fine-grained creative control, and Adobe Firefly is great for commercially safe images.",
  },
  {
    question: "Can AI tools replace human workers?",
    answer:
      "AI tools are best viewed as powerful assistants, not replacements. They excel at speeding up repetitive tasks, generating first drafts, and providing inspiration — but human judgment, creativity, and context remain essential for high-quality results.",
  },
  {
    question: "How do I choose the right AI tool for my needs?",
    answer:
      "Start by identifying your primary use case — writing, image creation, video production, coding, etc. Then look for tools that specialize in that area. Consider free trials before committing to a paid plan, and check if the tool integrates with your existing workflow.",
  },
];

export function BestAIToolsPage() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useMetaTags({
    title: "Best AI Tools in 2026",
    description:
      "Discover the best AI tools available in 2026 — from image generators to chatbots, writing assistants, and productivity boosters. Curated and updated regularly.",
    canonicalUrl: `${origin}/best-ai-tools`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best AI Tools in 2026",
      description:
        "A curated list of the best AI tools available in 2026 across all categories.",
      url: `${origin}/best-ai-tools`,
    },
  });

  const { data: allTools = [], isLoading, isError } = useAllTools();
  const displayedTools = allTools.slice(0, 20);

  return (
    <main data-ocid="best-ai-tools.page" className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden hero-gradient noise-overlay"
        aria-label="Best AI Tools hero"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link
              to="/"
              data-ocid="best-ai-tools.home.link"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-foreground font-medium">Best AI Tools</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5 border"
              style={{
                background: "oklch(0.72 0.18 200 / 0.1)",
                borderColor: "oklch(0.72 0.18 200 / 0.3)",
                color: "oklch(0.82 0.12 200)",
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
                    "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.65 0.2 285), oklch(0.68 0.22 355))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI Tools
              </span>{" "}
              in 2026
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
              AI tools are transforming the way we work, create, and
              communicate. From intelligent chatbots that draft your emails, to
              image generators that bring ideas to life in seconds — the right
              AI tools can multiply your productivity and creativity. This
              curated directory covers the top 100+ AI tools across every major
              category, updated regularly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Top Tools Grid ─────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label="Top AI tools"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            Top 20 AI Tools Right Now
          </h2>
          <p className="text-muted-foreground text-sm">
            The most popular and highly rated AI tools across all categories.
          </p>
        </motion.div>

        {isError && (
          <div
            data-ocid="best-ai-tools.error_state"
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          >
            <p className="text-muted-foreground">
              Failed to load tools. Please refresh the page.
            </p>
          </div>
        )}

        <div
          data-ocid="best-ai-tools.tools.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <ToolCardSkeleton key={i} index={i} />
              ))
            : displayedTools.map((tool, i) => (
                <ToolCard key={tool.id.toString()} tool={tool} index={i} />
              ))}
        </div>

        {!isLoading && !isError && displayedTools.length === 0 && (
          <div
            data-ocid="best-ai-tools.empty_state"
            className="py-20 text-center text-muted-foreground"
          >
            No tools available at the moment.
          </div>
        )}
      </section>

      {/* ── Why Use AI Tools ───────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label="Why use AI tools"
      >
        <div
          className="rounded-2xl p-8 sm:p-12"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.16 0.022 265), oklch(0.18 0.025 285))",
            border: "1px solid oklch(0.32 0.04 265 / 0.4)",
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
              Why Use AI Tools?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The best AI tools don't replace your expertise — they amplify it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {WHY_USE_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                className="glass-card rounded-xl p-6 flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(0.22 0.03 265 / 0.8)",
                    border: "1px solid oklch(0.35 0.04 265 / 0.4)",
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground text-base">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
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
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to know about AI tools in 2026.
          </p>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          data-ocid="best-ai-tools.faq.panel"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              data-ocid={`best-ai-tools.faq.item.${i + 1}`}
              className="glass-card rounded-xl border-0 px-5 overflow-hidden"
              style={{
                border: "1px solid oklch(0.32 0.035 265 / 0.4)",
              }}
            >
              <AccordionTrigger
                data-ocid={`best-ai-tools.faq.toggle.${i + 1}`}
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
