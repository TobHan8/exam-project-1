import { toastContainer } from './constants.js';

//Add to cart function
export function addToCart(product) {
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === product.id);

  //If the item already is in cart, increase quantity by +1
  if (existingItem) {
    existingItem.quantity += 1;
    displayToast('Item quantity added!', existingItem.quantity + "x " + product.title + " has been added to cart!", "success");
  } else {
    //If not, push key values with quantity set to 1
    cart.push({ ...product, quantity: 1 });
    displayToast('Item added!', "1x " + product.title + " has been added to cart!", "success");
  }

  //Store array in local storage as string value
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Remove from cart function
export function removeFromCart(product) {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id == product.id);

  //If the item quantity in cart is more than 1, reduce item quantity in array by 1
  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayToast('Quantity removed!', "1x " + product.title + " has been removed from the cart.", "removed");

    //If not, filter item from array and store array as string value in local storage
  } else {
    const cartUpdated = cart.filter(item => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cartUpdated));
    displayToast('Item removed!', product.title + " has been removed from cart.", "removed");
  }
}

// Remove all quantities of selected product from cart
export function removeAll(product) {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartUpdated = cart.filter(item => item.id !== product.id);
  localStorage.setItem("cart", JSON.stringify(cartUpdated));
  displayToast('Item removed!', product.quantity + 'x ' + product.title + " has been removed from cart.", "removed");
}

//parseFloat with .toFixed to only display 2 decimal points in price float value
export function calculateSingleProductTotalPrice(item) {
  return parseFloat((item.price * item.quantity).toFixed(2));
}

//Calculate total quantity all of products in cart
export function calculateTotalQuantity(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

//Calculate total price of all products in cart
export function calculateTotalPrice(cart) {
  const total = cart.reduce((sum, item) => (sum + item.price * item.quantity), 0);
  return parseFloat(total.toFixed(2));
}

let timeout = false; //Timeout variable for use of clearing previous setTimeout with clearTimeout

//Toast message function to display notifications and errors
export function displayToast(title, message, type) {
  
  if (timeout) { //If timeout is present, clear it
    clearTimeout(timeout);
  }
  
  toastContainer.innerHTML = '';
  toastContainer.classList.add("toast-container");
  toastContainer.style.display = 'flex';

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-btn')
  closeBtn.ariaLabel = 'Click to close notification';
  toastContainer.appendChild(closeBtn);

  const closeIcon = document.createElement('i');
  closeIcon.classList.add('fa-solid', 'fa-xmark');
  closeBtn.appendChild(closeIcon);

  const toastElement = document.createElement("div");
  toastElement.classList.add("toast");
  toastContainer.appendChild(toastElement);

  if (type === 'error') {
    toastElement.setAttribute('role', 'alert');
  } else {
    toastElement.setAttribute('role', 'status');
  }

  const toastTitle = document.createElement('span');
  toastTitle.classList.add('toast-title', type);
  toastTitle.textContent = title;
  toastElement.appendChild(toastTitle);

  const toastMessage = document.createElement('span');
  toastMessage.classList.add('toast-message');
  toastMessage.textContent = message;
  toastElement.appendChild(toastMessage);

  closeBtn.addEventListener('click', () => {
    clearTimeout(timeout);
    toastContainer.innerHTML = '';
    toastContainer.style.display = 'none';
  });

  timeout = setTimeout(() => {
    toastContainer.innerHTML = '';
    toastContainer.style.display = 'none';
  }, 5000);
}


// Check if item is on sale / has reduced price
export function isOnSale(product) {
  return product.discountedPrice < product.price;
}

// Function to store access token to localstorage (acts as current session token)
export function setSessionToken(key, value) {
  localStorage.setItem(key, value);
}

// Get sessionToken from localStorage as object
export function getSessionToken(sessionToken) {
  const currentSessionToken = localStorage.getItem('sessionToken') || [];
  return currentSessionToken;
}

// Set the logged in user details as currentUser in localStorage
export function setCurrentUser(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get currentUser from localStorage returned as object
export function getCurrentUser(currentUser) {
  const currentUserObject = JSON.parse(localStorage.getItem('currentUser')) || [];
  return currentUserObject;
}

// Check if user is logged in and that accessToken matches sessionToken 
export function isLoggedIn(getCurrentUser, getSessionToken) {
  const userToken = getCurrentUser.token;
  const sessionToken = getSessionToken;

  if (userToken !== sessionToken) {
    displayToast('Must be logged in!', 'Please log in to continue to checkout', 'error');
    return false
  } else {
    return true
  }
}
