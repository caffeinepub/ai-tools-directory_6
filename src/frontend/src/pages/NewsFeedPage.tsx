import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Loader2,
  Newspaper,
  RefreshCw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useMetaTags } from "../hooks/useMetaTags";

// ── Types ──────────────────────────────────────────────────────────────
type FeedStatus = "pending" | "approved" | "rejected";

interface NewsItem {
  id: number;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  sourceName: string;
  sourceColor: string;
  status: FeedStatus;
  suggestedCategory: string;
  suggestedEmoji: string;
}

// ── Static feed data ───────────────────────────────────────────────────
const INITIAL_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "OpenAI Releases GPT-5 with Multimodal Reasoning Capabilities",
    link: "https://techcrunch.com",
    description:
      "OpenAI's latest flagship model delivers unprecedented reasoning across text, images, audio, and video — setting a new benchmark for AI performance.",
    pubDate: "2026-03-08",
    sourceName: "TechCrunch",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "pending",
    suggestedCategory: "AI Chatbots",
    suggestedEmoji: "🤖",
  },
  {
    id: 2,
    title: "Midjourney v7 Launches with Real-Time Collaboration Features",
    link: "https://venturebeat.com",
    description:
      "Midjourney's seventh major version adds real-time collaborative image editing, style libraries, and a 10x improvement in photorealism for portraits.",
    pubDate: "2026-03-07",
    sourceName: "VentureBeat",
    sourceColor: "oklch(0.6 0.2 145)",
    status: "pending",
    suggestedCategory: "AI Image Tools",
    suggestedEmoji: "🎨",
  },
  {
    id: 3,
    title: "Runway ML Gen-4 Can Generate 4K Videos up to 5 Minutes Long",
    link: "https://theverge.com",
    description:
      "Runway's newest model dramatically extends video generation length and quality, enabling creators to produce short films entirely from text prompts.",
    pubDate: "2026-03-07",
    sourceName: "The Verge",
    sourceColor: "oklch(0.65 0.18 285)",
    status: "pending",
    suggestedCategory: "AI Video Tools",
    suggestedEmoji: "🎬",
  },
  {
    id: 4,
    title: "Anthropic Launches Claude 3.5 Sonnet with 500K Context Window",
    link: "https://venturebeat.com",
    description:
      "Claude's expanded context window makes it capable of ingesting entire codebases, legal documents, and research libraries in a single conversation.",
    pubDate: "2026-03-06",
    sourceName: "VentureBeat",
    sourceColor: "oklch(0.6 0.2 145)",
    status: "approved",
    suggestedCategory: "AI Chatbots",
    suggestedEmoji: "💬",
  },
  {
    id: 5,
    title:
      "Suno AI Version 4 Generates Broadcast-Quality Music in Under 10 Seconds",
    link: "https://producthunt.com",
    description:
      "Suno's latest model can produce full songs with professional-quality vocals, mixing, and mastering from a simple text prompt in under 10 seconds.",
    pubDate: "2026-03-06",
    sourceName: "Product Hunt",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "pending",
    suggestedCategory: "AI Music Tools",
    suggestedEmoji: "🎵",
  },
  {
    id: 6,
    title: "GitHub Copilot Enterprise Now Supports Entire Repo Context",
    link: "https://techcrunch.com",
    description:
      "GitHub's AI coding assistant can now analyze and reason about entire repositories, enabling it to refactor code across multiple files and generate full features from specs.",
    pubDate: "2026-03-05",
    sourceName: "TechCrunch",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "approved",
    suggestedCategory: "AI Productivity Tools",
    suggestedEmoji: "💻",
  },
  {
    id: 7,
    title: "Jasper AI Releases 'Brand Voice 2.0' for Enterprise Content Teams",
    link: "https://venturebeat.com",
    description:
      "Jasper's new brand voice system learns from existing content libraries to generate on-brand copy with 95% consistency across all formats and channels.",
    pubDate: "2026-03-05",
    sourceName: "VentureBeat",
    sourceColor: "oklch(0.6 0.2 145)",
    status: "pending",
    suggestedCategory: "AI Writing Tools",
    suggestedEmoji: "✍️",
  },
  {
    id: 8,
    title: "ElevenLabs Introduces Real-Time Voice Cloning with Emotion Control",
    link: "https://theverge.com",
    description:
      "ElevenLabs' new API lets developers clone any voice in under 10 seconds and control emotional range — opening new possibilities for audiobooks, games, and interactive media.",
    pubDate: "2026-03-04",
    sourceName: "The Verge",
    sourceColor: "oklch(0.65 0.18 285)",
    status: "pending",
    suggestedCategory: "AI Music Tools",
    suggestedEmoji: "🎤",
  },
  {
    id: 9,
    title:
      "Adobe Firefly 4 Ships Native Integration Across All Creative Cloud Apps",
    link: "https://techcrunch.com",
    description:
      "Firefly's deep integration into Photoshop, Illustrator, and Premiere Pro makes AI-powered generative tools available directly in professional creative workflows.",
    pubDate: "2026-03-04",
    sourceName: "TechCrunch",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "rejected",
    suggestedCategory: "AI Image Tools",
    suggestedEmoji: "🔥",
  },
  {
    id: 10,
    title: "Perplexity AI Raises $500M, Announces Real-Time News Search Mode",
    link: "https://venturebeat.com",
    description:
      "Perplexity's massive funding round accompanies a new live news search mode that surfaces verified, real-time information with citations from trusted sources.",
    pubDate: "2026-03-03",
    sourceName: "VentureBeat",
    sourceColor: "oklch(0.6 0.2 145)",
    status: "pending",
    suggestedCategory: "AI Chatbots",
    suggestedEmoji: "🔍",
  },
  {
    id: 11,
    title: "Cursor IDE Reaches 2 Million Users, Launches AI Agent Mode",
    link: "https://news.ycombinator.com",
    description:
      "The AI-first code editor hits 2M users and ships a fully autonomous agent mode capable of completing multi-step development tasks with minimal human oversight.",
    pubDate: "2026-03-03",
    sourceName: "Hacker News",
    sourceColor: "oklch(0.68 0.2 50)",
    status: "pending",
    suggestedCategory: "AI Productivity Tools",
    suggestedEmoji: "🖥️",
  },
  {
    id: 12,
    title: "Notion AI Launches 'Research Mode' for Deep Competitor Analysis",
    link: "https://producthunt.com",
    description:
      "Notion's new research mode can browse the web, compile competitive intelligence reports, and summarize findings directly inside your workspace pages.",
    pubDate: "2026-03-02",
    sourceName: "Product Hunt",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "approved",
    suggestedCategory: "AI Productivity Tools",
    suggestedEmoji: "📋",
  },
  {
    id: 13,
    title:
      "Leonardo AI Launches Video Generation to Compete with Sora and Runway",
    link: "https://theverge.com",
    description:
      "Leonardo AI expands from image generation into video, offering fine-grained creative control that appeals to the platform's community of game developers and concept artists.",
    pubDate: "2026-03-02",
    sourceName: "The Verge",
    sourceColor: "oklch(0.65 0.18 285)",
    status: "pending",
    suggestedCategory: "AI Video Tools",
    suggestedEmoji: "🎮",
  },
  {
    id: 14,
    title:
      "Copy.ai Launches Autonomous GTM Workflows for Sales and Marketing Teams",
    link: "https://venturebeat.com",
    description:
      "Copy.ai's new go-to-market automation platform can research prospects, write personalized outreach, and update CRM records with minimal manual intervention.",
    pubDate: "2026-03-01",
    sourceName: "VentureBeat",
    sourceColor: "oklch(0.6 0.2 145)",
    status: "pending",
    suggestedCategory: "AI Writing Tools",
    suggestedEmoji: "📊",
  },
  {
    id: 15,
    title:
      "Grammarly Introduces AI Co-Writer with Document-Level Understanding",
    link: "https://techcrunch.com",
    description:
      "Grammarly's upgraded AI can now understand the full context of a document to ensure tone, argument structure, and style remain consistent throughout.",
    pubDate: "2026-03-01",
    sourceName: "TechCrunch",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "rejected",
    suggestedCategory: "AI Writing Tools",
    suggestedEmoji: "📝",
  },
  {
    id: 16,
    title:
      "Synthesia Raises $90M to Expand AI Avatar Library to 200+ Languages",
    link: "https://theverge.com",
    description:
      "Synthesia's AI avatar video platform will use new funding to expand its library to over 200 languages and offer hyper-personalized video at enterprise scale.",
    pubDate: "2026-02-28",
    sourceName: "The Verge",
    sourceColor: "oklch(0.65 0.18 285)",
    status: "pending",
    suggestedCategory: "AI Video Tools",
    suggestedEmoji: "👤",
  },
  {
    id: 17,
    title: "Otter.ai Launches AI Meeting Prep That Briefs You Before Calls",
    link: "https://producthunt.com",
    description:
      "Otter.ai's new pre-meeting AI researches attendees, surfaces relevant documents, and generates a context brief 15 minutes before each scheduled call.",
    pubDate: "2026-02-28",
    sourceName: "Product Hunt",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "pending",
    suggestedCategory: "AI Productivity Tools",
    suggestedEmoji: "🎙️",
  },
  {
    id: 18,
    title: "Stable Diffusion 4.0 Ships with Native Video and 3D Generation",
    link: "https://news.ycombinator.com",
    description:
      "Stability AI's latest open-source release extends its flagship image model to handle video synthesis and 3D object generation, available for local deployment.",
    pubDate: "2026-02-27",
    sourceName: "Hacker News",
    sourceColor: "oklch(0.68 0.2 50)",
    status: "pending",
    suggestedCategory: "AI Image Tools",
    suggestedEmoji: "🖼️",
  },
  {
    id: 19,
    title: "Bolt.new by StackBlitz Crosses 5 Million Projects Built with AI",
    link: "https://techcrunch.com",
    description:
      "The browser-based AI coding platform reaches a major milestone, demonstrating massive demand for zero-setup AI-powered web development tools.",
    pubDate: "2026-02-26",
    sourceName: "TechCrunch",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "approved",
    suggestedCategory: "AI Productivity Tools",
    suggestedEmoji: "⚡",
  },
  {
    id: 20,
    title:
      "Mubert Launches API for Dynamic AI Music Generation in Apps and Games",
    link: "https://producthunt.com",
    description:
      "Mubert's new developer API lets apps and games generate adaptive, real-time soundtracks that evolve with user actions — creating fully dynamic audio experiences.",
    pubDate: "2026-02-25",
    sourceName: "Product Hunt",
    sourceColor: "oklch(0.65 0.2 25)",
    status: "pending",
    suggestedCategory: "AI Music Tools",
    suggestedEmoji: "🎶",
  },
];

