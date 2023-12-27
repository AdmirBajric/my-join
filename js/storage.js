/**
 * The token used for storage authentication.
 * @type {string}
 */
const STORAGE_TOKEN = "L49RAAXRYYSZXYJ0PBZDNG0E9U21EYB1X6UCCAA5";
/**
 * The URL for storage operations.
 * @type {string}
 */
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Sets an item in the storage.
 * @param {string} key - The key to set.
 * @param {any} value - The value to set for the key.
 * @returns {Promise<any>} - A Promise that resolves with the result of the operation.
 */
const setItem = async (key, value) => {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

/**
 * Gets an item from the storage.
 * @param {string} key - The key to retrieve.
 * @returns {Promise<any>} - A Promise that resolves with the retrieved item.
 */
const getItem = async (key) => {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json());
};
