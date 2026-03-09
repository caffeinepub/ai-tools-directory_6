import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, Lock, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { ToolCard, ToolCardSkeleton } from "../components/ToolCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useAllTools } from "../hooks/useQueries";

const FREE_TOOL_NAMES = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Microsoft Copilot",
  "Perplexity",
  "Canva AI",
  "DALL-E",
  "Stable Diffusion",
  "Firefly",
  "Bing Image Creator",
  "Runway",
  "CapCut",
  "Pictory",
  "Grammarly",
  "QuillBot",
  "Copy.ai",
  "Writesonic",
  "Otter.ai",
  "Notion AI",
  "Gamma",
  "Suno",
  "Mubert",
  "GitHub Copilot",
  "Replit",
  "Google Bard",
  "You.com",
  "Character.AI",
  "Poe",
];

const FREE_ADVANTAGES = [
  "Zero upfront cost — start immediately",
  "Great for learning and exploration",
  "Sufficient for light or personal use",
];

const PAID_ADVANTAGES = [
  "Higher usage limits and rate caps",
  "Access to the latest, most powerful models",
  "Commercial usage rights included",
];

const FAQ_ITEMS = [
  {
    question: "Are there truly free AI tools, or just free trials?",
    answer:
      "Yes — many AI tools offer genuinely free tiers, not just trials. ChatGPT's free tier gives unlimited access to GPT-4o Mini. Gemini, Claude, Perplexity, and many others have permanent free plans. These typically have usage limits or restrict access to newer model versions, but are fully functional indefinitely.",
  },
  {
    question: "What is the best free AI chatbot in 2026?",
    answer:
      "ChatGPT's free tier (GPT-4o Mini) and Google Gemini's free tier are the top contenders. Perplexity AI is excellent for research with real-time web access on the free plan. Claude's free tier is highly regarded for nuanced, thoughtful responses.",
  },
  {
    question: "Can I use free AI tools for commercial projects?",
    answer:
      "It depends on the tool. Many free tiers restrict commercial usage. Always check the platform's Terms of Service. As a general rule: ChatGPT's free tier allows commercial use; DALL-E free outputs require attribution; Adobe Firefly free plan allows commercial use. When in doubt, upgrade to a paid plan.",
  },
  {
    question: "What are the best free AI image generators?",
    answer:
      "DALL-E 3 via ChatGPT free tier, Adobe Firefly (free plan), Canva AI free, and Stable Diffusion (open source, run locally for free) are the top free image generation options. Bing Image Creator (powered by DALL-E) is completely free.",
  },
  {
    question: "When should I upgrade from a free to a paid AI tool?",
    answer:
      "Consider upgrading when: you consistently hit rate limits, you need access to the most advanced models (GPT-4o, Claude 3.5 Sonnet, Gemini Ultra), you require commercial licensing, you need team collaboration features, or your workflow depends on API access for automation.",
  },
];

