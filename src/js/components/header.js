import { header, footer, successContainer } from '../constants.js';

import { isLoggedIn, getCurrentUser, getSessionToken, logOut, displayToast } from '../utils.js';

function displayHeader() {

    const headerNav = document.createElement('nav');
    headerNav.classList.add('header-buttons');
    header.appendChild(headerNav);

    const toggleBtnContainer = document.createElement('div');
    toggleBtnContainer.classList.add('toggleBtn-container');
    headerNav.appendChild(toggleBtnContainer);

    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('toggle-btn');
    toggleBtn.id = 'toggle-btn';
    toggleBtn.name = 'Menu toggle button';
    toggleBtn.ariaLabel = 'Click to open menu';
    toggleBtnContainer.appendChild(toggleBtn);

    const toggleBtnIcon = document.createElement('i');
    toggleBtnIcon.classList.add('fa-solid', 'fa-bars');
    toggleBtn.appendChild(toggleBtnIcon);

    toggleBtn.addEventListener('click', () => {
        headerToggle();
    });

    const headerLogoContainer = document.createElement('div');
    headerLogoContainer.classList.add('header-logo-container');
    headerNav.appendChild(headerLogoContainer);

    const headerLogo = document.createElement('a');
    headerLogo.href = 'index.html';
    headerLogo.ariaLabel = 'Return to home page'
    headerLogo.classList.add('header-logo');
    headerLogoContainer.appendChild(headerLogo);

    const logoImg = document.createElement('img');
    logoImg.src = 'assets/images/desktop/desktop-logo.png';
    logoImg.alt = 'Online Shop clickable logo';
    logoImg.classList.add('header-logo-img');
    headerLogo.appendChild(logoImg);

    const logoImgMobile = document.createElement('img');
    logoImgMobile.src = 'assets/images/mobile/mobile-logo.png';
    logoImgMobile.alt = 'Online Shop clickable logo';
    logoImgMobile.classList.add('header-logo-img-mobile');
    headerLogo.appendChild(logoImgMobile);

    const buttonsRight = document.createElement('div');
    buttonsRight.classList.add('header-buttons-right');
    headerNav.appendChild(buttonsRight);

    const cartButton = document.createElement('a');
    cartButton.href = 'cart.html';
    cartButton.classList.add('cart-button');
    cartButton.ariaLabel = 'View items in cart';
    buttonsRight.appendChild(cartButton);

    const cartIcon = document.createElement('i');
    cartIcon.classList.add('fa-solid', 'fa-cart-shopping');
    cartButton.appendChild(cartIcon);

    const loginBtn = document.createElement('a');
    loginBtn.href = 'login.html';
    loginBtn.textContent = 'LOG IN';
    loginBtn.classList.add('header-login-btn');
    buttonsRight.appendChild(loginBtn);

    const registerBtn = document.createElement('a');
    registerBtn.classList.add('header-register-btn');
    registerBtn.href = 'register.html';
    registerBtn.text = 'REGISTER';
    buttonsRight.appendChild(registerBtn);

    const dropdownNav = document.createElement('nav');
    dropdownNav.classList.add('dropdown-nav')
    header.appendChild(dropdownNav);

    const testLink = document.createElement('a');
    testLink.href = 'test.html';
    testLink.textContent = 'TEST';
    testLink.classList.add('nav-buttons');
    dropdownNav.appendChild(testLink);

    const homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.textContent = 'HOME';
    homeLink.classList.add('nav-buttons');
    dropdownNav.appendChild(homeLink);

    const homeLinkIcon = document.createElement('i');
    homeLinkIcon.classList.add('fa-solid', 'fa-house');
    homeLink.appendChild(homeLinkIcon); 

    const cartLink2 = document.createElement('a');
    cartLink2.href = 'cart.html';
    cartLink2.textContent = 'CART';
    cartLink2.classList.add('header-cart');
    dropdownNav.appendChild(cartLink2);

    const cartIcon2 = document.createElement('i');
    cartIcon2.classList.add('fa-solid', 'fa-cart-shopping');
    cartLink2.appendChild(cartIcon2);

    const loginCheck = isLoggedIn(getCurrentUser(), getSessionToken());

    if (!loginCheck) {

        const logInLink = document.createElement('a');
        logInLink.href = 'login.html';
        logInLink.textContent = 'LOG IN';
        logInLink.classList.add('nav-buttons');
        dropdownNav.appendChild(logInLink);

        const logInIcon = document.createElement('i');
        logInIcon.classList.add('fa-solid', 'fa-right-to-bracket'); 
        logInLink.appendChild(logInIcon);

        const registerLink = document.createElement('a');
        registerLink.href = 'register.html';
        registerLink.textContent = 'REGISTER';
        registerLink.classList.add('nav-buttons');
        dropdownNav.appendChild(registerLink);

        const registerIcon = document.createElement('i');
        registerIcon.classList.add('fa-solid', 'fa-user-plus');
        registerLink.appendChild(registerIcon);


    } else {

        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';

        const profileButton = document.createElement('a');
        profileButton.href = 'profile.html';
        profileButton.classList.add('header-profile-btn');
        buttonsRight.appendChild(profileButton);
        
        const profileIcon2 = document.createElement('i');
        profileIcon2.classList.add('fa-regular', 'fa-circle-user')
        profileButton.appendChild(profileIcon2);

        const profileLink = document.createElement('a');
        profileLink.href = 'profile.html';
        profileLink.textContent = 'VIEW PROFILE';
        profileLink.classList.add('nav-buttons');
        dropdownNav.appendChild(profileLink);

        const profileIcon = document.createElement('i');
        profileIcon.classList.add('fa-solid', 'fa-user');
        profileLink.appendChild(profileIcon);

        const menuLogOutBtn = document.createElement('button');
        menuLogOutBtn.classList.add('menu-log-out-btn');
        menuLogOutBtn.textContent = 'LOG OUT';
        dropdownNav.appendChild(menuLogOutBtn);

        const logOutIcon = document.createElement('i');
        logOutIcon.classList.add('fa-solid', 'fa-right-from-bracket');
        menuLogOutBtn.appendChild(logOutIcon);

        menuLogOutBtn.addEventListener('click', () => {
            logOut();
        })
    }

}

let currentState = 0;

function headerToggle() {
    const toggleBtn = document.getElementById('toggle-btn');
    const dropdown = document.querySelector('.dropdown-nav');

        if(currentState === 0) {
            dropdown.style.maxHeight = '600px';
            dropdown.style.overflow = 'auto';
            currentState = 1;

        } else {
            dropdown.style.maxHeight = '0';
            dropdown.style.overflow = 'hidden';
            currentState = 0;
        }
}

displayHeader();