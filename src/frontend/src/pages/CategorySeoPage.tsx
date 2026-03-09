import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useParams } from "@tanstack/react-router";
import {
  BrainCircuit,
  ChevronRight,
  Clock,
  Globe,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { ToolCard, ToolCardSkeleton } from "../components/ToolCard";
import { useMetaTags } from "../hooks/useMetaTags";
import { useToolsByCategory } from "../hooks/useQueries";

// ── Slug ↔ Category mapping ──────────────────────────────────────────
const SLUG_TO_CATEGORY: Record<string, string> = {
  "ai-chatbots": "AI Chatbots",
  "ai-image-tools": "AI Image Tools",
  "ai-video-tools": "AI Video Tools",
  "ai-writing-tools": "AI Writing Tools",
  "ai-music-tools": "AI Music Tools",
  "ai-productivity-tools": "AI Productivity Tools",
};

export function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// ── Category-specific content ─────────────────────────────────────────
interface CategoryContent {
  icon: string;
  gradient: string;
  accentColor: string;
  description: string;
  heroDescription: string;
  whyUse: { icon: React.ReactNode; title: string; description: string }[];
  faq: { question: string; answer: string }[];
}

function getCategoryContent(category: string): CategoryContent {
  switch (category) {
    case "AI Chatbots":
      return {
        icon: "💬",
        gradient:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.65 0.2 145 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.55 0.22 200 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        accentColor: "oklch(0.65 0.2 145)",
        description:
          "Conversational AI assistants that can help you research, write, code, and create.",
        heroDescription:
          "AI chatbots have evolved from novelties into essential tools. The best AI chatbots in 2026 can hold nuanced conversations, write and debug code, draft entire documents, summarize long PDFs, and even browse the web in real time. From ChatGPT to Claude to Gemini, this guide covers the top conversational AI tools you need to know.",
        whyUse: [
          {
            icon: <Zap size={22} className="text-primary" />,
            title: "24/7 Instant Assistance",
            description:
              "AI chatbots answer questions, summarize documents, and draft content instantly — no waiting for a human expert.",
          },
          {
            icon: <BrainCircuit size={22} className="text-accent" />,
            title: "Versatile Intelligence",
            description:
              "Modern chatbots handle coding, research, creative writing, math, translation, and analysis — all in one interface.",
          },
          {
            icon: <Rocket size={22} style={{ color: "oklch(0.72 0.2 60)" }} />,
            title: "Accelerate Any Workflow",
            description:
              "From first-draft emails to complex research briefs, AI chatbots cut work time by 50–80% on text-heavy tasks.",
          },
        ],
        faq: [
          {
            question: "Which AI chatbot is best in 2026?",
            answer:
              "ChatGPT (GPT-4o) remains the most capable all-rounder for everyday tasks. Claude 3 Opus excels at long documents and nuanced reasoning. Gemini Ultra is best for Google Workspace users. Perplexity AI is ideal for real-time web research with citations.",
          },
          {
            question: "Are AI chatbots free to use?",
            answer:
              "Yes — ChatGPT, Claude, Gemini, and Perplexity all offer generous free tiers. Paid plans (typically $20/month) unlock faster models, longer context windows, file uploads, and higher usage limits.",
          },
          {
            question: "Can AI chatbots write code?",
            answer:
              "Absolutely. ChatGPT, Claude, Gemini, and GitHub Copilot can all write, explain, and debug code in dozens of programming languages. Claude is particularly strong for large codebases, while GitHub Copilot integrates directly into your IDE.",
          },
          {
            question: "Are AI chatbot conversations private?",
            answer:
              "Policies vary. OpenAI, Anthropic, and Google all offer privacy settings to opt out of training. For sensitive data, look for enterprise plans or self-hosted options with stronger data guarantees. Always review the provider's privacy policy before sharing confidential information.",
          },
          {
            question: "How do AI chatbots differ from each other?",
            answer:
              "Key differences include context window size (how much text they can process), training data freshness, personality and tone, integration ecosystem, and specialized strengths. Claude excels at writing and analysis, ChatGPT leads in versatility, and Gemini integrates best with Google products.",
          },
        ],
      };

    case "AI Image Tools":
      return {
        icon: "🎨",
        gradient:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.22 285 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.65 0.2 320 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        accentColor: "oklch(0.72 0.2 285)",
        description:
          "Generate stunning visuals, artwork, and graphics with AI-powered image tools.",
        heroDescription:
          "AI image generation has reached a breathtaking level of quality in 2026. Whether you need photorealistic photos, surreal artwork, logos, product shots, or illustrations, there's an AI image tool purpose-built for your exact need. We've tested and ranked the best so you don't have to.",
        whyUse: [
          {
            icon: <Sparkles size={22} className="text-primary" />,
            title: "Create Without Limits",
            description:
              "Generate any visual you can describe — from product mockups to fantastical landscapes — in seconds, with no design skills required.",
          },
          {
            icon: <Clock size={22} className="text-accent" />,
            title: "10x Faster Than Traditional Design",
            description:
              "What used to take a designer hours now takes seconds. AI image tools collapse creative cycles and cut production costs dramatically.",
          },
          {
            icon: <Globe size={22} style={{ color: "oklch(0.72 0.2 60)" }} />,
            title: "Commercially Safe Options",
            description:
              "Tools like Adobe Firefly and Canva AI are trained on licensed content — safe for commercial use without copyright headaches.",
          },
        ],
        faq: [
          {
            question:
              "Which AI image generator produces the best quality in 2026?",
            answer:
              "Midjourney v6 consistently leads for artistic quality and aesthetics. DALL-E 3 (via ChatGPT) excels at following text instructions precisely. FLUX.1 and Stable Diffusion XL are top open-source options. Adobe Firefly is best for commercially safe stock-style images.",
          },
          {
            question: "Is Midjourney free to use?",
            answer:
              "Midjourney no longer offers a free trial and requires a paid subscription starting at $10/month. Free alternatives include DALL-E 3 (via ChatGPT's free tier), Canva AI's free plan, and Stable Diffusion (self-hosted).",
          },
          {
            question: "Can AI image generators create realistic photos?",
            answer:
              "Yes — Midjourney v6, FLUX.1, and Stable Diffusion XL can generate images virtually indistinguishable from real photographs. Results depend heavily on prompt quality and model version.",
          },
          {
            question: "Are AI-generated images copyright-free?",
            answer:
              "Copyright law for AI images is still evolving. Adobe Firefly and Canva AI are designed for commercial safety. Midjourney and DALL-E have complex licensing terms — always check the platform's Terms of Service before commercial use.",
          },
          {
            question: "What makes a good AI image prompt?",
            answer:
              "Effective prompts include subject, style, lighting, color palette, mood, and camera details. Example: 'Futuristic city at dusk, cyberpunk aesthetic, neon lighting, wide-angle lens, 8K, hyperrealistic.' Negative prompts (things to exclude) also dramatically improve results.",
          },
        ],
      };

    case "AI Video Tools":
      return {
        icon: "🎬",
        gradient:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.6 0.18 200 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.5 0.2 240 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        accentColor: "oklch(0.6 0.18 200)",
        description:
          "Create, edit, and enhance videos with cutting-edge AI video generation tools.",
        heroDescription:
          "AI video generation has exploded in 2026. From text-to-video tools like Sora and Runway ML, to AI avatars and automatic video editing, the technology is reshaping content creation, marketing, and entertainment. Discover the best AI video tools available today.",
        whyUse: [
          {
            icon: <Rocket size={22} className="text-primary" />,
            title: "Video Without a Film Crew",
            description:
              "Generate professional-quality video content from a text prompt or script — no cameras, actors, or editing suite required.",
          },
          {
            icon: <Zap size={22} className="text-accent" />,
            title: "Slash Production Time",
            description:
              "AI video tools cut editing, rendering, and revision cycles from days to minutes, dramatically reducing costs for marketers and creators.",
          },
          {
            icon: <Globe size={22} style={{ color: "oklch(0.72 0.2 60)" }} />,
            title: "Scale Content Globally",
            description:
              "Translate and dub videos into 50+ languages with AI voice cloning, expanding your reach without reshooting a single frame.",
          },
        ],
        faq: [
          {
            question: "Which AI video tool is best in 2026?",
            answer:
              "Runway ML (Gen-3) leads for creative professionals. Sora (by OpenAI) generates stunning cinematic sequences from text. Synthesia and HeyGen are top choices for AI avatar videos. Pictory and Descript are best for repurposing existing footage.",
          },
          {
            question: "Can AI generate full-length videos?",
            answer:
              "Currently, most AI video tools excel at short clips (5–60 seconds). Tools like Pictory and Synthesia can produce longer videos by stringing scenes together. Full long-form generation is an active research area expected to improve significantly through 2026.",
          },
          {
            question: "Are AI-generated videos detectable?",
            answer:
              "AI detection tools are improving, but high-quality outputs from Sora and Runway ML are increasingly difficult to distinguish from real footage. Watermarking and provenance metadata are being adopted industry-wide to address this.",
          },
          {
            question: "What's the best free AI video tool?",
            answer:
              "Runway ML, Pictory, and Canva Video all offer free tiers. Runway ML's free plan gives you limited credits per month for video generation. CapCut (with AI features) is free and very capable for editing and effects.",
          },
          {
            question: "Can AI translate and dub existing videos?",
            answer:
              "Yes — tools like HeyGen and ElevenLabs can dub existing videos into 30+ languages with synchronized lip movements and voice cloning. This is one of the most practical near-term applications for global content creators.",
          },
        ],
      };

    case "AI Writing Tools":
      return {
        icon: "✍️",
        gradient:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.72 0.2 60 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.78 0.18 80 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        accentColor: "oklch(0.78 0.2 60)",
        description:
          "Write faster and better with AI tools for content, copywriting, and editing.",
        heroDescription:
          "AI writing tools have transformed content creation in 2026. From long-form blog posts to ad copy, email campaigns, and SEO content, AI can now draft, refine, and optimize writing at a professional level. This guide covers the best AI writing assistants — for marketers, writers, businesses, and individuals.",
        whyUse: [
          {
            icon: <Zap size={22} className="text-primary" />,
            title: "Write 10x Faster",
            description:
              "AI writing tools generate first drafts, outlines, and rewrites in seconds — so you spend more time editing and less time staring at a blank page.",
          },
          {
            icon: <BrainCircuit size={22} className="text-accent" />,
            title: "Consistent Brand Voice",
            description:
              "Train AI tools on your brand's style, tone, and vocabulary to produce content that stays on-brand across every channel and format.",
          },
          {
            icon: <Globe size={22} style={{ color: "oklch(0.72 0.2 60)" }} />,
            title: "Multilingual Content",
            description:
              "AI writing tools can generate, translate, and localize content in dozens of languages, removing barriers to global communication.",
          },
        ],
        faq: [
          {
            question: "What is the best AI writing tool in 2026?",
            answer:
              "Jasper AI leads for marketing and long-form content. Copy.ai excels at short-form marketing copy. Grammarly is unmatched for proofreading and style suggestions. For general writing, Claude and ChatGPT remain the most capable all-purpose options.",
          },
          {
            question: "Can AI writing tools write entire blog posts?",
            answer:
              "Yes — tools like Jasper, Writesonic, and Copy.ai can generate complete blog posts from a brief or outline. However, human editing remains essential to add unique insights, accurate data, and authentic voice that resonates with readers.",
          },
          {
            question: "Are AI writing tools good for SEO?",
            answer:
              "Many AI writing tools have built-in SEO features: keyword suggestions, readability scoring, meta description generation, and content briefs. Surfer SEO and Clearscope integrate with AI writers for data-driven, search-optimized content.",
          },
          {
            question: "Will AI writing be detected as AI content?",
            answer:
              "AI detection tools like GPTZero and Originality.ai can often detect AI-generated text, though accuracy varies. The best practice is to treat AI output as a first draft — humanize it with your own expertise, examples, and voice before publishing.",
          },
          {
            question: "Are AI writing tools worth the subscription cost?",
            answer:
              "For content teams and marketers producing high volumes of copy, AI writing tools typically pay for themselves quickly. A tool like Jasper or Writesonic can replace dozens of hours of manual writing work per month for a $40–$100 subscription.",
          },
        ],
      };

    case "AI Music Tools":
      return {
        icon: "🎵",
        gradient:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.68 0.22 355 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.65 0.2 320 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        accentColor: "oklch(0.72 0.22 355)",
        description:
          "Compose, generate, and produce music tracks using the latest AI music tools.",
        heroDescription:
          "AI music generation has matured dramatically in 2026. Tools like Suno AI and Udio can produce full-length, radio-quality songs from a single text prompt. ElevenLabs leads in voice synthesis. Whether you're a content creator needing royalty-free background music or a producer exploring new sounds, AI music tools open entirely new creative possibilities.",
        whyUse: [
          {
            icon: <Sparkles size={22} className="text-primary" />,
            title: "Music Without Music Training",
            description:
              "Generate professional-quality tracks from a text description — no instruments, music theory, or DAW experience required.",
          },
          {
            icon: <Zap size={22} className="text-accent" />,
            title: "Royalty-Free Instantly",
            description:
              "AI-generated music from platforms like Mubert and Soundraw is royalty-free by design — perfect for YouTube, podcasts, and commercial projects.",
          },
          {
            icon: (
              <BrainCircuit size={22} style={{ color: "oklch(0.72 0.2 60)" }} />
            ),
            title: "Infinite Variations",
            description:
              "Generate dozens of variations on a theme instantly — something that would take a composer days can now be explored in minutes.",
          },
        ],
        faq: [
          {
            question: "Which AI music tool creates the best songs in 2026?",
            answer:
              "Suno AI and Udio lead for full song generation with vocals and lyrics. Mubert and Soundraw excel at background/ambient music for creators. AIVA and Amper Music (now Shutterstock Music) are best for cinematic and orchestral scores.",
          },
          {
            question: "Is AI-generated music royalty-free?",
            answer:
              "It depends on the platform. Mubert, Soundraw, and Beatoven.ai offer royalty-free AI music for commercial use. Suno AI and Udio have their own licensing terms — always check before using tracks commercially.",
          },
          {
            question: "Can AI create music with lyrics and vocals?",
            answer:
              "Yes — Suno AI and Udio can generate complete songs with AI-generated vocals and lyrics from a text prompt. ElevenLabs specializes in ultra-realistic voice cloning for custom AI singers and narrators.",
          },
          {
            question: "Will AI replace human musicians?",
            answer:
              "AI music tools are powerful creative aids but won't replace the emotional depth, live performance, and cultural context that human musicians bring. They're best viewed as instruments that expand creative possibilities, not substitutes for human artistry.",
          },
          {
            question: "Can I use AI music for YouTube videos?",
            answer:
              "Yes — tools like Mubert, Soundraw, and Beatoven.ai are specifically designed for content creators and offer music licensed for YouTube monetization. Always verify the platform's specific terms for your intended use case.",
          },
        ],
      };

    case "AI Productivity Tools":
      return {
        icon: "🛠️",
        gradient:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.6 0.18 200 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.55 0.22 240 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        accentColor: "oklch(0.65 0.18 200)",
        description:
          "Boost your output with AI tools for coding, meetings, automation, and project management.",
        heroDescription:
          "AI productivity tools are transforming how professionals work in 2026. From AI coding assistants like GitHub Copilot to meeting summarizers like Otter.ai, and workflow automation with Zapier AI, these tools eliminate friction and multiply output. This guide covers the best AI productivity tools across every work function.",
        whyUse: [
          {
            icon: <Rocket size={22} className="text-primary" />,
            title: "Automate Repetitive Work",
            description:
              "AI productivity tools handle scheduling, note-taking, email drafting, and data entry — freeing you for high-value, creative work.",
          },
          {
            icon: <BrainCircuit size={22} className="text-accent" />,
            title: "Code Faster, Ship Sooner",
            description:
              "AI coding assistants like GitHub Copilot and Cursor write boilerplate, suggest completions, and explain complex code — doubling developer velocity.",
          },
          {
            icon: <Clock size={22} style={{ color: "oklch(0.72 0.2 60)" }} />,
            title: "Never Miss a Meeting Detail",
            description:
              "AI meeting tools transcribe, summarize, and action-item every call automatically — no more lost context or manual note-taking.",
          },
        ],
        faq: [
          {
            question: "What are the best AI productivity tools in 2026?",
            answer:
              "GitHub Copilot and Cursor lead for developers. Otter.ai and Fireflies.ai are top meeting assistants. Notion AI integrates AI into project management. Zapier and Make (formerly Integromat) automate workflows between apps. Motion and Reclaim.ai optimize calendars automatically.",
          },
          {
            question: "How much time can AI productivity tools save?",
            answer:
              "Studies show knowledge workers using AI productivity tools save 5–15 hours per week — primarily on writing, research, and repetitive tasks. ROI varies by role: developers using Copilot report 25–55% faster code completion; meeting tools can save 30+ minutes per meeting in follow-up.",
          },
          {
            question: "Is GitHub Copilot worth it?",
            answer:
              "For professional developers, GitHub Copilot is widely considered one of the highest-ROI tools available. At $19/month, it can save hours daily on boilerplate, documentation, and debugging. It pairs best with Cursor or VS Code for the most seamless experience.",
          },
          {
            question: "Can AI tools handle email and calendar management?",
            answer:
              "Yes — tools like Superhuman, Spark, and SaneBox use AI to prioritize, draft, and organize email. Reclaim.ai and Motion use AI to automatically schedule tasks and protect focus time in your calendar based on your priorities and deadlines.",
          },
          {
            question: "Are AI productivity tools secure for business use?",
            answer:
              "Enterprise plans from major providers (Microsoft, Google, Notion, GitHub) include SOC 2 compliance, data isolation, and admin controls. For sensitive data, review each tool's data processing agreement and consider whether data is used to train models — opt-out is often available.",
          },
        ],
      };

    default:
      return {
        icon: "🤖",
        gradient:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.72 0.18 200 / 0.18) 0%, transparent 60%), oklch(0.12 0.018 265)",
        accentColor: "oklch(0.72 0.18 200)",
        description: `Explore the best ${category} tools available in 2026.`,
        heroDescription: `Discover the top ${category} tools in 2026. This curated directory covers the leading tools in the ${category} space, updated regularly with the latest releases and reviews.`,
        whyUse: [
          {
            icon: <Zap size={22} className="text-primary" />,
            title: "Save Time",
            description: `${category} tools automate complex tasks, giving you more time for high-impact work.`,
          },
          {
            icon: <BrainCircuit size={22} className="text-accent" />,
            title: "Amplify Capabilities",
            description: `The best ${category} tools extend what's possible, enabling you to achieve results that weren't feasible manually.`,
          },
          {
            icon: <Rocket size={22} style={{ color: "oklch(0.72 0.2 60)" }} />,
            title: "Stay Competitive",
            description: `Early adopters of ${category} tools gain a meaningful edge in their field. The technology is advancing rapidly.`,
          },
        ],
        faq: [
          {
            question: `What are the best ${category} in 2026?`,
            answer: `The best ${category} tools depend on your specific use case and budget. Browse our curated directory above to compare the top-rated options, each with descriptions and direct links to try them out.`,
          },
          {
            question: `Are ${category} tools free to use?`,
            answer: `Many ${category} tools offer free tiers or trials. Paid plans typically unlock higher usage limits, advanced features, and commercial licenses. Check individual tool listings for current pricing.`,
          },
          {
            question: `How do I choose the right ${category} tool?`,
            answer:
              "Start by identifying your primary use case and budget. Look for tools with free trials, read recent reviews, and check if they integrate with your existing workflow. Our directory makes it easy to compare options side by side.",
          },
          {
            question: `Are ${category} tools safe to use for business?`,
            answer: `Reputable ${category} tools maintain industry-standard security practices. For sensitive business data, look for enterprise plans with SOC 2 compliance, data isolation, and clear data retention policies.`,
          },
          {
            question: `How often are new ${category} tools released?`,
            answer: `The AI tools landscape evolves rapidly — new tools and major updates ship weekly. Our directory is updated regularly to surface the latest releases. Check the "Latest AI Tools" section on our homepage for the most recent additions.`,
          },
        ],
      };
  }
}

