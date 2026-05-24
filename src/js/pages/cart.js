import { removeFromCart, addToCart, removeAll, removeAllQuantity, 
        calculateSingleProductTotalPrice, 
        calculateTotalQuantity, 
        calculateTotalPrice, isLoggedIn, getCurrentUser, getSessionToken, 
        displayToast, navigateBack, navigateTo } from "../utils.js";

import { cartContainer } from '../constants.js';


//Display items in cart function
export async function displayCart () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = ""; //Clears the cart container //

    //If the cart is empty
    if (cart.length === 0) {

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        cartContainer.appendChild(titleContainer);

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
    
        const title = document.createElement('h1');
        title.id = 'title';
        title.textContent = 'THE CART IS EMPTY';
        titleMiddleContainer.appendChild(title);
    
        const titleRightContainer = document.createElement('div');
        titleRightContainer.classList.add('title-right-container');
        titleContainer.appendChild(titleRightContainer);

        const emptyCartContentContainer = document.createElement("div")
        emptyCartContentContainer.classList.add("empty-cart-content-container");
        cartContainer.appendChild(emptyCartContentContainer);

        const clickBelowMessage = document.createElement("span");
        clickBelowMessage.classList.add("click-below-span");
        clickBelowMessage.textContent = "Click below to see all products";
        emptyCartContentContainer.appendChild(clickBelowMessage);

        const seeAllBtn = document.createElement("button");
        seeAllBtn.classList.add("see-all-btn");
        seeAllBtn.ariaLabel = 'Click to see all products';
        seeAllBtn.textContent = "SEE ALL PRODUCTS";
        emptyCartContentContainer.appendChild(seeAllBtn);

        seeAllBtn.addEventListener('click', () => {
            navigateTo('index.html');
        });

    //If the cart is not empty
    } else {
        const totalQuantity = calculateTotalQuantity(cart);
        const totalPrice = calculateTotalPrice(cart);

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        cartContainer.appendChild(titleContainer);

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
    
        const title = document.createElement('h1');
        title.id = 'title';
        title.textContent = 'REVIEW ITEMS IN CART';
        titleMiddleContainer.appendChild(title);

        const titleRightContainer = document.createElement('div');
        titleRightContainer.classList.add('title-right-container');
        titleContainer.appendChild(titleRightContainer);

        const cartContentContainer = document.createElement("div");
        cartContentContainer.classList.add("cart-content-container");
        cartContainer.appendChild(cartContentContainer);

        const cartContentLeftContainer = document.createElement("div");
        cartContentLeftContainer.classList.add("cart-content-left-container");
        cartContentContainer.appendChild(cartContentLeftContainer);

        const cartContentRightContainer = document.createElement("div");
        cartContentRightContainer.classList.add("cart-content-right-container");
        cartContentContainer.appendChild(cartContentRightContainer);

        const removeAllBtn = document.createElement('button');
        removeAllBtn.classList.add('remove-all-button');
        removeAllBtn.ariaLabel = 'Click to remove all items from cart';
        removeAllBtn.textContent = 'REMOVE ALL';
        cartContentRightContainer.appendChild(removeAllBtn);

        removeAllBtn.addEventListener('click', () => {
            removeAll();
            displayToast('Removed all!', 'The cart is now empty', 'removed');
            displayCart();
        });

        const totalItemsSpan = document.createElement("span");
        totalItemsSpan.textContent = 'Total items: ';
        cartContentRightContainer.appendChild(totalItemsSpan);
        
        const totalItemsStrong = document.createElement('strong')
        totalItemsStrong.textContent = totalQuantity;
        totalItemsSpan.appendChild(totalItemsStrong);

        const totalPriceSpan = document.createElement("span");
        totalPriceSpan.textContent = "Total price: ";
        cartContentRightContainer.appendChild(totalPriceSpan);

        const totalPriceStrong = document.createElement('strong')
        totalPriceStrong.textContent = totalPrice + '$';
        totalPriceSpan.appendChild(totalPriceStrong);

        const checkoutBtn = document.createElement("button");
        checkoutBtn.classList.add("add-to-cart-btn-medium");
        checkoutBtn.ariaLabel = 'Click to continue to checkout';
        checkoutBtn.textContent = "CHECKOUT";
        cartContentRightContainer.appendChild(checkoutBtn);

        checkoutBtn.addEventListener('click', () => {
            if (isLoggedIn(getCurrentUser(), getSessionToken())) {
                navigateTo('checkout.html');
            } else {
                displayToast('Not logged in!', 'You must be logged in to continue', 'error');
                return
            }
        });

        cart.forEach(product => {
            const cartProductContainer = document.createElement("div");
            cartProductContainer.classList.add("cart-product-container");
            cartContentLeftContainer.appendChild(cartProductContainer);

            const cartProductImgContainer = document.createElement("a");
            cartProductImgContainer.classList.add("cart-product-image-container");
            cartProductImgContainer.href = `single-product.html?id=${product.id}`;
            cartProductContainer.appendChild(cartProductImgContainer);

            const cartProductImg = document.createElement("img");
            cartProductImg.fetchPriority = 'high';
            cartProductImg.src = product.image.url;
            cartProductImg.alt = product.description;
            cartProductImgContainer.appendChild(cartProductImg);

            const cartProductSideContainer = document.createElement("div");
            cartProductSideContainer.classList.add("cart-product-side-container");
            cartProductContainer.appendChild(cartProductSideContainer);

            const productTitle = document.createElement("h2");
            productTitle.textContent = product.title;
            cartProductSideContainer.appendChild(productTitle);

            const productPrice = document.createElement("span");
            productPrice.textContent = `Price: ${calculateSingleProductTotalPrice(product)}$`;
            cartProductSideContainer.appendChild(productPrice);

            const removeBtn = document.createElement("button");
            removeBtn.classList.add('remove-btn');
            removeBtn.ariaLabel = 'Click to remove this product completely';
            cartProductSideContainer.appendChild(removeBtn);
            
            const removeIcon = document.createElement('i');
            removeIcon.classList.add('fa-solid', 'fa-xmark');
            removeBtn.appendChild(removeIcon);

            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('quantity-container');
            cartProductSideContainer.appendChild(quantityContainer);

            const decrementBtn = document.createElement('button');
            decrementBtn.classList.add('quantity-btns');
            decrementBtn.ariaLabel = 'Click to decrease quantity';
            quantityContainer.appendChild(decrementBtn);

            const decrementIcon = document.createElement('i');
            decrementIcon.classList.add('fa-solid', 'fa-minus');
            decrementBtn.appendChild(decrementIcon);

            const productQuantity = document.createElement("span");
            productQuantity.textContent = product.quantity;
            quantityContainer.appendChild(productQuantity);

            const incrementBtn = document.createElement('button');
            incrementBtn.classList.add('quantity-btns');
            incrementBtn.ariaLabel = 'Click to increase quantity';
            quantityContainer.appendChild(incrementBtn);

            const incrementIcon = document.createElement('i');
            incrementIcon.classList.add('fa-solid', 'fa-plus');
            incrementBtn.appendChild(incrementIcon);


            removeBtn.addEventListener("click", () => {
                removeAllQuantity(product); //Removes selected product
                cartProductContainer.remove(); //Removes selected product container from cart
                displayCart(); //Displays cart again, loops to remove existingCart above
            });

            decrementBtn.addEventListener("click", () => {
                removeFromCart(product); //Removes selected product
                cartProductContainer.remove(); //Removes selected product container from cart
                displayCart(); //Displays cart again, loops to remove existingCart above
            });

            incrementBtn.addEventListener("click", () => {
                addToCart(product); //Removes selected product
                cartProductContainer.remove(); //Removes selected product container from cart
                displayCart(); //Displays cart again, loops to remove existingCart above
            });

        });

    }


}


function cartMain() {
    if (document.getElementById('cart-container')) {
        displayCart();
    }
}

cartMain();