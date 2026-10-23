"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Building2,
  Droplets,
  House,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Sun,
  TreePine,
} from "lucide-react";

const experiences = {
  "interior-painting-gurgaon": {
    eyebrow: "Room-by-room planner",
    heading: "Make a finish plan that fits each room",
    intro: "Choose a room to see the details worth discussing before work begins.",
    theme: "interior",
    tabs: [
      { label: "Bedroom", icon: House, title: "A calm, comfortable finish", text: "Compare colour and sheen in the room's own light. Discuss wall condition and care instructions before choosing a finish." },
      { label: "Living room", icon: Building2, title: "Balance appearance and everyday use", text: "Look at samples beside flooring, curtains and furniture, and decide which walls and ceilings belong in the project scope." },
      { label: "Kitchen & passage", icon: ShieldCheck, title: "Plan for surfaces that need regular care", text: "Ask which product finishes suit the room and follow their cleaning guidance. Mention stains, peeling or previous repairs during the site visit." },
      { label: "Ceiling & woodwork", icon: Paintbrush, title: "Add the finishing details", text: "List ceilings, doors, frames and grills separately so preparation, product and finish can be agreed for each surface." },
    ],
    cardTitle: "A considered interior plan",
    band: "bg-[#f3e9df]",
    accent: "text-[#a3411c]",
    accentBg: "bg-[#a3411c]",
    panel: "bg-white",
  },
  "exterior-painting-gurgaon": {
    eyebrow: "Facade planner",
    heading: "Explore the facade from every angle",
    intro: "Select an area to review the practical details that shape an exterior painting scope.",
    theme: "exterior",
    tabs: [
      { label: "Walls", icon: Building2, title: "Start with the existing coating", text: "Discuss loose or chalking paint, cracks, plaster condition and damp marks. The proposed preparation and finish should match the surface assessment." },
      { label: "Boundary", icon: Sun, title: "Include each exposed section", text: "Identify boundary walls, parapets and other sections separately. Note how sun, rain, dust and nearby surfaces affect access and protection." },
      { label: "Windows & grills", icon: Paintbrush, title: "Coordinate adjoining finishes", text: "Plan windows, gates and grills alongside the wall colour. Metal surfaces may need a separate preparation and coating system." },
      { label: "Height & access", icon: ShieldCheck, title: "Plan access before scheduling", text: "Share the building height, entry arrangements, society permissions and areas that need protection so these can be discussed in the quote." },
    ],
    cardTitle: "Facade details to plan",
    band: "bg-[#292f34] text-white",
    accent: "text-[#f2a17e]",
    accentBg: "bg-[#c2410c]",
    panel: "bg-white/10",
  },
  "wall-texture-painting-gurgaon": {
    eyebrow: "Finish explorer",
    heading: "Try a texture idea before you choose",
    intro: "Explore the feel of a feature wall. Review a larger sample in your own room before settling on a design.",
    theme: "texture",
    tabs: [
      { label: "Soft pattern", icon: Sparkles, title: "A subtle, repeating effect", text: "Roller or sponge patterns can give a wall a gentle variation. Review how the pattern looks at full scale and beside the room's other finishes." },
      { label: "Fine grain", icon: Paintbrush, title: "A tactile surface", text: "Fine-grain finishes change how light falls across a wall. Ask about the selected system's application and care guidance." },
      { label: "Layered look", icon: House, title: "Depth with a polished character", text: "Stucco or Venetian-style looks can vary by product and technique. Confirm the sample, sheen and application area before work starts." },
      { label: "Feature effect", icon: Sun, title: "Make one wall the focal point", text: "Metallic, rustic or concrete-look effects can read strongly across a large area. Compare a sample in daylight and under your room lighting." },
    ],
    cardTitle: "Texture choices",
    band: "bg-[#f5e8e4]",
    accent: "text-[#9e3c37]",
    accentBg: "bg-[#9e3c37]",
    panel: "bg-white",
  },
  "waterproofing-services-gurgaon": {
    eyebrow: "Moisture check",
    heading: "Start with what you are seeing",
    intro: "Choose a symptom to review what information can help guide a site discussion. A symptom alone does not confirm the moisture source.",
    theme: "waterproofing",
    tabs: [
      { label: "Damp patch", icon: Droplets, title: "Note when it appears", text: "Record whether the patch changes after rain, water use or a period of drying. Nearby terraces, bathrooms, windows and pipes may also be relevant." },
      { label: "Peeling paint", icon: Paintbrush, title: "Look for a pattern", text: "Note where paint is bubbling or peeling and whether the area returns after repainting. The wall condition and possible moisture source need to be discussed." },
      { label: "Terrace leak", icon: Sun, title: "Check the areas around it", text: "Share which ceiling or wall is affected and what sits above it. Outlets, joints, plumbing and shared areas may need consideration." },
      { label: "White deposits", icon: ShieldCheck, title: "Treat it as a clue, not a diagnosis", text: "White deposits can accompany moisture, but do not identify its source. Ask what was observed and whether another specialist should check first." },
    ],
    cardTitle: "What to observe",
    band: "bg-[#e7f0ef]",
    accent: "text-[#28645f]",
    accentBg: "bg-[#28645f]",
    panel: "bg-white",
  },
  "wood-metal-painting-polish-gurgaon": {
    eyebrow: "Material selector",
    heading: "Choose the finish for the material",
    intro: "Select a surface to see what to discuss about its existing coating, use and condition.",
    theme: "wood",
    tabs: [
      { label: "Doors", icon: House, title: "Refresh a frequently used surface", text: "Share the current polish or paint, visible wear and the look you want. Preparation and finish depend on the door's material and existing coating." },
      { label: "Furniture", icon: TreePine, title: "Keep the character of the piece", text: "Discuss the furniture's condition, colour and sheen. Review a sample and confirm which pieces and surfaces are included." },
      { label: "Railings & gates", icon: Building2, title: "Plan for exposed metal", text: "Point out peeling, corrosion or earlier repairs. Ask which cleaning, rust treatment, primer and protective finish are proposed." },
      { label: "Fittings", icon: Paintbrush, title: "Match the finish to its use", text: "List each fitting and whether it is indoors or outdoors. Exposure and handling can affect preparation and finish choices." },
    ],
    cardTitle: "Wood and metal surfaces",
    band: "bg-[#efe8dc]",
    accent: "text-[#76532f]",
    accentBg: "bg-[#76532f]",
    panel: "bg-white",
  },
  "commercial-painting-gurgaon": {
    eyebrow: "Space planner",
    heading: "Plan the work around how the property runs",
    intro: "Choose a type of space to identify the coordination details to discuss before setting the work sequence.",
    theme: "commercial",
    tabs: [
      { label: "Office", icon: Building2, title: "Keep teams and work areas in mind", text: "List rooms and surfaces, occupancy, equipment and access times. Discuss how active work areas and completed areas will be managed." },
      { label: "Shop", icon: House, title: "Plan around customer access", text: "Share opening hours, display fixtures and areas that need to stay accessible. Agree on the work zones and sequence in advance." },
      { label: "Shared spaces", icon: ShieldCheck, title: "Coordinate common areas", text: "List corridors, stairs, lobbies and other shared surfaces, and note access or society requirements that may affect the schedule." },
      { label: "Exterior", icon: Sun, title: "Include facade and access details", text: "Identify the exterior areas, building height, access arrangements and protection needed around vehicles, entrances and neighbouring surfaces." },
    ],
    cardTitle: "Project coordination",
    band: "bg-[#e9ecee]",
    accent: "text-[#45545d]",
    accentBg: "bg-[#45545d]",
    panel: "bg-white",
  },
};

