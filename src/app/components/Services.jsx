import {
  Building2,
  Droplets,
  House,
  Paintbrush,
  Sparkles,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services } from "../services/services";

const icons = {
  "Interior Painting": House,
  "Exterior Painting": Building2,
  "Wall Textures": Sparkles,
  Waterproofing: Droplets,
  "Wood & Metal Finishes": Paintbrush,
  "Commercial Painting": Store,
};

export default function Services() {
  return (
    <section id="services" className="bg-white px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div>
            <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#000000]">
              <span className="h-px w-8 bg-[#c2410c]" />
              What we do
              <span className="h-px w-8 bg-[#c2410c]" />
            </p>
            <h2 className="text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl lg:text-6xl">
              Painting services in Gurgaon
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">
            From a single room to a complete property refresh, explore home and
            commercial painting services across Gurgaon and Gurugram.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, shortTitle: title, description, image, imageAlt }) => {
            const Icon = icons[title];
            return <Link
              href={`/services/${slug}`}
              key={slug}
              aria-label={`Learn more about ${title} in Gurgaon`}
              className="group relative isolate min-h-[300px] overflow-hidden rounded-md bg-[#1a1410] shadow-[0_8px_24px_rgba(35,31,24,0.12)] sm:min-h-[340px]"
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                loading="lazy"
                className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Base dark gradient - always visible */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              {/* Hover overlay - fades in smoothly */}
              <div className="absolute inset-0 -z-10 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/15 text-white backdrop-blur-sm">
                  <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white sm:p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-2 max-h-24 max-w-sm overflow-hidden text-sm leading-6 text-white/85 transition-all duration-300 ease-out md:mt-0 md:max-h-0 md:translate-y-3 md:opacity-0 md:group-hover:mt-2 md:group-hover:max-h-24 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:mt-2 md:group-focus-within:max-h-24 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                  {description}
                </p>
                <div className="mt-3 h-px w-9 bg-[#c2410c] transition-all duration-300 group-hover:w-14" />
              </div>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}
