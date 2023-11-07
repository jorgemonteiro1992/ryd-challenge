/**
 * Performs a GET request to the specified API endpoint and returns the response data.
 *
 * @param {Object} options - An object containing the request configuration.
 * @param {string} options.url - The URL of the API endpoint to fetch data from.
 * @returns {Promise<any>} A Promise that resolves with the response data.
 */
const get = async ({ url }) => {
    const response = await fetch( url ); // Sends GET request

    const data = await response.json(); // Parse the response data as JSON

    return data;
};

/**
 * Converts an object of query parameters into a URL-encoded query string.
 *
 * @param {Object} paramsObj - An object containing key-value pairs of query parameters.
 * @returns {string} A URL-encoded query string generated from the object.
 */
const objectToQueryString = paramsObj => {
    return new URLSearchParams( paramsObj ).toString();
};

export { get, objectToQueryString };