export function FreeAIToolsPage() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useMetaTags({
    title: "Free AI Tools — Best Free AI Tools in 2026",
    description:
      "The best free AI tools available in 2026 — ChatGPT, Claude, Gemini, Canva AI, DALL-E, and more. Get started with AI for free today.",
    canonicalUrl: `${origin}/free-ai-tools`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best Free AI Tools in 2026",
      description:
        "A curated list of the best free AI tools available in 2026.",
      url: `${origin}/free-ai-tools`,
    },
  });

  const { data: allTools = [], isLoading, isError } = useAllTools();

  const freeTools = useMemo(() => {
    return allTools.filter((tool) =>
      FREE_TOOL_NAMES.some((name) =>
        tool.name.toLowerCase().includes(name.toLowerCase()),
      ),
    );
  }, [allTools]);

  return (
    <main data-ocid="free-ai-tools.page" className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden noise-overlay"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.65 0.2 145 / 0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.72 0.18 200 / 0.1) 0%, transparent 50%), oklch(0.12 0.018 265)",
        }}
        aria-label="Free AI Tools hero"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link
              to="/"
              data-ocid="free-ai-tools.home.link"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-foreground font-medium">Free AI Tools</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5 border"
              style={{
                background: "oklch(0.65 0.2 145 / 0.12)",
                borderColor: "oklch(0.65 0.2 145 / 0.35)",
                color: "oklch(0.78 0.16 145)",
              }}
            >
              <Sparkles size={12} aria-hidden="true" />
              Free to Use — No Credit Card Required
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.1] mb-5 max-w-3xl">
              Best{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.2 145), oklch(0.72 0.18 200))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Free AI Tools
              </span>{" "}
              in 2026
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
              You don't need to spend a dollar to access powerful AI tools. In
              2026, dozens of the most capable AI systems — from ChatGPT to
              Gemini, Claude to DALL-E — offer generous free tiers. Here's the
              definitive list of the best free AI tools you can use right now,
              no credit card needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Free Tools Grid ────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label="Free AI tools"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex items-start justify-between gap-4 mb-8 flex-wrap"
        >
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Free AI Tools Directory
            </h2>
            <p className="text-muted-foreground text-sm">
              {isLoading
                ? "Loading..."
                : `${freeTools.length} free AI tools available — all with free tiers or open-source options.`}
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              background: "oklch(0.65 0.2 145 / 0.1)",
              borderColor: "oklch(0.65 0.2 145 / 0.3)",
              color: "oklch(0.75 0.18 145)",
            }}
          >
            <span aria-hidden="true">✅</span> Free Tier Available
          </div>
        </motion.div>

        {isError && (
          <div
            data-ocid="free-ai-tools.error_state"
            className="py-20 text-center text-muted-foreground"
          >
            Failed to load tools. Please refresh the page.
          </div>
        )}

        <div
          data-ocid="free-ai-tools.tools.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <ToolCardSkeleton key={i} index={i} />
              ))
            : freeTools.map((tool, i) => (
                <ToolCard key={tool.id.toString()} tool={tool} index={i} />
              ))}
        </div>

        {!isLoading && !isError && freeTools.length === 0 && (
          <div
            data-ocid="free-ai-tools.empty_state"
            className="py-20 text-center text-muted-foreground"
          >
            No free tools found. Check back soon!
          </div>
        )}
      </section>

      {/* ── Free vs Paid ───────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label="Free vs paid AI tools comparison"
      >
        <div
          className="rounded-2xl p-8 sm:p-12"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.15 0.022 265), oklch(0.17 0.025 145))",
            border: "1px solid oklch(0.65 0.2 145 / 0.2)",
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
              Free vs Paid AI Tools
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              When does it make sense to upgrade? Here's a clear breakdown.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: "oklch(0.65 0.2 145 / 0.15)",
                    border: "1px solid oklch(0.65 0.2 145 / 0.3)",
                  }}
                >
                  <Sparkles
                    size={16}
                    style={{ color: "oklch(0.75 0.18 145)" }}
                  />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg">
                  Free Tier
                </h3>
              </div>
              <ul className="space-y-3">
                {FREE_ADVANTAGES.map((advantage) => (
                  <li
                    key={advantage}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check
                      size={15}
                      className="shrink-0 mt-0.5"
                      style={{ color: "oklch(0.72 0.2 145)" }}
                      aria-hidden="true"
                    />
                    {advantage}
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <X
                    size={15}
                    className="shrink-0 mt-0.5 text-destructive"
                    aria-hidden="true"
                  />
                  Rate limits can interrupt workflows
                </li>
              </ul>
            </motion.div>

            {/* Paid column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="glass-card rounded-xl p-6"
              style={{
                borderColor: "oklch(0.72 0.18 200 / 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: "oklch(0.72 0.18 200 / 0.15)",
                    border: "1px solid oklch(0.72 0.18 200 / 0.3)",
                  }}
                >
                  <Lock size={16} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg">
                  Paid Plan
                </h3>
              </div>
              <ul className="space-y-3">
                {PAID_ADVANTAGES.map((advantage) => (
                  <li
                    key={advantage}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check
                      size={15}
                      className="text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {advantage}
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <X
                    size={15}
                    className="shrink-0 mt-0.5 text-destructive"
                    aria-hidden="true"
                  />
                  Monthly cost adds up across multiple tools
                </li>
              </ul>
            </motion.div>
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
            Free AI Tools FAQ
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to know about getting started with free AI
            tools.
          </p>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          data-ocid="free-ai-tools.faq.panel"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              data-ocid={`free-ai-tools.faq.item.${i + 1}`}
              className="glass-card rounded-xl border-0 px-5 overflow-hidden"
              style={{
                border: "1px solid oklch(0.65 0.2 145 / 0.2)",
              }}
            >
              <AccordionTrigger
                data-ocid={`free-ai-tools.faq.toggle.${i + 1}`}
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