function NumberedCards({ items, theme, compact = false }) {
  return (
    <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
      {items.map((item, index) => (
        <article key={item} className={`relative overflow-hidden border p-5 shadow-[0_8px_24px_rgba(35,31,24,0.04)] ${theme.theme === "texture" ? "rounded-xl border-[#9e3c37]/15 bg-[linear-gradient(145deg,#fff,#f6e5df)]" : theme.theme === "wood" ? "rounded-sm border-[#76532f]/20 bg-[#faf7f0]" : theme.theme === "commercial" ? "rounded-md border-l-4 border-y-[#45545d]/15 border-r-[#45545d]/15 border-l-[#45545d] bg-white" : "rounded-md border-[#29251f]/10 bg-white"}`}>
          <span className={`text-xs font-bold tracking-[0.18em] ${theme.accent}`}>{String(index + 1).padStart(2, "0")}</span>
          <p className="mt-3 text-sm leading-6 text-[#514b41]">{item}</p>
          {theme.theme === "texture" && <span aria-hidden="true" className={`mt-4 block h-1 rounded-full ${index % 2 ? "bg-[linear-gradient(90deg,#b05b50,#e8c2b4,#78413c)]" : "bg-[linear-gradient(90deg,#d9b5a5,#f0dfd3,#a65c4f)]"}`} />}
        </article>
      ))}
    </div>
  );
}

