import { stockPercent } from "@/lib/utils";

/**
 * StockBar component
 * @param {{ stock: number, totalStock: number }} props
 */
export default function StockBar({ stock, totalStock }) {
  const pct = stockPercent(stock, totalStock);
  const isLow = stock <= 10;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs text-navy-400">
        <span>Availability</span>
        <span className={isLow ? "text-red-500 font-semibold" : "text-navy-400"}>
          {isLow ? `Only ${stock} left!` : `${stock} in stock`}
        </span>
      </div>
      <div className="h-1.5 bg-navy-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
