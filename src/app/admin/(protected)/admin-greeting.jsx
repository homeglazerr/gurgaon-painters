"use client";

import { useEffect, useState } from "react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

export default function AdminGreeting() {
  const [greeting, setGreeting] = useState("Welcome to your dashboard");

  useEffect(() => {
    const updateGreeting = () => setGreeting(getGreeting());
    updateGreeting();

    const intervalId = window.setInterval(updateGreeting, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <h1 className="mt-2 text-4xl font-semibold text-[#29251f]">
      {greeting}, Gurgaon Painters!
    </h1>
  );
}
