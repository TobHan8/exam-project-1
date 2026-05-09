import { loginContainer } from '../constants.js';
import { displayToast } from '../utils.js';

function displayLogin() {
    const loginContainer = document.getElementById('login-container');

    const formContainer = document.createElement('form');
    formContainer.classList.add('form-container');
    loginContainer.appendChild(formContainer);

    const form = document.createElement('div');
    formGroup.classList.add('form');
    form.id = 'register-form';
    formContainer.appendChild(form)

    const emailLabel = document.createElement('label');
    emailLabel.htmlFor = 'email';
    emailLabel.textContent = 'Email';
    form.appendChild(emailLabel);

    const emailInput = document.createElement('input');
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.type = 'email';
    emailInput.placeholder = 'example@email.com';
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
    form.appendChild(passwordInput);

    const loginBtn = document.createElement('button');
    loginBtn.classList.add('add-to-cart-btn');
    loginBtn.textContent = 'SUBMIT';
    form.appendChild(loginBtn);

    const registerLink = document.createElement('a');
    registerLink.classList.add('login-link');
    registerLink.href = 'register.html'
    formContainer.appendChild(registerLink);

    const registerText = document.createElement('span');
    registerText.classList.add('login-text');
    registerText.textContent = 'Need an an account? Click here to register';
    registerLink.appendChild(registerText);

}

displayLogin();
