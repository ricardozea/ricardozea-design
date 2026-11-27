"use client";

import { useEffect, useRef, useState } from "react";

const BRIEF_REQUIREMENTS = [
  "Develop an original design concept of your choice.",
  "Demonstrate creativity through your choice of layout, colours, typography, and visual elements.",
  "Ensure the final design is clean, attractive, and professionally presented.",
  "Include a brief explanation of your design concept and the creative approach used.",
];

const STEPS = [
  {
    label: "Step 1",
    title: "Define the problem",
    bullets: [
      "Reviewed the brief, business goals, and user friction points before opening any design tool.",
      "Identified core barriers for therapy seekers: hidden copays, unclear network status, and cluttered provider lists.",
      "Scoped a focused two-step booking flow around upfront pricing clarity and immediate availability.",
    ],
  },
  {
    label: "Step 2",
    title: "Explore and wireframe",
    bullets: [
      "Mapped a streamlined flow from Curated Therapist Matches to a Zero-Surprise Cost Breakdown.",
      "Eliminated unnecessary intermediate steps to reduce cognitive load for stressed care seekers.",
      "Structured card hierarchy so insurance verification, copay, and next-48-hour slots scan in seconds.",
    ],
  },
  {
    label: "Step 3",
    title: "Prototype and validate",
    bullets: [
      "Built a live, interactive prototype in HTML, CSS, and React via Figma Make instead of static screens.",
      "Implemented Light and Dark mode switching, active filter pills, time-slot selection, and view transitions.",
      "Tested responsive behavior across desktop and mobile viewports to catch layout friction early.",
    ],
  },
  {
    label: "Step 4",
    title: "Build and polish",
    bullets: [
      "Generated 100% accessible Light and Dark color ramps using Color-Ramp.com.",
      "Structured clean semantic tokens and a fluid responsive typescale for future updates.",
      "Delivered a production-ready interactive experience backed by WCAG 2.2 AA/AAA contrast.",
    ],
  },
];

const COLOR_SYSTEM = [
  {
    role: "Page Canvas",
    lightToken: "Warm Alabaster 50 (#F8F8F8)",
    darkToken: "Obsidian Slate 50 (#070E0C)",
    wcag: "Base surface",
  },
  {
    role: "Card & Elevated Surface",
    lightToken: "Ivory 50 (#FFFFF0)",
    darkToken: "Obsidian Slate 100 (#19211F)",
    wcag: "Base surface",
  },
  {
    role: "Card Borders & Dividers",
    lightToken: "Ivory 100 (#E3E3D4)",
    darkToken: "Obsidian Slate 200 (#2C3432)",
    wcag: "3:1+ UI boundary",
  },
  {
    role: "Primary Text",
    lightToken: "Obsidian Slate 900 (#18201E)",
    darkToken: "Obsidian Slate 900 (#DAE4E1)",
    wcag: "Light: 15.64:1 (AAA) / Dark: 12.64:1 (AAA)",
  },
  {
    role: "Secondary Text",
    lightToken: "Muted Slate 600 (#4D5B57)",
    darkToken: "Muted Slate 700 (#9FAEAA)",
    wcag: "Light: 6.70:1 (AA) / Dark: 7.12:1 (AAA)",
  },
  {
    role: "Primary Brand & CTA",
    lightToken: "Deep Pine 700 (#184E47) + #FFFFFF text",
    darkToken: "Deep Pine 700 (#81B6AE) + #070E0C text",
    wcag: "Light: 9.46:1 (AAA) / Dark: 8.57:1 (AAA)",
  },
  {
    role: "Primary Hover",
    lightToken: "Midnight Pine 800 (#103833)",
    darkToken: "Deep Pine 800 (#9BD1C8)",
    wcag: "High-contrast hover state",
  },
  {
    role: "Verified & Trust Badges",
    lightToken: "Sage Mint 50 (#E6F4EE) + Forest Emerald 700 (#115239)",
    darkToken: "Forest Emerald 100 (#002813) + Forest Emerald 800 (#97D5B6)",
    wcag: "Light: 8.10:1 (AAA) / Dark: 9.53:1 (AAA)",
  },
  {
    role: 'Featured Accent ("Best Match")',
    lightToken: "Soft Lavender 50 (#F3EEF9) + Deep Plum 700 (#52337A)",
    darkToken: "Deep Plum 100 (#271C38) + Soft Lavender 800 (#D8C6F0)",
    wcag: "Light: 8.45:1 (AAA) / Dark: 8.62:1 (AAA)",
  },
];

