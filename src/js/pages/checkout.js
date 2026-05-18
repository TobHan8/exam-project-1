import { checkoutContainer, loadingIndicator, footer } from '../constants.js';

import { calculateTotalQuantity, 
    calculateTotalPrice, removeAll,
    calculateSingleProductTotalPrice, isLoggedIn, 
    getCurrentUser, getSessionToken, displayToast, navigateBack } from '../utils.js';

function displayCheckout() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const loginCheck = isLoggedIn(getCurrentUser(), getSessionToken());

    if (!loginCheck) {
        displayToast('Must be logged in!', 'Please log in to continue to checkout', 'error');
        loadingIndicator.style.display = 'none';
        checkoutContainer.style.display = 'none';
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
        footer.style.width = '100vw';
        setTimeout(() => {
            navigation.navigate('login.html');
        }, 2000);

    } else if (cart.length === 0) {
        displayToast('The cart is empty!', 'Please add items to cart before accessing this page', 'error');
        loadingIndicator.style.display = 'none';
        checkoutContainer.style.display = 'none';
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
        footer.style.width = '100vw';
        setTimeout(() => {
            navigation.navigate('index.html');
        }, 2000);

    } else {
        const totalPrice = calculateTotalPrice(cart);

        loadingIndicator.style.display = 'none';

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('checkout-title-container');
        checkoutContainer.appendChild(titleContainer);
    
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
        h1.textContent = 'FILL OUT DETAILS';
        titleMiddleContainer.appendChild(h1);
    
        const titleRightContainer = document.createElement('div');
        titleRightContainer.classList.add('title-right-container');
        titleContainer.appendChild(titleRightContainer);

        const shippingContainer = document.createElement('div');
        shippingContainer.classList.add('checkout-form-containers', 'shipping-container');
        checkoutContainer.appendChild(shippingContainer);

        const shippingTitleContainer = document.createElement('div')
        shippingTitleContainer.classList.add('checkout-title-containers');
        shippingContainer.appendChild(shippingTitleContainer);

        const shippingTitle = document.createElement('h3');
        shippingTitle.textContent = 'SHIPPING DETAILS';
        shippingTitleContainer.appendChild(shippingTitle);

        const shippingFormContainer = document.createElement('div');
        shippingFormContainer.classList.add('form-container');
        shippingContainer.appendChild(shippingFormContainer);

        const shippingForm = document.createElement('form');
        shippingForm.classList.add('form-group');
        shippingForm.id = 'shipping-form';
        shippingForm.name = 'shipping-form';
        shippingFormContainer.appendChild(shippingForm);

        const emailLabel = document.createElement('label');
        emailLabel.htmlFor = 'email';
        emailLabel.textContent = 'Email';
        shippingForm.appendChild(emailLabel);

        const emailInput = document.createElement('input');
        emailInput.id = 'email';
        emailInput.name = 'email';
        emailInput.type = 'email';
        emailInput.placeholder = 'example@email.com';
        emailInput.required = true;
        shippingForm.appendChild(emailInput);

        const phoneLabel = document.createElement('label');
        phoneLabel.for = 'phone';
        phoneLabel.textContent = 'Phone Number';
        shippingForm.appendChild(phoneLabel);

        const phoneInput = document.createElement('input');
        phoneInput.id = 'phone';
        phoneInput.name = 'phone';
        phoneInput.type = 'tel';
        phoneInput.placeholder = '0047 00 00 00 00';
        phoneInput.maxLength = '12';
        phoneInput.pattern = '[0-9]{12}';
        phoneInput.required = true;
        shippingForm.appendChild(phoneInput);

        const firstnameLabel = document.createElement('label');
        firstnameLabel.htmlFor = 'firstname';
        firstnameLabel.textContent = 'First Name';
        shippingForm.appendChild(firstnameLabel);

        const firstnameInput = document.createElement('input');
        firstnameInput.id = 'firstname';
        firstnameInput.name = 'firstname';
        firstnameInput.type = 'text';
        firstnameInput.placeholder = 'Ola';
        firstnameInput.pattern = '[a-zA-Z]+';
        firstnameInput.required = true;
        shippingForm.appendChild(firstnameInput);

        const surnameLabel = document.createElement('label');
        surnameLabel.htmlFor = 'surname';
        surnameLabel.textContent = 'Last Name';
        shippingForm.appendChild(surnameLabel);

        const surnameInput = document.createElement('input');
        surnameInput.id = 'surname';
        surnameInput.name = 'surname';
        surnameInput.type = 'text';
        surnameInput.placeholder = 'Normann';
        surnameInput.pattern = '[a-zA-Z]+';
        surnameInput.required = true;
        shippingForm.appendChild(surnameInput);

        const addr1Label = document.createElement('label')
        addr1Label.textContent = 'Address Line';
        addr1Label.for = 'addr1';
        shippingForm.appendChild(addr1Label);

        const addr1Input = document.createElement('input');
        addr1Input.id = 'addr1';
        addr1Input.name = 'addr1';
        addr1Input.type = 'text';
        addr1Input.placeholder = 'Osloveien 1';
        addr1Input.pattern = '[\\w ]+';
        addr1Input.required = true;
        shippingForm.appendChild(addr1Input);

        const addr2Label = document.createElement('label')
        addr2Label.textContent = 'Apartment, Building, PO box';
        addr2Label.for = 'addr2';
        shippingForm.appendChild(addr2Label);

        const addr2Input = document.createElement('input');
        addr2Label.id = 'addr2';
        addr2Label.name = 'addr2';
        addr2Label.type = 'text';
        addr2Label.pattern = '[\\w ]+';
        addr2Input.placeholder = '1A';
        addr2Input.required = false;
        shippingForm.appendChild(addr2Input);

        const splitInput = document.createElement('div');
        splitInput.classList.add('split-input');
        shippingForm.appendChild(splitInput);

        const cityContainer = document.createElement('div')
        splitInput.appendChild(cityContainer);

        const cityLabel = document.createElement('label')
        cityLabel.textContent = 'City';
        cityLabel.for = 'city';
        cityContainer.appendChild(cityLabel);

        const cityInput = document.createElement('input');
        cityInput.id = 'city';
        cityInput.name = 'city';
        cityInput.type = 'text';
        cityInput.placeholder = 'Oslo';
        cityInput.pattern = '[a-zA-Z]+';
        cityInput.required = true;
        cityContainer.appendChild(cityInput);

        const postalContainer = document.createElement('div')
        splitInput.appendChild(postalContainer);

        const postalLabel = document.createElement('label')
        postalLabel.textContent = 'Postal Code';
        postalLabel.for = 'postal';
        postalContainer.appendChild(postalLabel);

        const postalInput = document.createElement('input');
        postalInput.id = 'postal';
        postalInput.name = 'postal';
        postalInput.type = 'text';
        postalInput.placeholder = '0000';
        postalInput.maxLength = '4';
        postalInput.pattern = '[0-9]{4}';
        postalInput.required = true;
        postalContainer.appendChild(postalInput);

        const paymentContainer = document.createElement('div');
        paymentContainer.classList.add('checkout-form-containers');
        checkoutContainer.appendChild(paymentContainer);

        const paymentTitleContainer = document.createElement('div');
        paymentTitleContainer.classList.add('checkout-title-containers');
        paymentContainer.appendChild(paymentTitleContainer);

        const paymentTitle = document.createElement('h3');
        paymentTitle.textContent = 'SELECT PAYMENT OPTION';
        paymentTitleContainer.appendChild(paymentTitle);

        const paymentFormContainer = document.createElement('div');
        paymentFormContainer.classList.add('form-container');
        paymentContainer.appendChild(paymentFormContainer);

        const paymentForm = document.createElement('form');
        paymentForm.classList.add('form-group');
        paymentForm.id = 'payment-form';
        paymentForm.name = 'payment-form';
        paymentFormContainer.appendChild(paymentForm);

        const paymentCards = document.createElement('img')
        paymentCards.src ='../../../assets/images/payment-cards.png'
        paymentForm.appendChild(paymentCards);

        const ownerLabel = document.createElement('label')
        ownerLabel.textContent = 'Full Name of Card Owner';
        ownerLabel.for = 'card-owner';
        paymentForm.appendChild(ownerLabel);

        const ownerInput = document.createElement('input');
        ownerInput.id = 'card-owner';
        ownerInput.name = 'card-owner';
        ownerInput.type = 'text';
        ownerInput.placeholder = 'Ola Normann';
        ownerInput.pattern = '[a-zA-Z ]+';
        ownerInput.required = true;
        paymentForm.appendChild(ownerInput);

        const cardNumberLabel = document.createElement('label')
        cardNumberLabel.textContent = 'Card Number';
        cardNumberLabel.for = 'card-number';
        paymentForm.appendChild(cardNumberLabel);

        const cardNumberInput = document.createElement('input');
        cardNumberInput.id = 'card-number';
        cardNumberInput.name = 'card-number';
        cardNumberInput.type = 'text';
        cardNumberInput.placeholder = '0000 0000 0000 0000';
        cardNumberInput.maxLength = '16';
        cardNumberInput.pattern = '[0-9]{16}';
        cardNumberInput.required = true;
        paymentForm.appendChild(cardNumberInput);

        const splitInput2 = document.createElement('div');
        splitInput2.classList.add('split-input');
        paymentForm.appendChild(splitInput2);

        const expirationContainer = document.createElement('div');
        splitInput2.appendChild(expirationContainer);

        const expirationLabel = document.createElement('label');
        expirationLabel.textContent = 'Expiration';
        expirationLabel.for = 'expiration';
        expirationContainer.appendChild(expirationLabel);

        const expirationInput = document.createElement('input');
        expirationInput.id = 'expiration';
        expirationInput.name = 'expiration';
        expirationInput.type = 'text';
        expirationInput.placeholder = 'MM/YY';
        expirationInput.maxLength = '4';
        expirationInput.pattern = '[0-9]{4}';
        expirationInput.required = true;
        expirationContainer.appendChild(expirationInput);

        const cvcContainer = document.createElement('div');
        splitInput2.appendChild(cvcContainer);

        const cvcLabel = document.createElement('label');
        cvcLabel.textContent = 'CVC';
        cvcLabel.for = 'cvc';
        cvcContainer.appendChild(cvcLabel);

        const cvcInput = document.createElement('input');
        cvcInput.id = 'cvc';
        cvcInput.name = 'cvc';
        cvcInput.type = 'text';
        cvcInput.placeholder = '000';
        cvcInput.maxLength = '3';
        cvcInput.pattern = '[0-9]{3}';
        cvcInput.required = true;
        cvcContainer.appendChild(cvcInput);
        

        const summaryContainer = document.createElement('div');
        summaryContainer.classList.add('checkout-form-containers');
        checkoutContainer.appendChild(summaryContainer);

        const summaryTitleContainer = document.createElement('div')
        summaryTitleContainer.classList.add('checkout-title-containers');
        summaryContainer.appendChild(summaryTitleContainer);

        const summaryTitle = document.createElement('h3');
        summaryTitle.textContent = 'ORDER SUMMARY';
        summaryTitleContainer.appendChild(summaryTitle);

        const summaryFormContainer = document.createElement('div');
        summaryFormContainer.classList.add('form-container');
        summaryContainer.appendChild(summaryFormContainer);

        const summaryGroup = document.createElement('div');
        summaryGroup.classList.add('summary-group');
        summaryFormContainer.appendChild(summaryGroup);

        const summaryField = document.createElement('div');
        summaryField.classList.add('summary-field');
        summaryGroup.appendChild(summaryField);

        const summaryLeft = document.createElement('div');
        summaryLeft.classList.add('summary-left-right');
        summaryField.appendChild(summaryLeft);

        const subTotalTitle = document.createElement('span');
        subTotalTitle.textContent = 'Sub total:';
        summaryLeft.appendChild(subTotalTitle);

        const shippingCostTitle = document.createElement('span');
        shippingCostTitle.textContent = 'Shipping:';
        summaryLeft.appendChild(shippingCostTitle);

        const totalTitle = document.createElement('span');
        totalTitle.textContent = 'Total:';
        summaryLeft.appendChild(totalTitle);

        const summaryRight = document.createElement('div');
        summaryRight.classList.add('summary-left-right');
        summaryField.appendChild(summaryRight);

        const subTotal = document.createElement('span');
        subTotal.textContent = calculateTotalPrice(cart);
        summaryRight.appendChild(subTotal);

        const shippingCostSpan = document.createElement('span');
        const shippingCost = 15;
        shippingCostSpan.textContent = shippingCost + '$';
        summaryRight.appendChild(shippingCostSpan);

        const total = document.createElement('span');
        total.textContent = totalPrice + shippingCost + '$';
        summaryRight.appendChild(total);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'COMPLETE PURCHASE';
        completeBtn.id = 'complete-btn';
        completeBtn.htmlFor = 'checkout-form';
        completeBtn.classList.add('add-to-cart-btn-medium');
        summaryGroup.appendChild(completeBtn);
    }     
}


function checkoutMain() {
    
    displayCheckout();

    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    const completeBtn = document.getElementById('complete-btn');

    completeBtn.addEventListener('click', (event) => {
        event.preventDefault();

       if (!shippingForm.checkValidity()) {
        shippingForm.reportValidity();
        displayToast('Attention!', 'Make sure to fill in correct details', 'error');
        return
       }

       if (!paymentForm.checkValidity()) {
        paymentForm.reportValidity();
        displayToast('Attention!', 'Make sure to fill in correct details', 'error');
        return
       }
        loadingIndicator.style.display = 'flex';
        removeAll();
        setTimeout(() => {
            navigation.navigate('success.html');
        }, 2000);

    });
}

checkoutMain();