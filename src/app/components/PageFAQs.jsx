import { faqSchema } from "./page-faqs";

export default function PageFAQs({ faqs, title = "Frequently asked questions", intro, id = "faqs", className = "bg-white" }) {
  if (!faqs?.length) return null;
  const schema = faqSchema(faqs);

  return (
    <section id={id} className={`${className} px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16`} aria-labelledby={`${id}-heading`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#29251f]">
            <span className="h-px w-8 bg-[#c2410c]" />FAQs<span className="h-px w-8 bg-[#c2410c]" />
          </p>
          <h2 id={`${id}-heading`} className="text-3xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-4xl">{title}</h2>
          {intro && <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">{intro}</p>}
        </header>
        <div className="divide-y divide-[#e7e2d9] border-y border-[#e7e2d9]">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group py-5 sm:py-6" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-semibold text-[#29251f] marker:hidden sm:text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span aria-hidden="true" className="shrink-0 text-2xl font-normal leading-none text-[#c2410c] transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-3xl pr-8 text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