const TYPE_SCALE = [
  {
    token: "--text-xs",
    role: "Legal footnotes & fine print",
    mobile: "12px (0.75rem)",
    desktop: "13px (0.8125rem)",
    clamp: "clamp(0.75rem, 0.72rem + 0.14vw, 0.8125rem)",
  },
  {
    token: "--text-sm",
    role: "Metadata, tags, badges & filter pills",
    mobile: "14px (0.875rem)",
    desktop: "15px (0.9375rem)",
    clamp: "clamp(0.875rem, 0.85rem + 0.14vw, 0.9375rem)",
  },
  {
    token: "--text-base",
    role: "Primary body copy, bios & form inputs",
    mobile: "16px (1rem)",
    desktop: "18px (1.125rem)",
    clamp: "clamp(1rem, 0.94rem + 0.28vw, 1.125rem)",
  },
  {
    token: "--text-lg",
    role: "Card subheadings & copay highlights",
    mobile: "18px (1.125rem)",
    desktop: "21px (1.3125rem)",
    clamp: "clamp(1.125rem, 1.04rem + 0.42vw, 1.3125rem)",
  },
  {
    token: "--text-xl",
    role: "Provider names & section titles (Lora)",
    mobile: "22px (1.375rem)",
    desktop: "28px (1.75rem)",
    clamp: "clamp(1.375rem, 1.21rem + 0.85vw, 1.75rem)",
  },
  {
    token: "--text-2xl",
    role: "Page hero headline (Lora)",
    mobile: "28px (1.75rem)",
    desktop: "40px (2.5rem)",
    clamp: "clamp(1.75rem, 1.42rem + 1.69vw, 2.5rem)",
  },
];

