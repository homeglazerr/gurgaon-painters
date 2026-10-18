const certificates = [
  {
    name: "ISO 9001:2015",
    image: "/images/certificates/iso-9001-2015.svg",
    alt: "ISO 9001:2015 certificate",
  },
  {
    name: "MSME Registered",
    image: "/images/certificates/msme.webp",
    alt: "MSME registration mark",
  },
  {
    name: "DPIIT Recognized",
    image: "/images/certificates/dpiit-startupindia.webp",
    alt: "DPIIT and Startup India logo",
  },
  {
    name: "Labour & Employment",
    image: "/images/certificates/labour-employment.webp",
    alt: "Ministry of Labour and Employment registration",
  },
];

import Image from "next/image";

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="bg-[#ffff] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16"
      aria-labelledby="certificates-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div>
            <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#29251f]">
              <span className="h-px w-8 bg-[#c2410c]" />
              Trust &amp; Standards
              <span className="h-px w-8 bg-[#c2410c]" />
            </p>
            <h2
              id="certificates-heading"
              className="text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl lg:text-6xl"
            >
              Certificates &amp; Accreditations
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">
            Certificates and registrations presented by the company. Check the issuing authority for current validity and scope.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
          {certificates.map((certificate) => (
            <article
              key={certificate.name}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-36 w-full items-center justify-center sm:h-44">
                <Image
                  src={certificate.image}
                  alt={certificate.alt}
                  width={320}
                  height={180}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#29251f] sm:text-base">
                  {certificate.name}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#777166] sm:text-sm">
                  {certificate.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
