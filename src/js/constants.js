// API URL
export const BASE_API_URL = "https://v2.api.noroff.dev";
export const ALL_PRODUCTS_URL = `${BASE_API_URL}/online-shop`;
export const SINGLE_PRODUCT_URL = `${ALL_PRODUCTS_URL}/`;
export const AUTH_REGISTER_URL = `${BASE_API_URL}/auth/register`;
export const AUTH_LOGIN_URL = `${BASE_API_URL}/auth/login`;

// Static HTML containers
export const carouselContainer = document.getElementById('carousel-container');
export const allProductsContainer = document.getElementById("all-products-container");
export const singleProductContainer = document.getElementById("single-product-container");
export const cartContainer = document.getElementById("cart-container");
export const registerContainer = document.getElementById('register-container');
export const loginContainer = document.getElementById('login-container');
export const toastContainer = document.getElementById('toast-container');
export const checkoutContainer = document.getElementById('checkout-container');
export const successContainer = document.getElementById('success-container');

// Static HTML elements
export const footer = document.getElementById('footer');

export const loadingIndicator = document.getElementById ("loading-indicator");
export const addToCartBtn = document.getElementById("add-to-cart-btn");