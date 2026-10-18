"use client";

import { useCallback, useEffect, useRef } from "react";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const TRANSITION_MS = 120;

function hexToRgb(hex) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

export default function RoomColorCanvas({ imageSrc, wallMaskSrc, color, roomLabel }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const previousColorRef = useRef(null);
  const animationRef = useRef(null);
  const drawRef = useRef(null);
  const wallPathsRef = useRef([]);

  const draw = useCallback((colorOverride = color) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const bounds = canvas.getBoundingClientRect();
    const displayWidth = Math.max(bounds.width, 1);
    const displayHeight = Math.max(bounds.height, 1);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 3);

    canvas.width = Math.round(displayWidth * pixelRatio);
    canvas.height = Math.round(displayHeight * pixelRatio);
    context.setTransform(1, 0, 0, 1, 0, 0);

    const scale = Math.max(
      canvas.width / CANVAS_WIDTH,
      canvas.height / CANVAS_HEIGHT,
    );
    const offsetX = (canvas.width - CANVAS_WIDTH * scale) / 2;
    const offsetY = (canvas.height - CANVAS_HEIGHT * scale) / 2;
    context.translate(offsetX, offsetY);
    context.scale(scale, scale);

    const image = imageRef.current;
    if (!image?.complete || !image.naturalWidth) {
      context.fillStyle = "#e7e2d9";
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      return;
    }

    const imageScale = Math.max(
      CANVAS_WIDTH / image.naturalWidth,
      CANVAS_HEIGHT / image.naturalHeight,
    );
    const imageWidth = image.naturalWidth * imageScale;
    const imageHeight = image.naturalHeight * imageScale;
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.drawImage(
      image,
      (CANVAS_WIDTH - imageWidth) / 2,
      (CANVAS_HEIGHT - imageHeight) / 2,
      imageWidth,
      imageHeight,
    );

    for (const wallPath of wallPathsRef.current) {
      if (!wallPath) continue;
      context.save();
      try {
        context.clip(new Path2D(wallPath), "evenodd");
        context.globalCompositeOperation = "multiply";
        context.globalAlpha = 0.7;
        context.fillStyle = colorOverride;
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } finally {
        context.restore();
      }
    }
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      fetch(wallMaskSrc)
        .then((response) => {
          if (!response.ok) throw new Error(`Mask request failed: ${response.status}`);
          return response.text();
        })
        .then((svg) => {
          const pathData = [...svg.matchAll(/<path\b[^>]*\bd=["']([^"']+)["'][^>]*>/gi)]
            .map((match) => match[1].trim());
          if (cancelled) return;
          wallPathsRef.current = pathData;
          drawRef.current?.();
        })
        .catch(() => {
          if (!cancelled) wallPathsRef.current = [];
        });
    }, { rootMargin: "200px" });
    observer.observe(canvas);
    return () => {
      cancelled = true;
      observer.disconnect();
      wallPathsRef.current = [];
    };
  }, [wallMaskSrc]);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => drawRef.current?.());
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let image;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      image = new window.Image();
      image.decoding = "async";
      image.onload = () => {
        imageRef.current = image;
        previousColorRef.current = null;
        drawRef.current?.();
      };
      image.onerror = () => {
        imageRef.current = null;
        drawRef.current?.();
      };
      image.src = imageSrc;
    }, { rootMargin: "200px" });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
      imageRef.current = null;
      if (image) image.onload = null;
    };
  }, [imageSrc]);

  useEffect(() => {
    const fromColor = previousColorRef.current;
    if (!fromColor || fromColor === color) {
      previousColorRef.current = color;
      draw(color);
      return;
    }

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const startTime = performance.now();
    const from = hexToRgb(fromColor);
    const to = hexToRgb(color);

    const animate = () => {
      const progress = Math.min((performance.now() - startTime) / TRANSITION_MS, 1);
      const eased = progress * (2 - progress);
      draw(
        rgbToHex(
          from.r + (to.r - from.r) * eased,
          from.g + (to.g - from.g) * eased,
          from.b + (to.b - from.b) * eased,
        ),
      );

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousColorRef.current = color;
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [color, draw]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="absolute inset-0 h-full w-full object-cover"
      role="img"
      aria-label={`${roomLabel} preview with the selected wall color`}
      onContextMenu={(event) => event.preventDefault()}
    />
  );
}
