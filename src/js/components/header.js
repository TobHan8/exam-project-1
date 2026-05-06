//import { logOut } from '../../js/log-out.js';
 
function displayHeader (isLoggedIn) {
    const header = document.getElementById('header');

    const headerButtons = document.createElement('div');
    headerButtons.classList.add('header-buttons');

    const menuToggleBtn = document.createElement('button');
    menuToggleBtn.classList.add('menu-toggle');
    headerButtons.appendChild(menuToggleBtn);

    const ToggleBtnIcon = document.createElement('i');
    ToggleBtnIcon.class = 'fas fa-bars';
    menuToggleBtn.appendChild(ToggleBtnIcon);

    const headerLogo = document.createElement('a');
    headerLogo.href = 'index.html';
    headerLogo.ariaLabel = 'Return to home page'
    headerLogo.classList.add('header-logo');
    headerButtons.appendChild(headerLogo);

    const logoImg = document.createElement('img');
    logoImg.src = 'assets/images/desktop/desktop-logo.png';
    logoImg.alt = 'Online Shop clickable logo';
    headerLogo.appendChild(logoImg);

    const logoImgMobile = document.createElement('img');
    logoImgMobile.src = 'assets/images/mobile/mobile-logo.png';
    logoImgMobile.alt = 'Online Shop clickable logo';
    headerLogo.appendChild(logoImgMobile);

    const cartButton = document.createElement('a');
    cartButton.href = 'checkout.html';
    cartButton.class = 'cart-button';
    cartButton.ariaLabel = 'View items in cart';
    headerButtons.appendChild(cartButton);

    menuToggleBtn.addEventListener('click', () => {
        const nav = document.createElement('nav');
        header.appendChild(nav);

        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        nav.appendChild(homeLink);

        const homeIcon = document.createElement('i');
        homeLinkIcon.class = 'fa-solid fa-house';
        homeLink.appendChild(homeLinkIcon); 

        if (!isLoggedIn) {
            const logInLink = document.createElement('a');
            logInLink.href = 'log-in.html';
            nav.appendChild(logInLink);

            const logInIcon = document.createElement('i');
            logInIcon.class = 'fa-solid fa-right-to-bracket'; 
            logInLink.appendChild(logInIcon);

            const registerLink = document.createElement('a');
            registerLink.href = 'register.html';
            nav.appendChild(registerLink);

            const registerIcon = document.createElement('i');
            registerIcon.class = 'fa-solid fa-user-plus';
            registerLink.appendChild(registerIcon);
        }
    })

        const cartLink = document.createElement('a');
        cartLink.href = 'cart.html';
        nav.appendChild(cartLink);

        if (isLoggedIn) {
            const profileLink = document.createElement('a');
            profileLink.href = 'profile.html';
            nav.appendChild(profileLink);

            const profileIcon = document.createElement('i');
            profileIcon.class = 'fa-solid fa-user';
            profileLink.appendChild(profileIcon);

            const menuLogOutBtn = document.createElement('button');
            menuLogOutBtn.classList.add('menu-log-out-btn');
            nav.appendChild(menuLogOutBtn);

            menuLogOutBtn.addEventListener('click', () => {
                logOut();
            })
        }

}