export default function RulaAppraisalPage() {
  const [isPrototypeOpen, setIsPrototypeOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroCtasRef = useRef(null);

  useEffect(() => {
    const target = heroCtasRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPrototypeOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsPrototypeOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPrototypeOpen]);

  const handleOpenPrototype = (e) => {
    e.preventDefault();
    setIsPrototypeOpen(true);
  };

  return (
    <div className="rula-appraisal-scope min-h-screen w-full bg-[#F8F8F8] text-[#18201E] font-normal leading-[1.5] selection:bg-[#184E47] selection:text-white">
      {/* Scoped overrides to neutralize global portfolio link, list, and line-height styles */}
      <style>{`
        .rula-appraisal-scope {
          line-height: 1.5;
        }
        .rula-appraisal-scope section {
          padding: 2.5rem;
        }
        .rula-appraisal-scope p,
        .rula-appraisal-scope li {
          line-height: 1.5;
        }
        .rula-appraisal-scope h1,
        .rula-appraisal-scope h2,
        .rula-appraisal-scope h3 {
          line-height: 1.2 !important;
          margin-top: 0 !important;
        }
        .rula-appraisal-scope a {
          text-decoration: none;
        }
        .rula-appraisal-scope a.rula-cta-primary {
          color: #ffffff !important;
        }
        .rula-appraisal-scope a.rula-cta-secondary,
        .rula-appraisal-scope a.rula-inline-link {
          color: #184E47 !important;
        }
        .rula-appraisal-scope a.rula-inline-link:hover {
          color: #103833 !important;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .rula-appraisal-scope a.rula-drawer-back {
          color: #ffffff !important;
        }
        .rula-appraisal-scope a.rula-drawer-make {
          color: #81b6ae !important;
        }
        .rula-appraisal-scope ul {
          list-style: none !important;
          margin-left: 0 !important;
        }
      `}</style>

      {/* Dynamic Slide-Down Top Bar (appears only after scrolling past hero CTAs) */}
      <nav
        aria-hidden={!showStickyBar}
        className={`fixed top-0 left-0 right-0 z-30 border-b border-[#E3E3D4] bg-[#fff]/50 backdrop-blur-md transition-transform duration-300 ease-out ${
          showStickyBar
            ? "translate-y-0 pointer-events-auto shadow-md"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-end gap-6 px-6 py-3.5">
          <a
            href="#prototype"
            onClick={handleOpenPrototype}
            className="group rula-cta-primary inline-flex items-center justify-center gap-2 rounded-full bg-[#184E47] px-8 py-2 text-sm font-semibold hover:bg-[#103833] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
            <span>Begin appraisal!</span>
          </a>
          <a
            href="#rationale"
            className="group rula-inline-link inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span>Read Design Rationale</span>
          </a>
        </div>
      </nav>

      {/* Full-Viewport Hero Welcome Gate */}
      <header className="mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-[#18201E] sm:text-5xl md:text-6xl leading-[1.2]">
          Welcome to the Sr. Product Design appraisal for Ricardo Zea
        </h1>

        <p className="mt-6 max-w-2xl text-lg font-normal text-[#333F3C] leading-[1.5]">
          A focused design and coding case study exploring a &ldquo;Zero-Surprise&rdquo; therapist match and booking flow built for clarity, calm decision-making, and full WCAG 2.2 AA/AAA accessibility.
        </p>

        <div
          ref={heroCtasRef}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#prototype"
            onClick={handleOpenPrototype}
            className="group rula-cta-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#184E47] px-8 py-2 text-base font-semibold shadow-sm hover:bg-[#103833] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
            <span>Begin appraisal!</span>
          </a>

          <a
            href="#rationale"
            className="group rula-cta-secondary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-0 py-2 text-base font-semibold transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span>Read Design Rationale</span>
          </a>
        </div>
      </header>

      {/* Main Narrative Content */}
      <main id="rationale" className="mx-auto max-w-4xl space-y-16 px-6 pb-28 pt-12">
        {/* Section 1: Autonomous Execution & Brief Requirements */}
        <section className="rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] p-8 sm:p-10 shadow-md">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18201E] leading-[1.2]">
            Execution &amp; Creative Approach
          </h2>

          <p className="mt-4 text-base font-normal text-[#333F3C] leading-[1.5]">
            This entire product was designed and built from a concise four-bullet brief with minimal direction - demonstrating autonomous ownership, clear decision-making, and end-to-end execution without hand-holding:
          </p>

          <ul className="mt-5 space-y-2.5 rounded-xl border border-[#E3E3D4] bg-[#F8F8F8] py-5 pr-5 !pl-[1.5rem] text-base font-normal text-[#18201E] leading-[1.5] shadow-sm">
            {BRIEF_REQUIREMENTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#184E47]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-base font-normal text-[#333F3C] leading-[1.5]">
            To turn those requirements into a working product, I followed the exact four-step framework discussed during our interview:
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {STEPS.map((step) => (
              <div
                key={step.label}
                className="rounded-xl border border-[#E3E3D4] bg-[#F8F8F8] p-6 shadow-sm"
              >
                <span className="inline-block rounded-md bg-[#184E47] px-3 py-1 mb-4 leading-4 text-xs font-bold uppercase tracking-wider text-white">
                  {step.label}
                </span>

                <h3 className="mt-3 text-xl font-bold text-[#18201E] leading-[1.2]">
                  {step.title}
                </h3>

                <ul className="mt-3.5 space-y-2 text-base font-normal text-[#333F3C] leading-[1.5] !p-0">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: The 3 Pillars (Typography, Color, Accessibility) */}
        <section className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18201E] leading-[1.2]">
              The 3 Pillars Every Designer Must Master
            </h2>
            <p className="mt-3 text-base font-normal text-[#333F3C] leading-[1.5]">
              Every designer has to dominate three core areas: <strong>Typography</strong>, <strong>Color</strong>, and <strong>Accessibility</strong>. Here is how those three pillars shaped this build:
            </p>
          </div>

          <div className="grid gap-6">
            {/* Typography Card */}
            <div className="rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] p-6 shadow-md">
              <span className="inline-block rounded-md bg-[#184E47] px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-white">
                Pillar 1
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-[#18201E] leading-[1.2]">
                Typography
              </h3>
              <ul className="mt-4 space-y-2.5 text-base font-normal text-[#333F3C] leading-[1.5]">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>
                    Editorial serif headings (<strong>Lora</strong>) paired with clean geometric UI copy (<strong>Figtree</strong>).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>
                    Fluidly scaled via CSS <code className="rounded bg-[#F8F8F8] px-1.5 py-0.5 text-xs font-mono text-[#18201E]">clamp()</code> from a <strong>16px base font size on mobile</strong> up to an <strong>18px max base font size on desktop</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Color Card */}
            <div className="rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] p-6 shadow-md">
              <span className="inline-block rounded-md bg-[#184E47] px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-white">
                Pillar 2
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-[#18201E] leading-[1.2]">
                Color
              </h3>
              <ul className="mt-4 space-y-2.5 text-base font-normal text-[#333F3C] leading-[1.5]">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>
                    Generated using{" "}
                    <a
                      href="https://color-ramp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rula-inline-link font-semibold"
                    >
                      Color-Ramp.com
                    </a>{" "}
                    in perceptually uniform <strong>OKLCH color spaces</strong> across Light and Dark modes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>
                    Grounded in Warm Alabaster, Ivory, Deep Pine, Forest Emerald, and Soft Lavender/Deep Plum to avoid sterile clinical blues.
                  </span>
                </li>
              </ul>
            </div>

            {/* Accessibility Card */}
            <div className="rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] p-6 shadow-md">
              <span className="inline-block rounded-md bg-[#184E47] px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-white">
                Pillar 3
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-[#18201E] leading-[1.2]">
                Accessibility
              </h3>
              <ul className="mt-4 space-y-2.5 text-base font-normal text-[#333F3C] leading-[1.5]">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>
                    Verified with{" "}
                    <a
                      href="https://color-ramp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rula-inline-link font-semibold"
                    >
                      Color-Ramp.com
                    </a>{" "}
                    to meet <strong>WCAG 2.2 AA and AAA</strong> contrast ratios (6.70:1 to 16.46:1) in both themes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>
                    Backed by a custom fluid typescale to preserve comfortable reading across any viewport size.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Grounded Calm Color System Table */}
        <section className="space-y-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18201E] leading-[1.2]">
              The &ldquo;Grounded Calm&rdquo; Color System (Light &amp; Dark Modes)
            </h3>
            <p className="mt-1.5 text-base font-normal text-[#333F3C] leading-[1.5]">
              Generated and verified for WCAG 2.2 AA/AAA compliance via{" "}
              <a
                href="https://color-ramp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rula-inline-link font-semibold"
              >
                Color-Ramp.com
              </a>
              .
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] shadow-md">
            <table className="w-full border-collapse text-left text-sm leading-[1.5]">
              <thead>
                <tr className="border-b border-[#E3E3D4] bg-[#F8F8F8] text-[#18201E]">
                  <th className="px-4 py-3.5 font-semibold">Role / Semantic Token</th>
                  <th className="px-4 py-3.5 font-semibold">Light Mode Token &amp; Hex</th>
                  <th className="px-4 py-3.5 font-semibold">Dark Mode Token &amp; Hex</th>
                  <th className="px-4 py-3.5 font-semibold">WCAG Contrast</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E3D4] text-[#333F3C]">
                {COLOR_SYSTEM.map((row) => (
                  <tr key={row.role} className="hover:bg-[#F8F8F8]/60">
                    <td className="px-4 py-3 font-semibold text-[#18201E]">{row.role}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.lightToken}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.darkToken}</td>
                    <td className="px-4 py-3 font-medium text-[#115239]">{row.wcag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Fluid Responsive Typescale Table */}
        <section className="space-y-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18201E] leading-[1.2]">
              Fluid Responsive Typescale
            </h3>
            <p className="mt-1.5 text-base font-normal text-[#333F3C] leading-[1.5]">
              Scales smoothly from a 16px base font size on mobile to an 18px max base font size on desktop across any viewport size.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] shadow-md">
            <table className="w-full border-collapse text-left text-sm leading-[1.5]">
              <thead>
                <tr className="border-b border-[#E3E3D4] bg-[#F8F8F8] text-[#18201E]">
                  <th className="px-4 py-3.5 font-semibold">Token</th>
                  <th className="px-4 py-3.5 font-semibold">Usage Role</th>
                  <th className="px-4 py-3.5 font-semibold">Mobile Min</th>
                  <th className="px-4 py-3.5 font-semibold">Desktop Max</th>
                  <th className="px-4 py-3.5 font-semibold">Fluid CSS Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E3D4] text-[#333F3C]">
                {TYPE_SCALE.map((row) => (
                  <tr key={row.token} className="hover:bg-[#F8F8F8]/60">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-[#184E47]">
                      {row.token}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#18201E]">{row.role}</td>
                    <td className="px-4 py-3">{row.mobile}</td>
                    <td className="px-4 py-3">{row.desktop}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.clamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Look Under the Hood (Figma Make Source & Prompts) */}
        <section className="rounded-2xl border border-[#184E47]/25 bg-[#E6F4EE]/60 p-8 sm:p-10 shadow-md">
          <h2 className="font-serif text-2xl font-bold text-[#18201E] leading-[1.2]">
            Look Under the Hood (Prompts &amp; Code)
          </h2>

          <ul className="mt-4 space-y-2.5 text-base font-normal text-[#333F3C] leading-[1.5]">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
              <span>
                Open the source project in Figma Make using the link below to inspect the exact prompt architecture, design tokens, and component code behind the build.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
              <span>
                Click <strong>Make a copy</strong> in the top bar: a duplicate of the project will appear in your Figma drafts where you can open it and explore all prompts and project files directly.
              </span>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="https://www.figma.com/make/NNNd7daHfl6wLTiWbjaK3j/Rula---Product-Designer-Appraisal-Task?code-node-id=0-6&p=f&t=rG3fNKlEJHMLzByS-0&fullscreen=1"
              target="_blank"
              title="Link opens a new tab"
              rel="noopener noreferrer"
              className="group rula-cta-primary inline-flex items-center justify-center gap-2 rounded-full bg-[#184E47] px-8 py-3 text-sm font-semibold hover:bg-[#103833] transition-colors"
            >
              <span>Open Source Project in Figma Make</span>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            <a
              href="#prototype"
              onClick={handleOpenPrototype}
              className="group rula-cta-secondary inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
              <span>Begin appraisal!</span>
            </a>
          </div>
        </section>

        {/* Section 6: Tools Used */}
        <section className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18201E] leading-[1.2]">
              Tools Used
            </h2>
            <p className="mt-2 text-base font-normal text-[#333F3C] leading-[1.5]">
              How each tool contributed to planning, prototyping, and shipping this appraisal:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Gemini */}
            <div className="rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] p-6 shadow-md">
              <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4EE] text-[#184E47]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C12.4 7.3 16.7 11.6 22 12C16.7 12.4 12.4 16.7 12 22C11.6 16.7 7.3 12.4 2 12C7.3 11.6 11.6 7.3 12 2Z" />
                  </svg>
                </span>
                <h3 className="font-serif text-xl font-bold text-[#18201E] leading-[1.2]">
                  Gemini
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-base font-normal text-[#333F3C] leading-[1.5] !pl-0">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Product strategy and UX architecture.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Prompt engineering for interactive prototyping.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Presentation layout and design rationale.</span>
                </li>
              </ul>
            </div>

            {/* Figma Make */}
            <div className="rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] p-6 shadow-md">
              <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4EE] text-[#184E47]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8.5 2h3.5v7H8.5a3.5 3.5 0 1 1 0-7z" />
                    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                    <path d="M8.5 9H12v7H8.5a3.5 3.5 0 1 1 0-7z" />
                    <path d="M8.5 16H12v3.5a3.5 3.5 0 1 1-3.5-3.5z" />
                  </svg>
                </span>
                <h3 className="font-serif text-xl font-bold text-[#18201E] leading-[1.2]">
                  Figma Make
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-base font-normal text-[#333F3C] leading-[1.5] !pl-0">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Interactive UI prototyping in React and CSS.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Light and Dark mode theme tokens.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Live responsive deployment.</span>
                </li>
              </ul>
            </div>

            {/* Devin */}
            <div className="rounded-2xl border border-[#E3E3D4] bg-[#FFFFF0] p-6 shadow-md">
              <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4EE] text-[#184E47]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="8 8 4 12 8 16" />
                    <polyline points="16 8 20 12 16 16" />
                    <line x1="13" y1="6" x2="11" y2="18" />
                  </svg>
                </span>
                <h3 className="font-serif text-xl font-bold text-[#18201E] leading-[1.2]">
                  Devin
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-base font-normal text-[#333F3C] leading-[1.5] !pl-0">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Local Next.js project integration.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Custom route and whitelist setup.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#184E47]" />
                  <span>Production code refinement.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Credits Footer */}
        <footer className="border-t border-[#E3E3D4] pt-8 text-center text-sm font-normal text-[#4D5B57] leading-[1.5]">
          Created by Ricardo Zea for appraisal test for Rula.
        </footer>
      </main>

      {/* Preloaded Full-Screen Slide-Up Prototype Drawer */}
      <div
        aria-hidden={!isPrototypeOpen}
        className={`fixed inset-0 z-50 flex flex-col bg-[#070e0c] transition-transform duration-500 ease-out ${
          isPrototypeOpen
            ? "translate-y-0 pointer-events-auto"
            : "translate-y-full pointer-events-none"
        }`}
      >
        <header className="flex items-center justify-between border-b border-[#2c3432] bg-[#18201E] px-4 py-2.5 text-sm text-[#dae4e1]">
          <a
            href="#close-prototype"
            onClick={(e) => {
              e.preventDefault();
              setIsPrototypeOpen(false);
            }}
            className="rula-drawer-back inline-flex items-center gap-2 rounded-md bg-[#2c3432] px-3 py-1.5 font-medium hover:bg-[#3a4542] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Presentation (ESC)</span>
          </a>

          <a
            href="https://www.figma.com/make/NNNd7daHfl6wLTiWbjaK3j/Rula---Product-Designer-Appraisal-Task?code-node-id=0-6&p=f&t=rG3fNKlEJHMLzByS-0&fullscreen=1"
            target="_blank"
            rel="noopener noreferrer"
            className="rula-drawer-make inline-flex items-center gap-2 rounded-md border border-[#81b6ae]/40 px-3 py-1.5 font-medium hover:bg-[#81b6ae]/10 transition-colors"
          >
            <span>Open in Figma Make (Make a Copy)</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </header>

        <iframe
          src="https://rula-appraisal.figma.site/"
          title="Rula - Product Designer Appraisal Task"
          className="w-full flex-1 border-0"
          allow="clipboard-write; fullscreen"
        />
      </div>
    </div>
  );
}