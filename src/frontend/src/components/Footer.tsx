import { Heart, Sparkles } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="mt-auto"
      style={{
        borderTop: "1px solid oklch(0.28 0.025 265 / 0.5)",
        background: "oklch(0.13 0.018 265 / 0.8)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Sparkles
              size={14}
              className="text-primary/70"
              aria-hidden="true"
            />
            <span>© {year} AI Tools Directory. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <span>Built with</span>
            <Heart
              size={13}
              className="text-pink-400 fill-pink-400"
              aria-hidden="true"
            />
            <span>using</span>
            <a
              href={utmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
