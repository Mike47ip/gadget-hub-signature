"use client";

import { useState, useEffect } from "react";

/**
 * Countdown timer hook
 * @param {number} initialSeconds - starting seconds
 * @returns {{ hours: number, minutes: number, seconds: number, done: boolean }}
 */
export function useCountdown(initialSeconds = 43200) {
  const [secs, setSecs] = useState(initialSeconds);

  useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secs]);

  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  return { hours, minutes, seconds, done: secs === 0 };
}
