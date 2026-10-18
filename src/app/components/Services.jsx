import {
  Building2,
  Droplets,
  House,
  Paintbrush,
  Sparkles,
  Store,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Interior Painting",
    description:
      "Interior painting in Gurgaon with smooth, lasting finishes for bedrooms, living spaces, kitchens, and complete home repaints.",
    icon: House,
    image: "/images/service-interior.webp",
    imageAlt: "Painter applying a fresh coat to a bright home interior",
  },
  {
    number: "02",
    title: "Exterior Painting",
    description:
      "Exterior painting in Gurgaon with weather-ready coatings that refresh your facade and help protect it through the seasons.",
    icon: Building2,
    image: "/images/service-exterior.webp",
    imageAlt: "Painter refreshing the exterior of a modern home",
  },
  {
    number: "03",
    title: "Wall Textures",
    description:
      "Wall texture painting in Gurgaon, with decorative finishes, feature walls, and carefully finished details.",
    icon: Sparkles,
    image: "/images/service-texture.webp",
    imageAlt: "Artisan applying a decorative finish to an interior wall",
  },
  {
    number: "04",
    title: "Waterproofing",
    description:
      "Waterproofing services in Gurgaon for damp-prone walls, terraces, and other exposed surfaces.",
    icon: Droplets,
    image: "/images/service-waterproofing.webp",
    imageAlt: "Protective coating being applied to a rooftop terrace",
  },
  {
    number: "05",
    title: "Wood & Metal Finishes",
    description:
      "Wood polish and metal painting in Gurgaon for doors, furniture, railings, and other surfaces.",
    icon: Paintbrush,
    image: "/images/service-wood-metal.webp",
    imageAlt: "Craftsperson polishing a wooden door and metal railing",
  },
  {
    number: "06",
    title: "Commercial Painting",
    description:
      "Commercial painting in Gurgaon for offices, retail spaces, apartment buildings, and other workspaces.",
    icon: Store,
    image: "/images/service-commercial.webp",
    imageAlt: "Painters refreshing a bright commercial office interior",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#000000]">
              <span className="h-px w-8 bg-[#c2410c]" />
              What we do
            </p>
            <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl lg:text-6xl">
              Painting services in Gurgaon
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">
            From a single room to a complete property refresh, explore home and
            commercial painting services across Gurgaon and Gurugram.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ number, title, description, icon: Icon, image, imageAlt }) => (
            <article
              key={number}
              className="group relative isolate min-h-[360px] overflow-hidden rounded-md bg-[#29251f] shadow-[0_8px_24px_rgba(35,31,24,0.12)] sm:min-h-[420px]"
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                loading="lazy"
                className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/10 to-black/10 transition-colors duration-300 group-hover:from-black/90" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/15 text-white backdrop-blur-sm">
                  <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-3 max-w-sm translate-y-0 text-sm leading-6 text-white/85 opacity-100 transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                  {description}
                </p>
                <div className="mt-4 h-px w-9 bg-[#c2410c] transition-all duration-300 group-hover:w-14" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
