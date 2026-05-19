import { loginContainer, loadingIndicator, titleContainer } from '../constants.js';
import { displayToast, navigateBack, isLoggedIn, getCurrentUser, getSessionToken, navigateTo } from '../utils.js';
import { loginUser } from '../api.js';

function displayLogin() {

    const loginCheck = isLoggedIn(getCurrentUser(), getSessionToken());
    if (loginCheck) {
            navigateBack();

        } else {
            const titleContainer = document.createElement('div');
            titleContainer.classList.add('title-container');
            loginContainer.appendChild(titleContainer)

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
            h1.textContent = 'LOG IN';
            titleMiddleContainer.appendChild(h1);

            const titleRightContainer = document.createElement('div');
            titleRightContainer.classList.add('title-right-container');
            titleContainer.appendChild(titleRightContainer);

            const formContainer = document.createElement('form');
            formContainer.classList.add('form-container', 'login-form-container');
            loginContainer.appendChild(formContainer);

            const form = document.createElement('form');
            form.classList.add('form-group');
            form.id = 'login-form';
            form.name = 'login-form';
            formContainer.appendChild(form)

            const emailLabel = document.createElement('label');
            emailLabel.htmlFor = 'email';
            emailLabel.textContent = 'Email (valid Noroff address)';
            form.appendChild(emailLabel);

            const emailInput = document.createElement('input');
            emailInput.id = 'email';
            emailInput.name = 'email';
            emailInput.type = 'email';
            emailInput.placeholder = 'example@stud.noroff.no';
            emailInput.required = true;
            form.appendChild(emailInput);

            const passwordLabel = document.createElement('label');
            passwordLabel.htmlFor = 'password';
            passwordLabel.textContent = 'Password';
            form.appendChild(passwordLabel);

            const passwordInput = document.createElement('input');
            passwordInput.id = 'password';
            passwordInput.name = 'password';
            passwordInput.type = 'password';
            passwordInput.placeholder = 'Enter your password';
            passwordInput.required = true;
            form.appendChild(passwordInput);

            const loginBtn = document.createElement('button');
            loginBtn.classList.add('add-to-cart-btn-medium');
            loginBtn.ariaLabel = 'Click to log in';
            loginBtn.textContent = 'LOG IN';
            form.appendChild(loginBtn);

            const registerLink = document.createElement('a');
            registerLink.classList.add('login-link');
            registerLink.ariaLabel = 'Click to go to registration page';
            registerLink.href = 'register.html'
            formContainer.appendChild(registerLink);

            const registerText = document.createElement('span');
            registerText.classList.add('login-text');
            registerText.ariaLabel = 'Click here to navigate to registration page';
            registerText.textContent = 'Need an an account? Click here to register';
            registerLink.appendChild(registerText);
        }
}

function validateEmail(email) {
    if (email.endsWith('@stud.noroff.no')) {
        return true;
    } else {
        displayToast('Error!', 'Invalid email address! Must be a valid @stud.noroff.no address. Please try again.', 'error');
        return false;
    }
}

function validatePassword(password) {
    if (password.length < 8) {
        displayToast('Error!', 'Password must be at least 8 characters long. Please try again.', 'error');
        return false;
    } else {
        return true;
    } 
}

async function loginMain() {
    displayLogin();

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        loadingIndicator.style.display = 'flex';

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData);

        if (!validateEmail(formData.get('email'))
            || (!validatePassword(formData.get('password')))) {
            return

        } else {
            const apiReq = await loginUser(formObject);
            if (apiReq) {
                displayToast('Success!', 'You have been logged in.', 'success');
                setTimeout(() => {
                    navigateTo('index.html');
                }, 2000);

            } else {
                return
            }
        }
    });
}

loginMain();