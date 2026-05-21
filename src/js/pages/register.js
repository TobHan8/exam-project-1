import { loadingIndicator, registerContainer } from '../constants.js';

import { registerUser } from '../api.js';

import { displayToast, isLoggedIn, getCurrentUser, getSessionToken, navigateBack, navigateTo } from '../utils.js';


function displayRegister() {

    const loginCheck = isLoggedIn(getCurrentUser(), getSessionToken());
    if (loginCheck) {
            displayToast('Error!', 'Log out to register a new account', 'error');
             setTimeout(() => {
                navigateTo('profile.html');
            }, 2000);


        } else {
    
            const titleContainer = document.createElement('div');
            titleContainer.classList.add('title-container');
            registerContainer.appendChild(titleContainer);

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

            const title = document.createElement('h1');
            title.id = 'title';
            title.textContent = 'REGISTER NEW ACCOUNT';
            titleMiddleContainer.appendChild(title);

            const titleRightContainer = document.createElement('div');
            titleRightContainer.classList.add('title-right-container');
            titleContainer.appendChild(titleRightContainer);

            const formContainer = document.createElement('div');
            formContainer.classList.add('form-container', 'register-form-container');
            registerContainer.appendChild(formContainer);

            const form = document.createElement('form');
            form.classList.add('form-group');
            form.id = 'register-form';
            form.name = 'register-form';
            formContainer.appendChild(form)

            const usernameLabel = document.createElement('label');
            usernameLabel.htmlFor = 'name';
            usernameLabel.textContent = 'Username';
            form.appendChild(usernameLabel);

            const usernameInput = document.createElement('input');
            usernameInput.id = 'name';
            usernameInput.name = 'name';
            usernameInput.type = 'text';
            usernameInput.placeholder = 'Select a username';
            usernameInput.maxLength = '20';
            usernameInput.pattern = '[\\w_]+';
            usernameInput.required = true;
            form.appendChild(usernameInput);

            const emailLabel = document.createElement('label');
            emailLabel.htmlFor = 'email';
            emailLabel.textContent = 'Email (valid Noroff address)';
            form.appendChild(emailLabel);

            const emailInput = document.createElement('input');
            emailInput.id = 'email';
            emailInput.name = 'email';
            emailInput.type = 'email';
            emailInput.placeholder = 'example.stud@noroff.no';
            emailInput.maxLength = '30';
            emailInput.pattern = '[\\w@.]+'
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
            passwordInput.placeholder = 'Choose a password';
            passwordInput.minLength = '8';
            passwordInput.required = true;
            form.appendChild(passwordInput);

            const password2Label = document.createElement('label');
            password2Label.htmlFor = 'password2';
            password2Label.textContent = 'Confirm password';
            form.appendChild(password2Label);

            const password2Input = document.createElement('input');
            password2Input.id = 'password2';
            password2Input.name = 'password2';
            password2Input.type = 'password';
            password2Input.placeholder = 'Repeat password';
            password2Input.minLength = '8';
            password2Input.required = true;
            form.appendChild(password2Input);

            const submitBtn = document.createElement('button');
            submitBtn.classList.add('add-to-cart-btn-medium');
            submitBtn.textContent = 'SUBMIT';
            form.appendChild(submitBtn);

            const logInLink = document.createElement('a');
            logInLink.classList.add('login-link');
            logInLink.ariaLabel = 'Click to go to log in page';
            logInLink.href = 'login.html'
            formContainer.appendChild(logInLink);

            const logInText = document.createElement('span');
            logInText.classList.add('login-text');
            logInText.ariaLabel = 'Click here to navigate to log in page'
            logInText.textContent = 'Already have an account? Click here to log in';
            logInLink.appendChild(logInText);

            usernameInput.addEventListener('input', () => {
                if (!usernameInput.checkValidity()) {
                    displayToast('Attention!', 'Username can only contain letters, numbers and underscores', 'error');
                }
            });

            emailInput.addEventListener('input', () => {
                if (!emailInput.checkValidity()) {
                    displayToast('Attention!', 'Email can only contain letters and numbers. Must end with @stud.noroff.no', 'error');
                }
            });
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

function validatePassword(password, password2) {
    if (password !== password2) {
        displayToast('Error!', 'Passwords do not match. Please try again.', 'error');
        return false;
    } else if (password.length < 8) {
        displayToast('Error!', 'Password must be at least 8 characters long. Please try again.', 'error');
        return false;
    } else {
        return true;
    } 
}

async function registerMain() {

    window.addEventListener('pageshow', (event) => {
        displayRegister();

        const registerForm = document.getElementById('register-form');

        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const formObject = Object.fromEntries(formData);

            if (!validatePassword(formData.get('password'), formData.get('password2')) 
                || (!validateEmail(formData.get('email')))) {
                return

            } else {
                
                const apiReq =  await registerUser(formObject);
        
                if (apiReq) {
                    displayToast('Success!', 'Account registered! Please log in to your new account', 'success');
                    setTimeout(() => {
                        navigateTo('login.html');
                    }, 2000);

                } else {
                    return
                }
            }
        });
    });
}

registerMain();

