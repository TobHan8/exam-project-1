import { carouselContainer } from '../constants.js';

import { fetchAllProducts } from '../api.js';

async function main() {
    const allProductsData = await fetchAllProducts();
    displayCarousel(allProductsData);
    carouselNavigation();
}

let currentIndex = 0;
const numberOfProducts = 3;

function displayCarousel(allProductsData) {

    const carouselLeftBtn = document.createElement('button');
    carouselLeftBtn.id = 'left-btn';
    carouselLeftBtn.classList.add('carousel-left-btn');
    carouselContainer.appendChild(carouselLeftBtn);

    const leftArrow = document.createElement('i');
    leftArrow.class = 'fa-solid fa-circle-arrow-left';
    carouselLeftBtn.appendChild(leftArrow);

    const carouselRightBtn = document.createElement('button');
    carouselRightBtn.id = 'right-btn';
    carouselLeftBtn.classList.add('carousel-right-btn');

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('carousel-grid-container');
    carouselContainer.appendChild(gridContainer);
    carouselContainer.appendChild(carouselRightBtn);

    const rightArrow = document.createElement('i');
    rightArrow.class = 'fa-solid fa-circle-arrow-right';
    carouselRightBtn.appendChild(rightArrow);


    document.getElementById('left-btn').addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = allProductsData.length - numberOfProducts;
        } else {
            currentIndex = currentIndex - 1;
        }
    });

    document.getElementById('right-btn').addEventListener('click', () => {
        if (currentIndex >= allProductsData.length - numberOfProducts) {
            currentIndex = 0;
        } else {
            currentIndex = currentIndex + 1;
        }
    });


    allProductsData.forEach(product => {
        const carouselProductContainer = document.createElement('div');
        carouselProductContainer.classList.add('carousel-product-container');
        gridContainer.appendChild(carouselProductContainer);

        const imageLink = document.createElement('a');
        imageLink.href = `single-product.html?id=${product.id}`;
        imageLink.classList.add('carousel-image-container');
        carouselProductContainer.appendChild(imageLink);

        const img = document.createElement('img');
        img.src = product.image.url;
        img.alt = product.image.alt;
        imageLink.appendChild(img);

        const descContainer = document.createElement('div');
        descContainer.classList.add('carousel-desc-container');
        carouselProductContainer.appendChild(descContainer);

        const descContainerTop = document.createElement('div');
        descContainerTop.classList.add('carousel-desc-container-top');
        descContainer.appendChild(descContainerTop);

        const title = document.createElement('h3');
        title.textContent = product.title;
        descContainerTop.appendChild(title);
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