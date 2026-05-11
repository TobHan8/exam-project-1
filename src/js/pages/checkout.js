import { checkoutContainer, loadingIndicator } from '../constants.js';

import { calculateTotalQuantity, 
    calculateTotalPrice, 
    calculateSingleProductTotalPrice, } from '../utils.js';

    function displayCheckout() {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalPrice = calculateTotalPrice(cart);

        loadingIndicator.style.display = 'none';

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
        shippingForm.id = 'checkout-form';
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
        phoneLabel.textContent = 'Phone Number';
        shippingForm.appendChild(phoneLabel);

        const phoneInput = document.createElement('input');
        phoneInput.id = 'phone';
        phoneInput.name = 'phone';
        phoneInput.type = 'number';
        phoneInput.placeholder = '00 47 00 00 00 00';
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
        surnameInput.required = true;
        shippingForm.appendChild(surnameInput);

        const addr1Label = document.createElement('label')
        addr1Label.textContent = 'Address Line';
        shippingForm.appendChild(addr1Label);

        const addr1Input = document.createElement('input');
        addr1Input.id = 'addr1';
        addr1Input.name = 'addr1';
        addr1Input.type = 'text';
        addr1Input.placeholder = 'Osloveien 1';
        addr1Input.required = true;
        shippingForm.appendChild(addr1Input);

        const addr2Label = document.createElement('label')
        addr2Label.textContent = 'Apartment, Building, PO box';
        shippingForm.appendChild(addr2Label);

        const addr2Input = document.createElement('input');
        addr2Input.id = 'addr2';
        addr2Input.name = 'addr2';
        addr2Input.type = 'text';
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
        cityContainer.appendChild(cityLabel);

        const cityInput = document.createElement('input');
        cityInput.id = 'city';
        cityInput.name = 'city';
        cityInput.type = 'text';
        cityInput.placeholder = 'Oslo';
        cityInput.required = true;
        cityContainer.appendChild(cityInput);

        const postalContainer = document.createElement('div')
        splitInput.appendChild(postalContainer);

        const postalLabel = document.createElement('label')
        postalLabel.textContent = 'Postal Code';
        postalContainer.appendChild(postalLabel);

        const postalInput = document.createElement('input');
        postalInput.id = 'postal';
        postalInput.name = 'postal';
        postalInput.type = 'number';
        postalInput.placeholder = '0000';
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
        paymentForm.id = 'checkout-form';
        paymentFormContainer.appendChild(paymentForm);

        const paymentCards = document.createElement('img')
        paymentCards.src ='../../../assets/images/payment-cards.png'
        paymentForm.appendChild(paymentCards);

        const ownerLabel = document.createElement('label')
        ownerLabel.textContent = 'Full Name of Card Owner';
        paymentForm.appendChild(ownerLabel);

        const ownerInput = document.createElement('input');
        ownerInput.id = 'card-owner';
        ownerInput.name = 'card-owner';
        ownerInput.type = 'text';
        ownerInput.placeholder = 'Ola Normann';
        ownerInput.required = true;
        paymentForm.appendChild(ownerInput);

        const cardNumberLabel = document.createElement('label')
        cardNumberLabel.textContent = 'Card Number';
        paymentForm.appendChild(cardNumberLabel);

        const cardNumberInput = document.createElement('input');
        cardNumberInput.id = 'card-number';
        cardNumberInput.name = 'card-number';
        cardNumberInput.type = 'number';
        cardNumberInput.placeholder = '0000';
        cardNumberInput.required = true;
        paymentForm.appendChild(cardNumberInput);

        const splitInput2 = document.createElement('div');
        splitInput2.classList.add('split-input');
        paymentForm.appendChild(splitInput2);

        const expirationContainer = document.createElement('div');
        splitInput2.appendChild(expirationContainer);

        const expirationLabel = document.createElement('label');
        expirationLabel.textContent = 'Expiration';
        expirationContainer.appendChild(expirationLabel);

        const expirationInput = document.createElement('input');
        expirationInput.id = 'expiration';
        expirationInput.name = 'expiration';
        expirationInput.type = 'number';
        expirationInput.placeholder = 'MM/YY';
        expirationInput.required = true;
        expirationContainer.appendChild(expirationInput);

        const cvcContainer = document.createElement('div');
        splitInput2.appendChild(cvcContainer);

        const cvcLabel = document.createElement('label');
        cvcLabel.textContent = 'CVC';
        cvcContainer.appendChild(cvcLabel);

        const cvcInput = document.createElement('input');
        cvcInput.id = 'cvc';
        cvcInput.name = 'cvc';
        cvcInput.type = 'number';
        cvcInput.placeholder = '000';
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

        const summaryForm = document.createElement('form');
        summaryForm.classList.add('form-group');
        summaryForm.id = 'checkout-form';
        summaryFormContainer.appendChild(summaryForm);

        const summaryField = document.createElement('div');
        summaryField.classList.add('summary-field');
        summaryForm.appendChild(summaryField);

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
        completeBtn.classList.add('add-to-cart-btn');
        summaryForm.appendChild(completeBtn);



        

        





        
    }


function checkoutMain() {
    displayCheckout();

    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        navigation.navigate('/confirmation.html');
    });
}

checkoutMain();