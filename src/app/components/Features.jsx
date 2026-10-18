import { Building2, Check, Paintbrush, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Trusted Expertise",
    description:
      "Home Glazer states that its team brings more than 35 years of painting experience.",
    icon: Check,
  },
  {
    title: "Skilled Experts",
    description:
      "A team to prepare surfaces and apply the agreed finish with care.",
    icon: Paintbrush,
  },
  {
    title: "Free Site Visit",
    description:
      "Discuss your property, requirements, and suitable painting options.",
    icon: ShieldCheck,
  },
  {
    title: "Site Supervision",
    description:
      "Project coordination and on-site supervision for a clearer workflow.",
    icon: Building2,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#f9f9f7] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div>
            <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#000000]">
              <span className="h-px w-8 bg-[#c2410c]" />
              Our promise
              <span className="h-px w-8 bg-[#c2410c]" />
            </p>
            <h2 className="text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl lg:text-6xl">
              Why choose Gurgaon Painters?
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">
            Compare services, discuss the condition of your surfaces, and plan a
            suitable finish for your home or business in Gurgaon.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group relative flex flex-col items-center overflow-hidden rounded-md bg-gradient-to-br from-[#c2410c] via-[#a83509] to-[#7c2d12] p-5 text-center shadow-[0_8px_24px_rgba(194,65,12,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(194,65,12,0.35)] sm:p-6"
            >
              {/* Radial glow at top */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-white/10 blur-2xl transition-all duration-300 group-hover:bg-white/18"
              />
              {/* Bottom shine line */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              <span className="relative mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/25 group-hover:ring-white/40">
                <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="relative text-2xl font-semibold tracking-[-0.025em] text-white">
                {title}
              </h3>
              <p className="relative mt-2 text-sm leading-6 text-white/75">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
