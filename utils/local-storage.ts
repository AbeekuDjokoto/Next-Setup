/**
 * Get item and parse item from localStorage
 * @param {string} key - key of value in localStorage
 * @param {any} defaultValue - value to return if key is not found
 * @returns {any} - value stored in localStorage or default value*/
export function getItem(key: string, defaultValue = null) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Set item in localStorage
 * @param {string} key - key of value in localStorage
 * @param {any} value - value to Stringify and set in localStorage
 * */
export function setItem(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}
