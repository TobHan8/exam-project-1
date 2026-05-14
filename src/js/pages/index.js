//Imports
import { allProductsContainer } from "../constants.js";

import { fetchAllProducts } from "../api.js";

import { addToCart, isOnSale } from "../utils.js";

//Main function to call the return of json.data from the API call
async function main() {
    const allProductsData = await fetchAllProducts();
    displayAllProducts(allProductsData);
}

//Display the products for the user by creating HTML via the DOM
function displayAllProducts(allProductsData) {

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('index-title-container');
  allProductsContainer.appendChild(titleContainer);

  const title = document.createElement('h1');
  title.textContent = 'BROWSE ALL PRODUCTS';
  titleContainer.appendChild(title);

  allProductsData.forEach(product => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");
    allProductsContainer.appendChild(productContainer);

    const imageLink = document.createElement("a");
    imageLink.href = `single-product.html?id=${product.id}`;
    imageLink.ariaLabel = `Click for more details on ${product.title}`;
    imageLink.classList.add("product-image-container");
    productContainer.appendChild(imageLink);

    const img = document.createElement("img");
    img.src = product.image.url;
    img.alt = `${product.description}`;
    imageLink.appendChild(img);

    const descContainer = document.createElement("div");
    descContainer.classList.add("product-desc-container");
    productContainer.appendChild(descContainer);

    const descContainerTop = document.createElement('div');
    descContainerTop.classList.add('desc-container-top');
    descContainer.appendChild(descContainerTop);

    const title = document.createElement("h3");
    title.textContent = product.title;
    descContainerTop.appendChild(title);

    const descContainerBottom = document.createElement('div');
    descContainerBottom.classList.add('desc-container-bottom');
    descContainer.appendChild(descContainerBottom);

    const priceSpan = document.createElement("span");
    priceSpan.classList.add('price-span');
    priceSpan.textContent = 'Price: ';
    descContainerBottom.appendChild(priceSpan);

    const discountedProduct = isOnSale(product);

    if (discountedProduct) {
        const priceStrong = document.createElement("strong");
        priceStrong.textContent = `${product.discountedPrice}$`;
        priceSpan.appendChild(priceStrong);

    } else {
        priceSpan.textContent = `Price: ${product.price}$`;
    }
    
    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("add-to-cart-btn-medium");
    addToCartBtn.textContent = "ADD TO CART";
    descContainerBottom.appendChild(addToCartBtn);

    addToCartBtn.addEventListener("click", () => {
      addToCart(product);
    });

  });

};

//Calling main function to start program
main();