// ── SEO page links ────────────────────────────────────────────────────
const SEO_LINKS = [
  { to: "/best-ai-tools" as const, label: "Best AI Tools", emoji: "✨" },
  {
    to: "/best-ai-image-generators" as const,
    label: "Best AI Image Generators",
    emoji: "🎨",
  },
  {
    to: "/best-ai-video-generators" as const,
    label: "Best AI Video Generators",
    emoji: "🎬",
  },
  { to: "/free-ai-tools" as const, label: "Free AI Tools", emoji: "🆓" },
];

const RELATED_CATEGORIES = [
  { slug: "ai-chatbots", label: "AI Chatbots", emoji: "💬" },
  { slug: "ai-image-tools", label: "AI Image Tools", emoji: "🎨" },
  { slug: "ai-video-tools", label: "AI Video Tools", emoji: "🎬" },
  { slug: "ai-writing-tools", label: "AI Writing Tools", emoji: "✍️" },
  { slug: "ai-music-tools", label: "AI Music Tools", emoji: "🎵" },
  { slug: "ai-productivity-tools", label: "AI Productivity Tools", emoji: "🛠️" },
];

// ── Component ─────────────────────────────────────────────────────────
export function CategorySeoPage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const category =
    SLUG_TO_CATEGORY[slug] ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const content = getCategoryContent(category);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonicalUrl = `${origin}/category/${slug}`;

  useMetaTags({
    title: `Best ${category} in 2026`,
    description: `Discover the best ${category} in 2026. Curated list of top-rated tools with reviews, comparisons, and direct links. Updated regularly.`,
    canonicalUrl,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Best ${category} in 2026`,
      description: `A curated list of the best ${category} tools available in 2026.`,
      url: canonicalUrl,
    },
  });

  const { data: tools = [], isLoading, isError } = useToolsByCategory(category);

  const relatedCategories = RELATED_CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <main data-ocid="category-seo.page" className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden noise-overlay"
        style={{ background: content.gradient }}
        aria-label={`${category} hero`}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap"
          >
            <Link
              to="/"
              data-ocid="category-seo.home.link"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link
              to="/categories"
              data-ocid="category-seo.categories.link"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Categories
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-foreground font-medium">{category}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5 border"
              style={{
                backgroundColor: `color-mix(in oklch, ${content.accentColor} 12%, transparent)`,
                borderColor: `color-mix(in oklch, ${content.accentColor} 35%, transparent)`,
                color: content.accentColor,
              }}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {content.icon}
              </span>
              Updated for 2026
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.1] mb-5 max-w-3xl">
              Best{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${content.accentColor}, oklch(0.72 0.18 200))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {category}
              </span>{" "}
              in 2026
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
              {content.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tools Grid ────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label={`${category} tools`}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            All {category} ({isLoading ? "…" : tools.length})
          </h2>
          <p className="text-muted-foreground text-sm">{content.description}</p>
        </motion.div>

        {isError && (
          <div
            data-ocid="category-seo.error_state"
            className="py-20 text-center text-muted-foreground"
          >
            Failed to load tools. Please refresh the page.
          </div>
        )}

        <div
          data-ocid="category-seo.tools.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <ToolCardSkeleton key={i} index={i} />
              ))
            : tools.map((tool, i) => (
                <ToolCard key={tool.id.toString()} tool={tool} index={i} />
              ))}
        </div>

        {!isLoading && !isError && tools.length === 0 && (
          <div
            data-ocid="category-seo.empty_state"
            className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-xl"
          >
            No tools in this category yet.
          </div>
        )}
      </section>

      {/* ── Why Use This Category ──────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-label={`Why use ${category}`}
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
              Why Use {category}?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The right tools don't replace your expertise — they amplify it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {content.whyUse.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
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

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
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
            {category} FAQ
          </h2>
          <p className="text-muted-foreground text-sm">
            Common questions about {category.toLowerCase()}.
          </p>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          data-ocid="category-seo.faq.panel"
        >
          {content.faq.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`faq-${i}`}
              data-ocid={`category-seo.faq.item.${i + 1}`}
              className="glass-card rounded-xl border-0 px-5 overflow-hidden"
              style={{
                border: "1px solid oklch(0.32 0.035 265 / 0.4)",
              }}
            >
              <AccordionTrigger
                data-ocid={`category-seo.faq.toggle.${i + 1}`}
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

      {/* ── See Also ──────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20"
        aria-label="See also"
      >
        <div
          className="rounded-2xl p-8 sm:p-10"
          style={{
            background: "oklch(0.15 0.02 265 / 0.8)",
            border: "1px solid oklch(0.32 0.035 265 / 0.4)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-6">
              Explore More
            </h2>

            {/* Related categories */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Other Categories
              </p>
              <div
                data-ocid="category-seo.related.list"
                className="flex flex-wrap gap-2"
              >
                {relatedCategories.map((cat, i) => (
                  <a
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    data-ocid={`category-seo.related.link.${i + 1}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{
                      background: "oklch(0.20 0.025 265 / 0.6)",
                      border: "1px solid oklch(0.32 0.035 265 / 0.4)",
                    }}
                  >
                    <span aria-hidden="true">{cat.emoji}</span>
                    {cat.label}
                  </a>
                ))}
              </div>
            </div>

            {/* SEO guides */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                SEO Guides
              </p>
              <div
                data-ocid="category-seo.guides.list"
                className="flex flex-wrap gap-2"
              >
                {SEO_LINKS.map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid={`category-seo.guides.link.${i + 1}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{
                      background: "oklch(0.20 0.025 265 / 0.6)",
                      border: "1px solid oklch(0.32 0.035 265 / 0.4)",
                    }}
                  >
                    <span aria-hidden="true">{link.emoji}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
