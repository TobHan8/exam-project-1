//Imports
import {
  ALL_PRODUCTS_URL,
  SINGLE_PRODUCT_URL,
  loadingIndicator
} from "./constants.js";

import { displayToast } from "./utils.js";

//Network Error class
class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

//HTTP Error class
class HttpError extends Error {
    constructor(message) {
        super(message);
        this.name = "HttpError";
        this.statusCode = message;
    }
}

//Fetch all product data from API
export async function fetchAllProducts() {
  try {
    const response = await fetch(ALL_PRODUCTS_URL);
    if (!response.ok) { //If fetch response is not ok, throw error as response status
      throw new HttpError(response.status);
  }
    const json = await response.json();
    return json.data;
  } catch (error) {
    if (error instanceof HttpError) {
        displayToast(`Server error: ${error.statusCode}. Please try again later.`, "error");
    } else if (error instanceof NetworkError) {
        displayToast("Network error. You appear to be offline. Check you internet connection.", "error");
    } else {
        displayToast("Something went wrong. Unknown Error. Please try again.", "error");
    }
  } finally {
    if (loadingIndicator) {
        loadingIndicator.style.display = "none"; //Hide loading indicator with CSS property display: none
    }
  }
}

//Find the current product ID from the URL via the browser window object
const urlIdString = new URLSearchParams(window.location.search);
const singleProductData = urlIdString.get("id");

//Function for fetching single product
export async function fetchSingleProduct() {
    try {
        const response = await fetch(`${SINGLE_PRODUCT_URL}${singleProductData}`);
        if (!response.ok) {
            throw new HttpError(response.status);
        }
        const json = await response.json();
    return json.data;
  } catch (error) {
    if (error instanceof HttpError) {
        displayToast(`Server error: ${error.statusCode}. Please try again later.`, "error");
    } else if (error instanceof NetworkError) {
        displayToast("Network error. You appear to be offline. Check you internet connection.", "error");
    } else {
        displayToast("Something went wrong. Unknown Error. Please try again.", "error");
    }
  } finally {
    if (loadingIndicator) {
        loadingIndicator.style.display = "none"; //Hide loading indicator with CSS property display: none
    }
  }
}