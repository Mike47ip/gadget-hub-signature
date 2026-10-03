/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} brand
 * @property {string} category
 * @property {string} emoji
 * @property {number} price
 * @property {number|null} originalPrice
 * @property {string|null} description
 * @property {number} rating
 * @property {number} reviewCount
 * @property {number} stock
 * @property {number} totalStock
 * @property {boolean} isOnSale
 * @property {boolean} isNew
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {string} name
 * @property {string} emoji
 * @property {string} brand
 * @property {number} price
 * @property {number} quantity
 */

/**
 * @typedef {Object} Order
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} address
 * @property {string} city
 * @property {string} zip
 * @property {number} total
 * @property {string} status
 * @property {Date} createdAt
 */

export {};
