import { carouselContainer } from '../constants.js';

import { fetchAllProducts } from '../api.js';

import { addToCart, isOnSale } from "../utils.js";

import { displayCart } from '../pages/cart.js'

async function main() {
    const allProductsData = await fetchAllProducts();
    displayCarousel(allProductsData);
    carouselNavigation();
}

let currentIndex = 0;
const numberOfProducts = 3;

function displayCarousel(allProductsData) {

    const discountedProducts = allProductsData.filter(product => isOnSale(product));

    const carouselLeftBtn = document.createElement('button');
    carouselLeftBtn.id = 'left-btn';
    carouselLeftBtn.ariaLabel = 'Click to view previous products on sale';
    carouselLeftBtn.classList.add('carousel-left-btn');
    carouselContainer.appendChild(carouselLeftBtn);

    const leftArrow = document.createElement('i');
    leftArrow.classList.add('fa-solid', 'fa-circle-arrow-left');
    carouselLeftBtn.appendChild(leftArrow);

    const carouselRightBtn = document.createElement('button');
    carouselRightBtn.id = 'right-btn';
    carouselRightBtn.ariaLabel = 'Click to view next products on sale';
    carouselRightBtn.classList.add('carousel-right-btn');

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('carousel-grid-container');
    carouselContainer.appendChild(gridContainer);
    carouselContainer.appendChild(carouselRightBtn);

    const rightArrow = document.createElement('i');
    rightArrow.classList.add('fa-solid', 'fa-circle-arrow-right');
    carouselRightBtn.appendChild(rightArrow);


    document.getElementById('left-btn').addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = discountedProducts.length - numberOfProducts;
        } else {
            currentIndex = currentIndex - 1;
        }
        carouselNavigation();
    });

    document.getElementById('right-btn').addEventListener('click', () => {
        if (currentIndex >= discountedProducts.length - numberOfProducts) {
            currentIndex = 0;
        } else {
            currentIndex = currentIndex + 1;
        }
        carouselNavigation();
    });

    
    discountedProducts.forEach(product => {

        const carouselProductContainer = document.createElement('div');
        carouselProductContainer.classList.add('carousel-product-container');
        gridContainer.appendChild(carouselProductContainer);

        const imageLink = document.createElement('a');
        imageLink.href = `single-product.html?id=${product.id}`;
        imageLink.ariaLabel = `Click for more details on ${product.title}`;
        imageLink.classList.add('carousel-image-container');
        carouselProductContainer.appendChild(imageLink);

        const img = document.createElement('img');
        img.src = product.image.url;
        img.alt = `${product.description}`;
        imageLink.appendChild(img);

        const descContainer = document.createElement('div');
        descContainer.classList.add('carousel-desc-container');
        carouselProductContainer.appendChild(descContainer);

        const priceContainer = document.createElement('div');
        priceContainer.classList.add('carousel-price-container');
        descContainer.appendChild(priceContainer);

        const priceSpan = document.createElement("span");
        priceSpan.classList.add('carousel-price-span');
        priceSpan.textContent = `${product.price}$`;
        priceContainer.appendChild(priceSpan);

        const priceStrong = document.createElement("strong");
        priceStrong.classList.add('carousel-price-strong');
        priceStrong.textContent = `${product.discountedPrice}$`;
        priceContainer.appendChild(priceStrong);
        

        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("add-to-cart-btn-small");
        addToCartBtn.textContent = "ADD TO CART";
        addToCartBtn.ariaLabel = 'Click to add this product to the cart';
        descContainer.appendChild(addToCartBtn);

        addToCartBtn.addEventListener("click", () => {
            addToCart(product);
            if (document.getElementById('cart-container')) {
                displayCart();
            }
        });    
    });
}

function carouselNavigation() {
    const products = carouselContainer.querySelectorAll('.carousel-product-container');

    products.forEach((product, i) => {
        
        if (i >= currentIndex && i < currentIndex + numberOfProducts) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}

main();