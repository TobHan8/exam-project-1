import { successContainer, loadingIndicator } from '../constants.js';

function displaySuccess() {

    loadingIndicator.style.display = 'none';

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
    seeAllBtn.classList.add('add-to-cart-btn');
    seeAllBtn.textContent = 'SEE ALL PRODUCTS';
    successContentContainer.appendChild(seeAllBtn);

    seeAllBtn.addEventListener('click', () => {
        navigation.navigate('/index.html');
    });
}

displaySuccess();