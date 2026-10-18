"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#features" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.12)] backdrop-blur-md sm:gap-4 sm:px-5 sm:py-2.5 lg:px-7"
      >
        {/* Logo */}
        <a
          href="/"
          className="flex min-w-0 items-center gap-2 px-1 py-2 text-[#0B1F4D] sm:gap-3 sm:px-2"
          aria-label="Gurgaon Painters - Home"
        >
          <span className="whitespace-nowrap text-[0.68rem] font-black tracking-[0.055em] sm:text-sm sm:tracking-[0.08em] lg:text-base">
            GURGAON PAINTERS
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-5 text-sm font-semibold text-[#0B1F4D] lg:flex xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative py-1 transition-colors hover:text-[#c2410c] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#c2410c] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="tel:+919717256514"
            className="hidden min-h-10 items-center justify-center rounded-full bg-[#c2410c] px-4 text-xs font-bold text-white transition-all duration-200 hover:bg-[#9a3412] hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2410c] sm:inline-flex sm:px-5 sm:text-sm"
          >
            +91 97172 56514
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#0B1F4D] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2410c] lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div
            id="mobile-navigation"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.16)] lg:hidden"
            style={{ animation: "menuSlideDown 0.22s ease-out" }}
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-[#0B1F4D] transition-colors hover:bg-slate-50 hover:text-[#c2410c]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="tel:+919717256514"
              className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-[#c2410c] px-5 text-sm font-bold text-white transition-colors hover:bg-[#9a3412]"
              onClick={() => setIsOpen(false)}
            >
              Call: +91 97172 56514
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
