const steps = [
  {
    number: "01",
    title: "Tell Us About Your Project",
    description:
      "Share the property type, areas to paint, surface concerns, and the finish you have in mind.",
  },
  {
    number: "02",
    title: "Site Visit & Planning",
    description:
      "We review the space and surface condition, then discuss suitable colours, finishes, and preparation.",
  },
  {
    number: "03",
    title: "Review the Quote",
    description:
      "Go through the proposed scope and quote before deciding how you would like to proceed.",
  },
  {
    number: "04",
    title: "Painting & Handover",
    description:
      "The team completes the agreed preparation and painting work, with project coordination on site.",
  },
];

export default function HowWeDoIt() {
  return (
    <section id="process" className="bg-[#ffff] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16" aria-label="Our painting process">
      <ol className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-0">
        {steps.map(({ number, title, description }) => (
          <li key={number} className="flex flex-col items-center text-center">
            <div className="relative mb-6 flex h-[180px] w-[180px] items-center justify-center rounded-full bg-[linear-gradient(115deg,#f2e8df_0%,#e4ad91_58%,#c2410c_100%)] p-[30px]">
              <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f9f9f7] bg-[#c2410c]" />
              <span className="absolute right-0 top-1/2 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f9f9f7] bg-[#c2410c]" />
              <span className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#f9f9f7] text-[#29251f]">
                <span className="text-4xl font-bold leading-none">{number}</span>
                <span className="mt-1 text-sm font-medium uppercase leading-none tracking-wide">Step</span>
              </span>
            </div>
            <h3 className="text-xl font-bold leading-tight text-[#c2410c] sm:text-2xl">{title}</h3>
            <p className="mt-3 max-w-sm text-base leading-6 text-[#69645b]">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
