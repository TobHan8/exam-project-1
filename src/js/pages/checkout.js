import { checkoutContainer } from '../constants.js';

import { calculateTotalQuantity, 
    calculateTotalPrice, 
    calculateSingleProductTotalPrice } from '../utils.js';

    function displayCheckout() {

        const shippingContainer = document.createElement('div');
        shippingContainer.classList.add('shipping-container');
        checkoutContainer.appendChild(shippingContainer);

        const shippingTitleContainer = document.createElement('div')
        shippingTitleContainer.classList.add('checkout-title-containers');
        shippingContainer.appendChild(shippingTitleContainer);

        const shippingTitle = document.createElement('h3');
        shippingTitle.textContent = 'SHIPPING DETAILS';
        shippingTitleContainer.appendChild(shippingTitle);
        
    }


    displayCheckout();