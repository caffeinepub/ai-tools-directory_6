import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SEO_GUIDES = [
  {
    to: "/best-ai-tools" as const,
    label: "Best AI Tools",
    emoji: "✨",
    ocid: "nav.guides.best-ai-tools.link",
  },
  {
    to: "/best-ai-image-generators" as const,
    label: "Best AI Image Generators",
    emoji: "🎨",
    ocid: "nav.guides.image-generators.link",
  },
  {
    to: "/best-ai-video-generators" as const,
    label: "Best AI Video Generators",
    emoji: "🎬",
    ocid: "nav.guides.video-generators.link",
  },
  {
    to: "/free-ai-tools" as const,
    label: "Free AI Tools",
    emoji: "🆓",
    ocid: "nav.guides.free-tools.link",
  },
  {
    to: "/news-feed" as const,
    label: "News Feed",
    emoji: "📰",
    ocid: "nav.guides.news-feed.link",
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);
  const guidesRef = useRef<HTMLDivElement>(null);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const navLinks = [
    { to: "/" as const, label: "Home", ocid: "nav.home.link" },
    {
      to: "/categories" as const,
      label: "Categories",
      ocid: "nav.categories.link",
    },
    {
      to: "/compare" as const,
      label: "Compare",
      ocid: "nav.compare.link",
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (guidesRef.current && !guidesRef.current.contains(e.target as Node)) {
        setGuidesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname change intentionally triggers closing menus
  useEffect(() => {
    setGuidesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isGuideActive = SEO_GUIDES.some((g) => pathname === g.to);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "oklch(0.12 0.018 265 / 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.28 0.025 265 / 0.5)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-1"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.55 0.22 285))",
              }}
            >
              <Sparkles size={16} className="text-white" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-foreground text-lg tracking-tight">
              AI Tools{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 200), oklch(0.65 0.2 285))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Directory
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ to, label, ocid }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={ocid}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}

            {/* Guides dropdown */}
            <div className="relative" ref={guidesRef}>
              <button
                type="button"
                data-ocid="nav.guides.toggle"
                onClick={() => setGuidesOpen((v) => !v)}
                aria-expanded={guidesOpen}
                aria-haspopup="true"
                className={`
                  inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${
                    isGuideActive || guidesOpen
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }
                `}
              >
                Guides
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${guidesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {guidesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    data-ocid="nav.guides.dropdown_menu"
                    className="absolute right-0 top-full mt-1.5 w-64 rounded-xl overflow-hidden z-50"
                    style={{
                      background: "oklch(0.16 0.022 265)",
                      border: "1px solid oklch(0.32 0.035 265 / 0.6)",
                      boxShadow:
                        "0 8px 32px oklch(0.06 0.01 265 / 0.6), 0 2px 8px oklch(0.06 0.01 265 / 0.4)",
                    }}
                    role="menu"
                  >
                    <div className="p-1.5">
                      <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        SEO Guides
                      </p>
                      {SEO_GUIDES.map(({ to, label, emoji, ocid }) => {
                        const isActive = pathname === to;
                        return (
                          <Link
                            key={to}
                            to={to}
                            data-ocid={ocid}
                            role="menuitem"
                            className={`
                              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                              transition-all duration-150
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                              ${
                                isActive
                                  ? "bg-primary/15 text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                              }
                            `}
                          >
                            <span className="text-base" aria-hidden="true">
                              {emoji}
                            </span>
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="sm:hidden overflow-hidden"
            >
              <div className="pb-4 pt-1 space-y-1">
                {navLinks.map(({ to, label, ocid }) => {
                  const isActive = pathname === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      data-ocid={ocid}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                        ${
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }
                      `}
                    >
                      {label}
                    </Link>
                  );
                })}

                {/* Mobile guides section */}
                <div>
                  <button
                    type="button"
                    data-ocid="nav.guides.mobile.toggle"
                    onClick={() => setMobileGuidesOpen((v) => !v)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                      ${
                        isGuideActive || mobileGuidesOpen
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }
                    `}
                  >
                    Guides
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${mobileGuidesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileGuidesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 mt-1 space-y-1">
                          {SEO_GUIDES.map(({ to, label, emoji, ocid }) => {
                            const isActive = pathname === to;
                            return (
                              <Link
                                key={to}
                                to={to}
                                data-ocid={ocid}
                                onClick={() => setMobileOpen(false)}
                                className={`
                                  flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                                  transition-all duration-200
                                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                                  ${
                                    isActive
                                      ? "bg-primary/15 text-primary"
                                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                  }
                                `}
                              >
                                <span className="text-sm" aria-hidden="true">
                                  {emoji}
                                </span>
                                {label}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