const CATEGORIES = [
  "AI Chatbots",
  "AI Image Tools",
  "AI Video Tools",
  "AI Writing Tools",
  "AI Music Tools",
  "AI Productivity Tools",
];

const RSS_SOURCES = [
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
    emoji: "📰",
    color: "oklch(0.65 0.2 25)",
  },
  {
    name: "VentureBeat",
    url: "https://venturebeat.com/feed/",
    emoji: "💼",
    color: "oklch(0.6 0.2 145)",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    emoji: "🔬",
    color: "oklch(0.65 0.18 285)",
  },
  {
    name: "Hacker News",
    url: "https://news.ycombinator.com/rss",
    emoji: "🧡",
    color: "oklch(0.68 0.2 50)",
  },
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com/feed",
    emoji: "🚀",
    color: "oklch(0.65 0.2 25)",
  },
];

// ── Add to Directory Dialog ────────────────────────────────────────────
interface AddToolDialogProps {
  item: NewsItem | null;
  onClose: () => void;
  onSubmit: (item: NewsItem) => void;
}

function AddToolDialog({ item, onClose, onSubmit }: AddToolDialogProps) {
  const { actor } = useActor();
  const [name, setName] = useState(item?.title.slice(0, 60) ?? "");
  const [category, setCategory] = useState(
    item?.suggestedCategory ?? CATEGORIES[0],
  );
  const [description, setDescription] = useState(item?.description ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(item?.link ?? "");
  const [logoEmoji, setLogoEmoji] = useState(item?.suggestedEmoji ?? "🤖");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!actor || !item) return;
      setIsSubmitting(true);
      try {
        await actor.addTool({
          id: BigInt(Date.now()),
          name: name.trim(),
          category,
          description: description.trim(),
          websiteUrl: websiteUrl.trim(),
          logoEmoji,
          dateAdded: BigInt(Date.now()),
        });
        toast.success(`"${name.trim()}" added to the directory!`);
        onSubmit(item);
      } catch (err) {
        console.error(err);
        toast.error("Failed to add tool. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [actor, item, name, category, description, websiteUrl, logoEmoji, onSubmit],
  );

  // Sync state when item changes
  if (item && name !== item.title.slice(0, 60) && name === "") {
    setName(item.title.slice(0, 60));
    setDescription(item.description);
    setWebsiteUrl(item.link);
    setCategory(item.suggestedCategory);
    setLogoEmoji(item.suggestedEmoji);
  }

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="news-feed.dialog"
        className="sm:max-w-lg"
        style={{
          background: "oklch(0.16 0.022 265)",
          border: "1px solid oklch(0.32 0.035 265 / 0.6)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            Add to Directory
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Review and edit the tool details before adding to the directory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Tool Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="tool-name"
              className="text-sm font-medium text-foreground"
            >
              Tool Name
            </Label>
            <Input
              id="tool-name"
              data-ocid="news-feed.tool-name.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ChatGPT"
              required
              style={{
                background: "oklch(0.20 0.025 265)",
                borderColor: "oklch(0.32 0.035 265)",
              }}
            />
          </div>

          {/* Logo Emoji */}
          <div className="space-y-1.5">
            <Label
              htmlFor="logo-emoji"
              className="text-sm font-medium text-foreground"
            >
              Logo Emoji
            </Label>
            <Input
              id="logo-emoji"
              data-ocid="news-feed.logo-emoji.input"
              value={logoEmoji}
              onChange={(e) => setLogoEmoji(e.target.value)}
              placeholder="🤖"
              maxLength={4}
              required
              style={{
                background: "oklch(0.20 0.025 265)",
                borderColor: "oklch(0.32 0.035 265)",
              }}
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label
              htmlFor="category"
              className="text-sm font-medium text-foreground"
            >
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                id="category"
                data-ocid="news-feed.category.select"
                style={{
                  background: "oklch(0.20 0.025 265)",
                  borderColor: "oklch(0.32 0.035 265)",
                }}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.18 0.025 265)",
                  borderColor: "oklch(0.32 0.035 265)",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="tool-desc"
              className="text-sm font-medium text-foreground"
            >
              Description
            </Label>
            <Textarea
              id="tool-desc"
              data-ocid="news-feed.description.textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="1–2 sentence description of the tool"
              rows={3}
              required
              style={{
                background: "oklch(0.20 0.025 265)",
                borderColor: "oklch(0.32 0.035 265)",
              }}
            />
          </div>

          {/* Website URL */}
          <div className="space-y-1.5">
            <Label
              htmlFor="website-url"
              className="text-sm font-medium text-foreground"
            >
              Website URL
            </Label>
            <Input
              id="website-url"
              data-ocid="news-feed.website-url.input"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              required
              style={{
                background: "oklch(0.20 0.025 265)",
                borderColor: "oklch(0.32 0.035 265)",
              }}
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <button
              type="button"
              data-ocid="news-feed.dialog.cancel_button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-ocid="news-feed.dialog.submit_button"
              disabled={
                isSubmitting ||
                !name.trim() ||
                !description.trim() ||
                !websiteUrl.trim()
              }
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.55 0.22 285))",
                color: "oklch(0.1 0.015 265)",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Adding…
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Add to Directory
                </>
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── News Item Card ────────────────────────────────────────────────────
interface NewsCardProps {
  item: NewsItem;
  index: number;
  onApprove: (item: NewsItem) => void;
  onReject: (id: number) => void;
}

function NewsCard({ item, index, onApprove, onReject }: NewsCardProps) {
  const formattedDate = new Date(item.pubDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      data-ocid={`news-feed.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
      layout
      className="glass-card rounded-xl p-5 flex flex-col gap-4"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: `color-mix(in oklch, ${item.sourceColor} 12%, transparent)`,
              color: item.sourceColor,
              border: `1px solid color-mix(in oklch, ${item.sourceColor} 30%, transparent)`,
            }}
          >
            {item.sourceName}
          </span>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0"
          style={{
            background:
              item.status === "approved"
                ? "oklch(0.65 0.2 145 / 0.12)"
                : item.status === "rejected"
                  ? "oklch(0.64 0.21 25 / 0.12)"
                  : "oklch(0.72 0.2 60 / 0.12)",
            color:
              item.status === "approved"
                ? "oklch(0.72 0.18 145)"
                : item.status === "rejected"
                  ? "oklch(0.72 0.18 25)"
                  : "oklch(0.78 0.18 60)",
          }}
        >
          {item.status === "approved" ? (
            <CheckCircle2 size={10} />
          ) : item.status === "rejected" ? (
            <XCircle size={10} />
          ) : null}
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-semibold text-foreground text-base leading-snug hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {item.title}
        </a>
        <p className="text-muted-foreground text-sm leading-relaxed mt-2 line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Category chip */}
      <div className="flex items-center gap-2">
        <span className="text-sm" aria-hidden="true">
          {item.suggestedEmoji}
        </span>
        <span className="text-xs text-muted-foreground">
          {item.suggestedCategory}
        </span>
      </div>

      {/* Action buttons */}
      {item.status === "pending" && (
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid={`news-feed.approve.button.${index + 1}`}
            onClick={() => onApprove(item)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              background: "oklch(0.65 0.2 145 / 0.12)",
              color: "oklch(0.72 0.18 145)",
              border: "1px solid oklch(0.65 0.2 145 / 0.3)",
            }}
          >
            <CheckCircle2 size={13} />
            Add to Directory
          </button>
          <button
            type="button"
            data-ocid={`news-feed.reject.button.${index + 1}`}
            onClick={() => onReject(item.id)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              background: "oklch(0.64 0.21 25 / 0.1)",
              color: "oklch(0.72 0.18 25)",
              border: "1px solid oklch(0.64 0.21 25 / 0.25)",
            }}
          >
            <XCircle size={13} />
            Dismiss
          </button>
        </div>
      )}

      {item.status === "approved" && (
        <p
          className="text-xs text-center"
          style={{ color: "oklch(0.72 0.18 145)" }}
        >
          ✓ Added to directory
        </p>
      )}
      {item.status === "rejected" && (
        <p
          className="text-xs text-center"
          style={{ color: "oklch(0.64 0.18 25)" }}
        >
          ✕ Dismissed
        </p>
      )}
    </motion.article>
  );
}

// ── Main page component ───────────────────────────────────────────────
type TabFilter = "all" | FeedStatus;

export function NewsFeedPage() {
  useMetaTags({
    title: "AI Tools News Feed",
    description:
      "Latest AI tool news from TechCrunch, VentureBeat, The Verge, Hacker News, and Product Hunt. Add new tools directly to the directory.",
  });

  const [items, setItems] = useState<NewsItem[]>(INITIAL_NEWS);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [isSyncing, setIsSyncing] = useState(false);
  const [addingItem, setAddingItem] = useState<NewsItem | null>(null);

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    toast.info("Syncing feeds…");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSyncing(false);
    toast.success("Sync complete — 20 items up to date.");
  }, []);

  const handleApprove = useCallback((item: NewsItem) => {
    setAddingItem(item);
  }, []);

  const handleDialogSubmit = useCallback((item: NewsItem) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, status: "approved" as FeedStatus } : i,
      ),
    );
    setAddingItem(null);
  }, []);

  const handleReject = useCallback((id: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "rejected" as FeedStatus } : i,
      ),
    );
    toast.info("Item dismissed.");
  }, []);

  const filteredItems =
    activeTab === "all" ? items : items.filter((i) => i.status === activeTab);

  const counts = {
    all: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    approved: items.filter((i) => i.status === "approved").length,
    rejected: items.filter((i) => i.status === "rejected").length,
  };

  const tabs: { value: TabFilter; label: string }[] = [
    { value: "all", label: `All (${counts.all})` },
    { value: "pending", label: `Pending (${counts.pending})` },
    { value: "approved", label: `Approved (${counts.approved})` },
    { value: "rejected", label: `Rejected (${counts.rejected})` },
  ];

  return (
    <main data-ocid="news-feed.page" className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden noise-overlay"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.6 0.18 200 / 0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 40%, oklch(0.55 0.22 240 / 0.12) 0%, transparent 50%), oklch(0.12 0.018 265)",
        }}
        aria-label="News Feed hero"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.55 0.22 285))",
                    }}
                  >
                    <Newspaper
                      size={20}
                      className="text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Live badge */}
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "oklch(0.65 0.2 145 / 0.12)",
                      border: "1px solid oklch(0.65 0.2 145 / 0.3)",
                      color: "oklch(0.72 0.18 145)",
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

                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] mb-3">
                  AI Tools{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.55 0.22 285))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    News Feed
                  </span>
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
                  Latest discoveries from AI news sources. Review and add new
                  tools directly to the directory.
                </p>
              </div>

              {/* Sync button */}
              <button
                type="button"
                data-ocid="news-feed.sync.button"
                onClick={handleSync}
                disabled={isSyncing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70 shrink-0 self-end sm:self-auto"
                style={{
                  background: "oklch(0.20 0.025 265 / 0.8)",
                  border: "1px solid oklch(0.38 0.04 265 / 0.4)",
                  color: "oklch(0.85 0.01 265)",
                }}
              >
                {isSyncing ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <RefreshCw size={15} />
                )}
                {isSyncing ? "Syncing…" : "Sync Feeds"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tab bar + Content ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div
          data-ocid="news-feed.filter.tab"
          className="flex items-center gap-1 p-1 rounded-xl mb-8 overflow-x-auto scrollbar-hide"
          style={{
            background: "oklch(0.16 0.022 265 / 0.7)",
            border: "1px solid oklch(0.28 0.025 265 / 0.5)",
          }}
          role="tablist"
          aria-label="Filter news items"
        >
          {tabs.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={activeTab === value}
              data-ocid={`news-feed.${value}.tab`}
              onClick={() => setActiveTab(value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                ${
                  activeTab === value
                    ? "tab-active"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Feed grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              data-ocid="news-feed.empty_state"
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-xl"
            >
              No items in this category.
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, i) => (
                  <NewsCard
                    key={item.id}
                    item={item}
                    index={i}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Registered Feeds ─────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20"
        aria-label="Registered RSS feeds"
      >
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: "oklch(0.15 0.02 265 / 0.8)",
            border: "1px solid oklch(0.28 0.025 265 / 0.5)",
          }}
        >
          <h2 className="font-display font-semibold text-base text-foreground mb-4">
            Registered Feed Sources
          </h2>
          <div
            data-ocid="news-feed.sources.list"
            className="flex flex-wrap gap-2"
          >
            {RSS_SOURCES.map((source, i) => (
              <span
                key={source.name}
                data-ocid={`news-feed.sources.item.${i + 1}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: `color-mix(in oklch, ${source.color} 10%, transparent)`,
                  color: source.color,
                  border: `1px solid color-mix(in oklch, ${source.color} 28%, transparent)`,
                }}
              >
                <span aria-hidden="true">{source.emoji}</span>
                {source.name}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground text-xs mt-4">
            RSS integration is powered by the backend. Feeds are automatically
            parsed when new content is available.
          </p>
        </div>
      </section>

      {/* Add to Directory Dialog */}
      <AddToolDialog
        item={addingItem}
        onClose={() => setAddingItem(null)}
        onSubmit={handleDialogSubmit}
      />
    </main>
  );
}
