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
    img.fetchPriority = 'high';
    img.src = product.image.url;
    img.alt = `${product.description}`;
    imageLink.appendChild(img);

    const descContainer = document.createElement("div");
    descContainer.classList.add("product-desc-container");
    productContainer.appendChild(descContainer);

    const descContainerTop = document.createElement('div');
    descContainerTop.classList.add('desc-container-top');
    descContainer.appendChild(descContainerTop);

    const title = document.createElement("h2");
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
    
    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("all-products-add-to-cart-btn");
    addToCartBtn.ariaLabel = `Add 1x ${product.title} to the cart`;
    addToCartBtn.textContent = "ADD TO CART";
    descContainerBottom.appendChild(addToCartBtn);

    const descContainerMobile = document.createElement('div');
    descContainerMobile.classList.add('desc-container-mobile');
    productContainer.appendChild(descContainerMobile);

    const titleMobile = document.createElement("h2");
    titleMobile.textContent = product.title;
    titleMobile.classList.add('h2-mobile');
    descContainerMobile.appendChild(titleMobile);

    const priceSpanMobile = document.createElement("span");
    priceSpanMobile.classList.add('price-span-mobile');
    priceSpanMobile.textContent = 'Price: ';
    descContainerMobile.appendChild(priceSpanMobile);

    const addToCartBtnMobile = document.createElement("button");
    addToCartBtnMobile.classList.add("all-products-add-to-cart-btn-mobile");
    addToCartBtnMobile.ariaLabel = `Add 1x ${product.title} to the cart`;
    addToCartBtnMobile.textContent = "ADD TO CART";
    descContainerMobile.appendChild(addToCartBtnMobile);

    addToCartBtn.addEventListener("click", () => {
      addToCart(product);
    });

    addToCartBtnMobile.addEventListener("click", () => {
      addToCart(product);
    });

    if (discountedProduct) {
        const priceStrong = document.createElement("strong");
        priceStrong.textContent = `${product.discountedPrice}$`;
        priceSpan.appendChild(priceStrong);

        const priceStrongMobile = document.createElement("strong");
        priceStrongMobile.textContent = `${product.discountedPrice}$`;
        priceSpanMobile.appendChild(priceStrongMobile);

    } else {
        priceSpan.textContent = `Price: ${product.price}$`;
        priceSpanMobile.textContent = `Price: ${product.price}$`;
    }

  });
};

//Calling main function to start program
main();
