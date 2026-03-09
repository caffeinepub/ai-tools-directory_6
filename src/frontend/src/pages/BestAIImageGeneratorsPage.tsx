import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles, Star, Users, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { ToolCard, ToolCardSkeleton } from "../components/ToolCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useToolsByCategory } from "../hooks/useQueries";

const COMPARISON_HIGHLIGHTS = [
  {
    icon: <Users size={20} className="text-emerald-400" />,
    badge: "Best for Beginners",
    badgeStyle: {
      background: "oklch(0.65 0.2 145 / 0.12)",
      color: "oklch(0.75 0.18 145)",
      border: "oklch(0.65 0.2 145 / 0.3)",
    },
    tool: "Canva AI",
    emoji: "🎨",
    reason:
      "Canva's Magic Studio is the most beginner-friendly AI image tool — no prompting skills required. Drag-and-drop, templates, and one-click AI generation make it accessible to anyone.",
  },
  {
    icon: <Star size={20} style={{ color: "oklch(0.78 0.2 285)" }} />,
    badge: "Best for Artists",
    badgeStyle: {
      background: "oklch(0.55 0.22 285 / 0.12)",
      color: "oklch(0.78 0.15 285)",
      border: "oklch(0.55 0.22 285 / 0.3)",
    },
    tool: "Midjourney",
    emoji: "🖼️",
    reason:
      "Midjourney produces the most aesthetically stunning results for artists and creatives. Its unique art direction, style consistency, and photorealistic rendering set it apart from all competitors.",
  },
  {
    icon: <Wallet size={20} style={{ color: "oklch(0.78 0.2 60)" }} />,
    badge: "Best Free Option",
    badgeStyle: {
      background: "oklch(0.72 0.2 60 / 0.12)",
      color: "oklch(0.82 0.16 60)",
      border: "oklch(0.72 0.2 60 / 0.3)",
    },
    tool: "DALL-E 3",
    emoji: "⚡",
    reason:
      "DALL-E 3 integrated into ChatGPT's free tier gives you access to powerful image generation without spending a penny. Accurate, creative, and available to millions right now.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Which AI image generator is best in 2026?",
    answer:
      "Midjourney remains the top choice for artistic quality and aesthetics. DALL-E 3 (via ChatGPT) excels at following text instructions precisely. Leonardo AI offers fine-grained creative control, and Adobe Firefly is best for commercially safe, stock-photo-style images.",
  },
  {
    question: "Is Midjourney free to use?",
    answer:
      "Midjourney no longer offers a free trial — it requires a paid subscription starting at $10/month. However, DALL-E 3 (in ChatGPT free tier), Stable Diffusion (self-hosted), and Canva AI's free plan all offer free image generation options.",
  },
  {
    question: "Can AI generate realistic, photographic images?",
    answer:
      "Yes — tools like Midjourney v6, FLUX, and Stable Diffusion XL can produce photorealistic images that are often indistinguishable from real photographs. Results depend heavily on the quality of your prompt and the model version used.",
  },
  {
    question: "Are AI-generated images copyright-free?",
    answer:
      "Copyright law around AI images is still evolving. Adobe Firefly and Canva AI are designed with commercial safety in mind, trained on licensed content. Midjourney and DALL-E outputs have complex licensing terms — always check the platform's ToS before commercial use.",
  },
  {
    question: "What makes a good AI image prompt?",
    answer:
      "Great prompts are specific: include subject, style, lighting, color palette, mood, and camera/lens details. For example: 'A futuristic city at dusk, cyberpunk aesthetic, neon lighting, shot with a wide-angle lens, 8K, hyperrealistic.' Negative prompts (what to exclude) also dramatically improve results.",
  },
];

export function BestAIImageGeneratorsPage() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useMetaTags({
    title: "Best AI Image Generators in 2026",
    description:
      "The top AI image generators of 2026 — Midjourney, DALL-E 3, Stable Diffusion, Leonardo AI, and more. Compare features and find the right tool for you.",
    canonicalUrl: `${origin}/best-ai-image-generators`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best AI Image Generators in 2026",
      description:
        "A curated list of the top AI image generation tools in 2026.",
      url: `${origin}/best-ai-image-generators`,
    },
  });

  const {
    data: imageTools = [],
    isLoading,
    isError,
  } = useToolsByCategory("AI Image Tools");

  return (
    <main data-ocid="image-generators.page" className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden noise-overlay"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.22 285 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.65 0.2 320 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        }}
        aria-label="Best AI Image Generators hero"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link
              to="/"
              data-ocid="image-generators.home.link"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-foreground font-medium">
              Best AI Image Generators
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
                background: "oklch(0.55 0.22 285 / 0.12)",
                borderColor: "oklch(0.55 0.22 285 / 0.35)",
                color: "oklch(0.78 0.15 285)",
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
                    "linear-gradient(135deg, oklch(0.72 0.2 285), oklch(0.65 0.22 320))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI Image Generators
              </span>{" "}
              in 2026
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
              AI image generation has reached an astonishing level of quality in
              2026. Whether you need photorealistic photographs, stunning
              artwork, logos, or illustrations — there's an AI image tool built
              for your exact need. We've tested and ranked the best so you don't
              have to.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tools Grid ─────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label="AI image generation tools"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            All AI Image Generation Tools
          </h2>
          <p className="text-muted-foreground text-sm">
            Every major AI image generator, ranked and reviewed.
          </p>
        </motion.div>

        {isError && (
          <div
            data-ocid="image-generators.error_state"
            className="py-20 text-center text-muted-foreground"
          >
            Failed to load tools. Please refresh the page.
          </div>
        )}

        <div
          data-ocid="image-generators.tools.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <ToolCardSkeleton key={i} index={i} />
              ))
            : imageTools.map((tool, i) => (
                <ToolCard key={tool.id.toString()} tool={tool} index={i} />
              ))}
        </div>

        {!isLoading && !isError && imageTools.length === 0 && (
          <div
            data-ocid="image-generators.empty_state"
            className="py-20 text-center text-muted-foreground"
          >
            No image tools available at the moment.
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
              "linear-gradient(135deg, oklch(0.15 0.022 265), oklch(0.17 0.03 285))",
            border: "1px solid oklch(0.55 0.22 285 / 0.2)",
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
              Which Image AI is Right for You?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Here's our pick for each use case, based on extensive testing.
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
            AI Image Generator FAQ
          </h2>
          <p className="text-muted-foreground text-sm">
            Common questions about AI image generation tools.
          </p>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          data-ocid="image-generators.faq.panel"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              data-ocid={`image-generators.faq.item.${i + 1}`}
              className="glass-card rounded-xl border-0 px-5 overflow-hidden"
              style={{
                border: "1px solid oklch(0.55 0.22 285 / 0.2)",
              }}
            >
              <AccordionTrigger
                data-ocid={`image-generators.faq.toggle.${i + 1}`}
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
