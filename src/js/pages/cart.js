import { removeFromCart,
        calculateSingleProductTotalPrice, 
        calculateTotalQuantity, 
        calculateTotalPrice } from "../utils.js";

//Display items in cart function
export async function displayCart () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartMainContainer = document.getElementById("cart-container");
    cartMainContainer.innerHTML = ""; //Clears the cart container

    //If the cart is empty
    if (cart.length === 0) {

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
        continueBtn.classList.add("continue-btn");
        continueBtn.textContent = "SEE ALL PRODUCTS";
        continueLink.appendChild(continueBtn);

    //If the cart is not empty
    } else {
        const totalQuantity = calculateTotalQuantity(cart);
        const totalPrice = calculateTotalPrice(cart);

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
        
        const proceedBtn = document.createElement("button"); //Add attributes later on
        proceedBtn.classList.add("proceed-btn");
        proceedBtn.textContent = "CONFIRM ORDER";
        confirmationLink.appendChild(proceedBtn);

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
            cartProductContainer.appendChild(cartProductImg);

            const cartProductSideContainer = document.createElement("div");
            cartProductSideContainer.classList.add("cart-product-side-container");
            cartProductContainer.appendChild(cartProductSideContainer);

            const productTitle = document.createElement("h2");
            productTitle.textContent = product.title;
            cartProductSideContainer.appendChild(productTitle);

            const productQuantity = document.createElement("span");
            productQuantity.textContent = "Quantity: " + product.quantity;
            cartProductSideContainer.appendChild(productQuantity);

            const productPrice = document.createElement("span");
            productPrice.textContent = `Price: ${calculateSingleProductTotalPrice(product)}$`;
            cartProductSideContainer.appendChild(productPrice);

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "REMOVE";
            cartProductSideContainer.appendChild(removeBtn);

            removeBtn.addEventListener("click", () => {
                removeFromCart(product); //Removes selected product
                cartProductContainer.remove(); //Removes selected product container from cart
                displayCart(); //Displays cart again, loops to remove existingCart above
            });

        });

    }
}

//Calling function to start program
displayCart();