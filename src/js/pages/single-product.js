
import { fetchSingleProduct } from "../api.js";

import { singleProductContainer } from "../constants.js";

import { addToCart, displayToast, isOnSale, navigateBack } from "../utils.js";

//Main program function
async function main() {
    const singleProductData = await fetchSingleProduct();
    displaySingleProduct(singleProductData);
}

//Function to display single product via HTML elements
function displaySingleProduct(product) {

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    singleProductContainer.appendChild(titleContainer);

    const backButtonContainer = document.createElement('div');
    backButtonContainer.classList.add('back-button-container');
    titleContainer.appendChild(backButtonContainer);

    const backBtn = document.createElement('button');
    backBtn.classList.add('back-button');
    backBtn.textContent = 'BACK';
    backBtn.ariaLabel = 'Click to go back to previous page';
    backButtonContainer.appendChild(backBtn);

    backBtn.addEventListener('click', () => {
        navigateBack();
    });

    const titleMiddleContainer = document.createElement('div');
    titleMiddleContainer.classList.add('title-middle-container');
    titleContainer.appendChild(titleMiddleContainer);

    const h1 = document.createElement('h1');
    h1.textContent = 'PRODUCT DETAILS';
    titleMiddleContainer.appendChild(h1);

    const titleRightContainer = document.createElement('div');
    titleRightContainer.classList.add('title-right-container');
    titleContainer.appendChild(titleRightContainer);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("single-product-img-container");
    singleProductContainer.appendChild(imgContainer);

    const shareBtn = document.createElement('button');
    shareBtn.classList.add('share-btn');
    shareBtn.ariaLabel = 'Click to copy the link to this product';
    imgContainer.appendChild(shareBtn);

    const shareIcon = document.createElement('i')
    shareIcon.classList.add('fa-solid', 'fa-share-from-square')
    shareBtn.appendChild(shareIcon);

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
        priceStrong.textContent = `${product.discountedPrice}$`;
        titleSpan.appendChild(priceStrong);

        price.style.textDecoration = 'line-through';
        price.style.fontWeight = 'normal';
    }
    
    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("single-prod-add-to-cart-btn");
    addToCartBtn.textContent = "ADD TO CART";
    addToCartBtn.ariaLabel = 'Click to add this product to the cart';
    bottomContainer.appendChild(addToCartBtn);

    shareBtn.addEventListener('click', async () => { // Asynchronous programming added for Clipboard API
        try {
            await navigator.clipboard.writeText(window.location.href); // Use of Clipboard API to copy URL from window object
            displayToast('Success!', 'Product link copied to clipboard!', 'success');
        } catch (error) {
            displayToast('Error!','Failed to copy product link to clipboard! Try again later.')
        }
    });

    addToCartBtn.addEventListener("click", () => {
    addToCart(product);
    });

};

main();