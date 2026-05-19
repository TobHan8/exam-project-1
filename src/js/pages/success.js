import { successContainer, loadingIndicator, footer } from '../constants.js';

import { getCurrentUser, getSessionToken, isLoggedIn, displayToast, navigateTo } from '../utils.js';

function displaySuccess() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const loginCheck = isLoggedIn(getCurrentUser(), getSessionToken());

    if (!loginCheck || cart.length !== 0) {
        displayToast('Error!', 'You cannot view this page before logging in and completing checkout', 'error');
            loadingIndicator.style.display = 'none';
            successContainer.style.display = 'none';
            setTimeout(() => {
                navigateTo('index.html');
            }, 2000);

    } else {
        loadingIndicator.style.display = 'none';

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('success-title-container');
        successContainer.appendChild(titleContainer);

        const h1 = document.createElement('h1');
        h1.textContent = 'SUCCESS!';
        titleContainer.appendChild(h1);

        const successContentContainer = document.createElement('div');
        successContentContainer.classList.add('succ-content-container');
        successContainer.appendChild(successContentContainer);

        const span = document.createElement('span');
        span.classList.add('success-span1');
        span.textContent = 'Your order has been recieved!';
        successContentContainer.appendChild(span);

        const span2 = document.createElement('span');
        span2.classList.add('success-span2');
        span2.textContent = 'While you wait, you can check out our other products below';
        successContentContainer.appendChild(span2);

        const seeAllBtn = document.createElement('button');
        seeAllBtn.classList.add('see-all-btn');
        seeAllBtn.ariaLabel = 'Click to see all products';
        seeAllBtn.textContent = 'SEE ALL PRODUCTS';
        successContentContainer.appendChild(seeAllBtn);

        seeAllBtn.addEventListener('click', () => {
            navigateTo('index.html');
        });
    }
}

displaySuccess();