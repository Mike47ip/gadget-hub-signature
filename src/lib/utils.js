/**
 * Format a number as USD currency
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate percentage saved
 * @param {number} price
 * @param {number} originalPrice
 * @returns {number}
 */
export function savingsPercent(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}

/**
 * Calculate dollar amount saved
 * @param {number} price
 * @param {number} originalPrice
 * @returns {number}
 */
export function savingsDollar(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return originalPrice - price;
}

/**
 * Get stock level as a percentage
 * @param {number} stock
 * @param {number} total
 * @returns {number}
 */
export function stockPercent(stock, total) {
  if (!total) return 0;
  return Math.round((stock / total) * 100);
}

/**
 * Clamp a value between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Render star rating string
 * @param {number} rating
 * @returns {string}
 */
export function renderStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
}

/**
 * Format a number with commas
 * @param {number} n
 * @returns {string}
 */
export function formatNumber(n) {
  return new Intl.NumberFormat("en-US").format(n);
}
