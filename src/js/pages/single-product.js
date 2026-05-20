
import { fetchSingleProduct } from "../api.js";

import { singleProductContainer, BASE_SITE_URL } from "../constants.js";

import { addToCart, displayToast, isOnSale, navigateBack } from "../utils.js";

//Main program function
async function main() {
    const singleProductData = await fetchSingleProduct();
    displaySingleProduct(singleProductData);
}

//Function to display single product via HTML elements
function displaySingleProduct(product) {

    const metaTitle = document.getElementById('meta-title');
    metaTitle.content = product.title;

    const metaDesc = document.getElementById('meta-desc');
    metaDesc.content = product.description; 

    const ogTitle = document.getElementById('og-title');
    ogTitle.content = product.title;

    const ogDesc = document.getElementById('og-desc');
    ogDesc.content = product.description;

    const ogUrl = document.getElementById('og-url');
    ogUrl.content = BASE_SITE_URL + `single-product.html?id=${product.id}`;

    const ogImg = document.getElementById('og-img');
    ogImg.content = product.image.url;

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
    img.alt = product.description;
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
    rating.textContent = 'Rating: ';
    rating.classList.add("rating");
    detailsContainer.appendChild(rating);

    if (product.rating === 0 ) {
        rating.textContent = 'Rating: No rating yet';
    }

    const isInteger = Number.isInteger(product.rating);
    const decimal = product.rating % 1;

    if (product.rating !== 0 && !isInteger) {
        
        for (let i = 0; i < product.rating - decimal; i++) {

            const star = document.createElement('i');
            star.classList.add('fa-solid', 'fa-star', 'star');
            rating.appendChild(star);
        }

    } if (decimal >= 0.25) {
        const halfStar = document.createElement('i');
        halfStar.classList.add('fa-solid', 'fa-star-half', 'star');
        rating.appendChild(halfStar);

    } if (decimal >= 0.75) {
        const star = document.createElement('i');
        star.classList.add('fa-solid', 'fa-star', 'star');
        rating.appendChild(star);

    } else { 
        if (product.rating !== 0 && isInteger) {

            for (let i = 0; i < product.rating; i++) {

                const star = document.createElement('i');
                star.classList.add('fa-solid', 'fa-star', 'star');
                rating.appendChild(star);
            }
        }
    }

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


    if (discountedProduct) {
        
        const priceDiscounted = document.createElement('span');
        priceDiscounted.classList.add('single-product-price-discounted');
        priceDiscounted.textContent = `${product.price}$`;
        priceDiscounted.style.fontWeight = 'normal';
        priceDiscounted.style.textDecoration = 'line-through';
        titleSpan.appendChild(priceDiscounted);

        const priceStrong = document.createElement("strong");
        priceStrong.textContent = `${product.discountedPrice}$`;
        titleSpan.appendChild(priceStrong);

    } else {
        const priceNormal = document.createElement('span');
        priceNormal.classList.add('single-product-price-normal');
        priceNormal.textContent = `${product.price}$`;
        priceNormal.style.fontWeight = 'bold';
        titleSpan.appendChild(priceNormal);
    }
    
    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("single-prod-add-to-cart-btn");
    addToCartBtn.textContent = "ADD TO CART";
    addToCartBtn.ariaLabel = 'Click to add this product to the cart';
    bottomContainer.appendChild(addToCartBtn);

    shareBtn.addEventListener('click', async () => { // Asynchronous programming added for Clipboard API
        try {
            await navigator.clipboard.writeText(BASE_SITE_URL + `single-product.html?id=${product.id}`);
            displayToast('Success!', 'Product link copied to clipboard!', 'success');
        } catch (error) {
            displayToast('Error!','Failed to copy product link to clipboard! Try again later.')
        }
    });

    addToCartBtn.addEventListener("click", () => {
    addToCart(product);
    });

    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review-container');
    singleProductDescContainer.appendChild(reviewContainer);

    const reviewTitle = document.createElement('span');
    reviewTitle.classList.add('review-title');
    reviewTitle.textContent = 'Customer reviews';
    reviewContainer.appendChild(reviewTitle);


    const reviews = product.reviews;

    if (reviews.length === 0) {
        const noReview = document.createElement('span');
        noReview.classList.add('no-review');
        noReview.textContent = 'No reviews for this product yet';
        reviewContainer.appendChild(noReview);
        
    } else {
        reviews.forEach(review => {

            const reviewContentContainer = document.createElement('div');
            reviewContentContainer.classList.add('review-content-container');
            reviewContainer.appendChild(reviewContentContainer);

            const reviewName = document.createElement('span');
            reviewName.classList.add('review-name');
            reviewName.textContent = review.username;
            reviewContentContainer.appendChild(reviewName);

            const reviewRating = document.createElement('span');
            reviewRating.textContent = 'Rating: ';
            reviewRating.classList.add('review-rating');
            reviewContentContainer.appendChild(reviewRating);


            const isInteger2 = Number.isInteger(review.rating);
            const decimal2 = review.rating % 1;

            if (review.rating !== 0 && !isInteger2) {
                
                for (let i = 0; i < review.rating - decimal2; i++) {

                    const star = document.createElement('i');
                    star.classList.add('fa-solid', 'fa-star', 'star');
                    reviewRating.appendChild(star);
                }

            } if (decimal2 >= 0.25) {
                const halfStar = document.createElement('i');
                halfStar.classList.add('fa-solid', 'fa-star-half', 'star');
                reviewRating.appendChild(halfStar);

            } if (decimal2 >= 0.75) {
                const star = document.createElement('i');
                star.classList.add('fa-solid', 'fa-star', 'star');
                reviewRating.appendChild(star);

            } else { 
                if (review.rating !== 0 && isInteger2) {

                    for (let i = 0; i < review.rating; i++) {

                        const star = document.createElement('i');
                        star.classList.add('fa-solid', 'fa-star', 'star');
                        reviewRating.appendChild(star);
                    }
                }
            }

            const reviewDesc = document.createElement('span');
            reviewDesc.textContent = `"${review.description}"`;
            reviewDesc.classList.add('review');
            reviewContentContainer.appendChild(reviewDesc);
        });
    }
};

main();