import { profileContainer, loadingIndicator, footer } from '../constants.js';

import { navigateBack, isLoggedIn, getCurrentUser, getSessionToken, displayToast, logOut, navigateTo } from '../utils.js';

function displayProfile() {

    const loginCheck = isLoggedIn(getCurrentUser(), getSessionToken());

    if(!loginCheck) {
        displayToast('Must be logged in!', 'Please log in to continue to view this page', 'error');
        loadingIndicator.style.display = 'none';
        profileContainer.style.display = 'none';
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
        footer.style.width = '100%';
        setTimeout(() => {
            navigateTo('login.html');
        }, 2000);

    } else {
        const currentUser = getCurrentUser();
        const currentUserName = currentUser.name;
        const currentEmail = currentUser.email;

        loadingIndicator.style.display = 'none';

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        profileContainer.appendChild(titleContainer);

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
        h1.textContent = 'PROFILE';
        titleMiddleContainer.appendChild(h1);
    
        const titleRightContainer = document.createElement('div');
        titleRightContainer.classList.add('title-right-container');
        titleContainer.appendChild(titleRightContainer);

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('profile-content-container');
        profileContainer.appendChild(contentContainer);

        const profileIcon = document.createElement('i');
        profileIcon.classList.add('fa-regular', 'fa-circle-user');
        contentContainer.appendChild(profileIcon);

        const textContainer1 = document.createElement('div');
        textContainer1.classList.add('profile-text-container');
        contentContainer.appendChild(textContainer1);

        const titleSpan1 = document.createElement('span');
        titleSpan1.classList.add('profile-title-span');
        titleSpan1.textContent = 'USERNAME';
        textContainer1.appendChild(titleSpan1);

        const userName = document.createElement('span');
        userName.classList.add('profile-span');
        userName.textContent = `${currentUserName}`;
        textContainer1.appendChild(userName);

        const textContainer2 = document.createElement('div');
        textContainer2.classList.add('profile-text-container');
        contentContainer.appendChild(textContainer2);

        const titleSpan2 = document.createElement('span');
        titleSpan2.classList.add('profile-title-span');
        titleSpan2.textContent = 'EMAIL';
        textContainer2.appendChild(titleSpan2);

        const email = document.createElement('span');
        email.classList.add('profile-span');
        email.textContent = `${currentEmail}`;
        textContainer2.appendChild(email);

        const logOutBtn = document.createElement('button');
        logOutBtn.classList.add('profile-log-out-btn');
        logOutBtn.ariaLabel = 'Click to log out';
        logOutBtn.textContent = 'LOG OUT';
        contentContainer.appendChild(logOutBtn);

        logOutBtn.addEventListener('click', () => {
            logOut();
        });
    }
}


function profileMain() {
    window.addEventListener('pageshow', (event) => {
        displayProfile();
    });
}

profileMain();