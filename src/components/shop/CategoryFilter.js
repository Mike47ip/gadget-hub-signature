"use client";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "phone", label: "📱 Phones" },
  { value: "laptop", label: "💻 Laptops" },
  { value: "audio", label: "🎧 Audio" },
  { value: "watch", label: "⌚ Wearables" },
  { value: "tablet", label: "📲 Tablets" },
  { value: "camera", label: "📷 Cameras" },
  { value: "accessory", label: "🔌 Accessories" },
];

/**
 * CategoryFilter — horizontal scrollable filter pill bar
 * @param {{ active: string, onChange: (category: string) => void }} props
 */
export default function CategoryFilter({ active = "all", onChange }) {
  return (
    <div className="bg-white border-b border-navy-100 px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`whitespace-nowrap text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
            active === value
              ? "bg-brand border-brand text-white"
              : "bg-navy-50 border-navy-200 text-navy-600 hover:bg-brand hover:text-white hover:border-brand"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export { CATEGORIES };
