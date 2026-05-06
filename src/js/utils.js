//Add to cart function
export function addToCart(product) {
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === product.id);

  //If the item already is in cart, increase quantity by +1
  if (existingItem) {
    existingItem.quantity += 1;
    displayToast("1x " + product.title + " has been added to cart!", "success");
  } else {
    //If not, push key values with quantity set to 1
    cart.push({ ...product, quantity: 1 });
    displayToast("1x " + product.title + " has been added to cart!", "success");
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
    displayToast("1x " + product.title + " has been removed from the cart.", "error");

    //If not, filter item from array and store array as string value in local storage
  } else {
    const cartUpdated = cart.filter(item => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cartUpdated));
    displayToast(product.title + " has been removed from cart.", "error");
  }
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

//Toast message function to display notifications and errors
export function displayToast(message, type) {

  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast-container");
  document.body.appendChild(toastContainer);

  const toastElement = document.createElement("div");
  toastElement.classList.add("toast", type);
  toastElement.textContent = message;
  toastContainer.appendChild(toastElement);

  setTimeout(() => {
    toastContainer.remove();
    toastElement.remove();
  }, 3000);
}