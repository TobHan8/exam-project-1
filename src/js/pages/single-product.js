
import { fetchSingleProduct } from "../api.js";

import { singleProductContainer } from "../constants.js";

import { addToCart, isOnSale } from "../utils.js";

//Main program function
async function main() {
    const singleProductData = await fetchSingleProduct();
    displaySingleProduct(singleProductData);
}

//Function to display single product via HTML elements
function displaySingleProduct(product) {

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("single-product-img-container");
    singleProductContainer.appendChild(imgContainer);

    const img = document.createElement("img");
    img.src = product.image.url;
    imgContainer.appendChild(img);

    const singleProductDescContainer = document.createElement("div");
    singleProductDescContainer.classList.add("single-product-desc-container");
    singleProductContainer.appendChild(singleProductDescContainer);

    const title = document.createElement("h2");
    title.textContent = `${product.title}`;
    singleProductDescContainer.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = `${product.description}`;
    singleProductDescContainer.appendChild(desc);
    
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("single-product-details-container");
    singleProductDescContainer.appendChild(detailsContainer);

    const rating = document.createElement("span");
    rating.textContent = `Rating: ${product.rating}`;
    rating.classList.add("rating");
    detailsContainer.appendChild(rating);

    const tags = document.createElement("span");
    tags.classList.add('tags');
    tags.textContent = `Tags: ${product.tags}`;
    detailsContainer.appendChild(tags);

    const id = document.createElement('span');
    id.classList.add('product-id');
    id.textContent = `Product ID: ${product.id}`;
    detailsContainer.appendChild(id);

    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('single-product-bottom-container');
    singleProductDescContainer.appendChild(bottomContainer);

    const discountedProduct = isOnSale(product);

    const titleSpan = document.createElement("span");
    titleSpan.classList.add('single-product-title-span');
    titleSpan.textContent = 'Price: ';
    bottomContainer.appendChild(titleSpan);

    const price = document.createElement('span');
    price.classList.add('single-product-price');
    price.textContent = `${product.price}$`;
    price.style.fontWeight = 'bold';
    titleSpan.appendChild(price);

    if (discountedProduct) {
        const priceStrong = document.createElement("strong");
        priceStrong.textContent = `${product.price}$`;
        titleSpan.appendChild(priceStrong);

        price.style.textDecoration = 'line-through';
        price.style.fontWeight = 'normal';
    }
    
    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.textContent = "ADD TO CART";
    bottomContainer.appendChild(addToCartBtn);

    addToCartBtn.addEventListener("click", () => {
    addToCart(product);
    });

};

main();