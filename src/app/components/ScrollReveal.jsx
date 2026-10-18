"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      "main section, main section .grid > *, main section ol > li",
    );

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      if (target.matches(".grid > *, ol > li")) {
        target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      }
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    requestAnimationFrame(() => {
      requestAnimationFrame(() => targets.forEach((target) => observer.observe(target)));
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
