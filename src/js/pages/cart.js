import { removeFromCart, addToCart, removeAll, 
        calculateSingleProductTotalPrice, 
        calculateTotalQuantity, 
        calculateTotalPrice } from "../utils.js";

//Display items in cart function
export async function displayCart () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartMainContainer = document.getElementById("cart-container");
    cartMainContainer.innerHTML = ""; //Clears the cart container // Fix title container
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    cartMainContainer.appendChild(titleContainer);
    const title = document.createElement('h1');
    title.id = 'title';
    titleContainer.appendChild(title);

    //If the cart is empty
    if (cart.length === 0) {

        title.textContent = 'THE CART IS EMPTY';

        const emptyCartContentContainer = document.createElement("div")
        emptyCartContentContainer.classList.add("empty-cart-content-container");
        cartMainContainer.appendChild(emptyCartContentContainer);

        const clickBelowMessage = document.createElement("span");
        clickBelowMessage.classList.add("click-below-span");
        clickBelowMessage.textContent = "Click below to see all products:";
        emptyCartContentContainer.appendChild(clickBelowMessage);

        const continueLink = document.createElement("a");
        continueLink.href = "index.html";
        emptyCartContentContainer.appendChild(continueLink);

        const continueBtn = document.createElement("button");
        continueBtn.classList.add("add-to-cart-btn");
        continueBtn.textContent = "SEE ALL PRODUCTS";
        continueLink.appendChild(continueBtn);

    //If the cart is not empty
    } else {
        const totalQuantity = calculateTotalQuantity(cart);
        const totalPrice = calculateTotalPrice(cart);

        title.textContent = 'REVIEW ITEMS IN CART';

        const cartContentContainer = document.createElement("div");
        cartContentContainer.classList.add("cart-content-container");
        cartMainContainer.appendChild(cartContentContainer);

        const cartContentLeftContainer = document.createElement("div");
        cartContentLeftContainer.classList.add("cart-content-left-container");
        cartContentContainer.appendChild(cartContentLeftContainer);

        const cartContentRightContainer = document.createElement("div");
        cartContentRightContainer.classList.add("cart-content-right-container");
        cartContentContainer.appendChild(cartContentRightContainer);

        const totalItemsSpan = document.createElement("span");
        totalItemsSpan.textContent = "Total items in cart: " + totalQuantity;
        cartContentRightContainer.appendChild(totalItemsSpan);

        const totalPriceSpan = document.createElement("span");
        totalPriceSpan.textContent = "Total price: " + totalPrice + "$";
        cartContentRightContainer.appendChild(totalPriceSpan);

        const confirmationLink = document.createElement("a");
        confirmationLink.classList.add("confirmation-link");
        confirmationLink.href = "confirmation.html";
        cartContentRightContainer.appendChild(confirmationLink);
        
        const checkoutBtn = document.createElement("button"); //Add attributes later on
        checkoutBtn.classList.add("add-to-cart-btn");
        checkoutBtn.ariaLabel = 'Click to continue to checkout';
        checkoutBtn.textContent = "CHECKOUT";
        confirmationLink.appendChild(checkoutBtn);

        cart.forEach(product => {
            const cartProductContainer = document.createElement("div");
            cartProductContainer.classList.add("cart-product-container");
            cartContentLeftContainer.appendChild(cartProductContainer);

            const cartProductImgContainer = document.createElement("div");
            cartProductImgContainer.classList.add("cart-product-image-container");
            cartProductContainer.appendChild(cartProductImgContainer);

            const cartProductImg = document.createElement("img");
            cartProductImg.src = product.image.url;
            cartProductImg.alt = product.image.alt;
            cartProductImgContainer.appendChild(cartProductImg);

            const cartProductSideContainer = document.createElement("div");
            cartProductSideContainer.classList.add("cart-product-side-container");
            cartProductContainer.appendChild(cartProductSideContainer);

            const productTitle = document.createElement("h3");
            productTitle.textContent = product.title;
            cartProductSideContainer.appendChild(productTitle);

            const productPrice = document.createElement("span");
            productPrice.textContent = `Price: ${calculateSingleProductTotalPrice(product)}$`;
            cartProductSideContainer.appendChild(productPrice);

            const removeBtn = document.createElement("button");
            removeBtn.classList.add('remove-btn');
            removeBtn.ariaLabel = 'Click to remove product completely';
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
                removeAll(product); //Removes selected product
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

//Calling function to start program
displayCart();