export const BASE_API_URL = "https://v2.api.noroff.dev";
export const ALL_PRODUCTS_URL = `${BASE_API_URL}/online-shop`;
export const SINGLE_PRODUCT_URL = `${ALL_PRODUCTS_URL}/`;

// Static HTML containers
export const carouselContainer = document.getElementById('carousel-container');
export const allProductsContainer = document.getElementById("all-products-container");
export const singleProductContainer = document.getElementById("single-product-container");
export const cartContainer = document.getElementById("cart-container");
export const registerContainer = document.getElementById('register-container');
export const loginContainer = document.getElementById('login-container');
export const loadingIndicator = document.getElementById ("loading-indicator");
export const addToCartBtn = document.getElementById("add-to-cart-btn");