function ProcessSteps({ steps, theme }) {
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step} className="relative flex gap-4 rounded-md bg-white p-5 shadow-[0_8px_24px_rgba(35,31,24,0.05)]">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${theme.accentBg}`}>{String(index + 1).padStart(2, "0")}</span>
          <p className="pt-1 text-sm leading-6 text-[#514b41]">{step}</p>
        </li>
      ))}
    </ol>
  );
}

function ContentSections({ sections, theme, slug }) {
  if (!sections?.length) return null;

  return (
    <div className="space-y-5">
      {sections.map((section, index) => {
        const isProcess = Boolean(section.steps);
        const hasItems = Boolean(section.items?.length);
        const tone = index % 2 === 0 ? "bg-white" : theme.band;

        return (
          <section key={section.heading} className={`overflow-hidden rounded-md p-5 sm:p-8 ${tone}`} aria-labelledby={`content-heading-${index}`}>
            <div className="mb-5 flex items-start gap-4">
              <span className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${theme.accentBg}`}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${theme.accent}`}>{isProcess ? "How it works" : hasItems ? "Explore the details" : "Helpful to know"}</p>
                <h2 id={`content-heading-${index}`} className={`mt-2 text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl ${slug === "exterior-painting-gurgaon" && index === 1 ? "text-white" : "text-[#29251f]"}`}>{section.heading}</h2>
              </div>
            </div>

            {isProcess ? <ProcessSteps steps={section.steps} theme={theme} /> : null}

            {section.paragraphs?.length ? (
              <div className={`grid gap-4 ${section.paragraphs.length > 1 ? "md:grid-cols-2" : ""}`}>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraph} className={`text-sm leading-7 ${slug === "exterior-painting-gurgaon" && index === 1 ? "text-white/75" : "text-[#625d55]"} ${paragraphIndex === 0 && section.paragraphs.length > 1 ? "font-medium" : ""}`}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {hasItems ? (
              <div className="mt-5">
                <NumberedCards items={section.items} theme={theme} compact={section.items.length > 4} />
              </div>
            ) : null}

            {section.closing ? <p className="mt-5 rounded-md border-l-2 border-[#c2410c] bg-[#f6f6f4] p-4 text-sm leading-7 text-[#514b41]">{section.closing}</p> : null}
          </section>
        );
      })}
    </div>
  );
}

export default function ServiceExperience({ service, sections }) {
  const config = experiences[service.slug];
  const [activeTab, setActiveTab] = useState(0);

  if (!config) return null;
  const active = config.tabs[activeTab];
  const ActiveIcon = active.icon;

  return (
    <div className="mx-auto mt-12 max-w-6xl">
      <section className={`overflow-hidden rounded-md p-5 sm:p-8 lg:p-10 ${config.band}`} aria-labelledby="interactive-planner-heading">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${config.accent}`}>{config.eyebrow}</p>
            <h2 id="interactive-planner-heading" className={`mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl ${config.theme === "exterior" ? "text-white" : "text-[#29251f]"}`}>{config.heading}</h2>
            <p className={`mt-4 text-sm leading-7 ${config.theme === "exterior" ? "text-white/70" : "text-[#69645b]"}`}>{config.intro}</p>
          </div>

          <div className={`rounded-md p-5 sm:p-6 ${config.panel}`}>
            <div role="group" aria-label={config.eyebrow} className="flex flex-wrap gap-2">
              {config.tabs.map(({ label }, index) => (
                <button
                  key={label}
                  type="button"
                  aria-controls="service-tab-panel"
                  aria-pressed={activeTab === index}
                  onClick={() => setActiveTab(index)}
                  className={`min-h-10 rounded-full px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2410c] ${activeTab === index ? `${config.accentBg} text-white` : "bg-[#f6f6f4] text-[#514b41] hover:bg-[#eee9e2]"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div id="service-tab-panel" aria-live="polite" className="mt-5 grid gap-5 sm:grid-cols-[1fr_128px] sm:items-center">
              <div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${config.accentBg} text-white`}><ActiveIcon size={19} aria-hidden="true" /></div>
                <h3 className="mt-3 text-xl font-semibold text-[#29251f]">{active.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#69645b]">{active.text}</p>
              </div>
              {service.slug === "wall-texture-painting-gurgaon" ? (
                <div aria-hidden="true" className="hidden aspect-square rounded-md bg-[radial-gradient(circle_at_28%_30%,#f8d7cb_0_12%,transparent_13%),radial-gradient(circle_at_72%_68%,#c77968_0_18%,transparent_19%),linear-gradient(135deg,#b56552,#ead2c3_48%,#8e4d44)] sm:block" />
              ) : (
                <div className="relative hidden aspect-square overflow-hidden rounded-md sm:block">
                  <Image src={service.image} alt="" fill sizes="128px" className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="service-details-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${config.accent}`}>{config.cardTitle}</p>
            <h2 id="service-details-heading" className="mt-2 text-2xl font-semibold text-[#29251f]">A clear scope, shaped around the site</h2>
          </div>
          <span className="text-sm text-[#81796f]">Select a tab above to explore</span>
        </div>
        <NumberedCards items={service.details} theme={config} />
      </section>

      {sections?.length ? (
        <section className="mt-12" aria-label={`${service.shortTitle} planning details`}>
          <ContentSections sections={sections} theme={config} slug={service.slug} />
        </section>
      ) : (
        <section className="mt-12 grid gap-4 lg:grid-cols-2" aria-label={`${service.shortTitle} planning guidance`}>
          {service.guidance.map(({ title, text }, index) => (
            <details key={title} className={`group rounded-md p-6 ${index === 0 ? "bg-white" : config.band}`} open={index === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 marker:hidden [&::-webkit-details-marker]:hidden">
                <span>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${config.accent}`}>Planning note {String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-2 block text-xl font-semibold text-[#29251f]">{title}</span>
                </span>
                <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.accentBg} text-lg text-white transition-transform group-open:rotate-45`}>+</span>
              </summary>
              <p className="mt-4 border-t border-[#29251f]/10 pt-4 text-sm leading-7 text-[#625d55]">{text}</p>
            </details>
          ))}
        </section>
      )}
    </div>
  );
}
