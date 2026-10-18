"use client";

import { ArrowUpRight, Phone } from "lucide-react";

const services = [
  "Interior Painting",
  "Exterior Painting",
  "Wall Textures",
  "Waterproofing",
  "Wood & Metal Finishes",
  "Commercial Painting",
];

export default function Contact() {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      "Hello Gurgaon Painters, I would like to request a painting quote.",
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      `Service: ${formData.get("service")}`,
      `Project details: ${formData.get("message") || "Not provided"}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/919717256514?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  }

  const fieldClassName =
    "mt-2 w-full rounded-md border border-[#dedbd4] bg-white px-4 py-3 text-sm text-[#29251f] outline-none transition focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/20";

  return (
    <section id="contact" className="bg-[#ffff] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#29251f]">
            <span className="h-px w-8 bg-[#c2410c]" />
            Get in touch
          </p>
          <h2 className="max-w-xl text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl lg:text-6xl">
            Let’s talk about your space
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">
            Looking for painters in Gurgaon or Gurugram? Gurgaon Painters by
            Home Glazer offers interior and exterior home painting, wall
            textures, waterproofing, wood and metal finishes, and commercial
            painting. Share your requirements for a quote for your home,
            apartment, office, or shop.
          </p>
          <a
            href="tel:+919717256514"
            className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[#29251f] transition-colors hover:text-[#c2410c]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#c2410c] shadow-sm">
              <Phone size={17} strokeWidth={1.7} aria-hidden="true" />
            </span>
            +91 97172 56514
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-[#e7e2d9] bg-white p-5 sm:p-7 lg:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#514b41]">
              Your name
              <input
                className={fieldClassName}
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Enter your name"
                required
              />
            </label>

            <label className="text-sm font-medium text-[#514b41]">
              Phone number
              <input
                className={fieldClassName}
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Enter your phone number"
                required
              />
            </label>

            <label className="text-sm font-medium text-[#514b41] sm:col-span-2">
              Service you need
              <select className={fieldClassName} name="service" defaultValue="" required>
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-[#514b41] sm:col-span-2">
              Project details <span className="font-normal text-[#817a6e]">(optional)</span>
              <textarea
                className={`${fieldClassName} min-h-28 resize-y`}
                name="message"
                placeholder="Property type, area, or anything else we should know"
                rows={4}
              />
            </label>
          </div>

          <button
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#c2410c] px-5 text-sm font-bold text-white transition-colors hover:bg-[#9a3412] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2410c] sm:w-auto"
            type="submit"
          >
            Send enquiry on WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <p className="mt-3 text-xs leading-5 text-[#817a6e]">
            WhatsApp will open with your enquiry ready to send. Please review it before sending.
          </p>
        </form>
      </div>
    </section>
  );
}
