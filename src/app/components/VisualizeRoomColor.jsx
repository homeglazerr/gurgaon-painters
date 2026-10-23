"use client";

import { useEffect, useRef, useState } from "react";
import RoomColorCanvas from "./RoomColorCanvas";

const colors = [
  { name: "Coral", value: "#fb5474" },
  { name: "Tangerine", value: "#ff7a32" },
  { name: "Sunshine yellow", value: "#f5c842" },
  { name: "Lime", value: "#a3cf45" },
  { name: "Fresh green", value: "#35b978" },
  { name: "Aqua", value: "#32bfd0" },
  { name: "Bright blue", value: "#4a8ff0" },
  { name: "Violet", value: "#a66be8" },
];

export default function VisualizeRoomColor() {
  const [wallColor, setWallColor] = useState(colors[0].value);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    let nextColorIndex = 1;

    intervalIdRef.current = window.setInterval(() => {
      setWallColor(colors[nextColorIndex].value);
      nextColorIndex = (nextColorIndex + 1) % colors.length;
    }, 2500);

    return () => {
      window.clearInterval(intervalIdRef.current);
    };
  }, []);

  function handleColorSelect(color) {
    window.clearInterval(intervalIdRef.current);
    setWallColor(color);
  }

  return (
    <section
      id="visualize-color"
      className="bg-[#f6f6f4] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="relative aspect-[5/3] overflow-hidden rounded-md shadow-[0_18px_50px_rgba(41,37,31,0.14)]">
          <RoomColorCanvas
            imageSrc="/images/room-color-visualizer.webp"
            wallMaskSrc="/images/room-color-visualizer-wall.svg"
            color={wallColor}
            roomLabel="Bedroom"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#29251f] shadow-sm backdrop-blur-sm sm:left-5 sm:top-5">
            Live wall preview
          </span>
        </div>

        <div className="py-2 text-left lg:py-8">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#29251f]">
            <span className="h-px w-8 bg-[#c2410c]" />
            Find your room&apos;s feel
          </p>
          <h2 className="max-w-xl text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl lg:text-6xl">
            Visualize Your Room Color
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">
            Try different shades on the accent wall and see how they work with
            the room. Choose a preset or pick a color of your own.
          </p>

          <fieldset className="mt-7">
            <legend className="mb-3 w-full text-left text-sm font-semibold text-[#29251f]">
              Choose a wall color
            </legend>
            <div className="flex flex-wrap justify-start gap-3">
              {colors.map(({ name, value }) => (
                <button
                  key={value}
                  type="button"
                  aria-label={name}
                  aria-pressed={wallColor === value}
                  onClick={() => handleColorSelect(value)}
                  className={`h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2410c] ${wallColor === value ? "border-[#29251f] ring-2 ring-white" : "border-white shadow-sm"}`}
                  style={{ backgroundColor: value }}
                />
              ))}
            </div>
          </fieldset>

          <a
            href="https://homeglazer.com/colour-visualiser"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#c2410c] px-6 text-sm font-bold text-white transition-colors hover:bg-[#9a3412]"
          >
            Try the full colour visualiser
          </a>
        </div>
      </div>
    </section>
  );
}
