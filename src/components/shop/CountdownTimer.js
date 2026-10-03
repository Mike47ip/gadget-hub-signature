"use client";

import { useCountdown } from "@/hooks/useCountdown";

/**
 * CountdownTimer — live countdown for deals page
 * @param {{ initialSeconds?: number }} props
 */
export default function CountdownTimer({ initialSeconds = 43199 }) {
  const { hours, minutes, seconds, done } = useCountdown(initialSeconds);

  if (done) return <p className="text-white/60 text-sm">Deal ended</p>;

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="inline-flex gap-3 bg-white/10 border border-white/20 px-5 py-3 rounded-xl">
      {[
        { value: hours, label: "hours" },
        { value: minutes, label: "mins" },
        { value: seconds, label: "secs" },
      ].map(({ value, label }) => (
        <div key={label} className="text-center">
          <strong className="block text-white text-2xl font-extrabold leading-none min-w-[40px]">
            {pad(value)}
          </strong>
          <span className="text-white/60 text-xs uppercase tracking-wide">{label}</span>
        </div>
      ))}
    </div>
  );
}
