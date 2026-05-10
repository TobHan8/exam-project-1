import { loginContainer } from '../constants.js';
import { displayToast } from '../utils.js';
import { loginUser } from '../api.js';

function displayLogin() {
    const loginContainer = document.getElementById('login-container');

    const formContainer = document.createElement('form');
    formContainer.classList.add('form-container');
    loginContainer.appendChild(formContainer);

    const form = document.createElement('form');
    form.classList.add('form-group');
    form.id = 'login-form';
    formContainer.appendChild(form)

    const emailLabel = document.createElement('label');
    emailLabel.htmlFor = 'email';
    emailLabel.textContent = 'Email';
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
    loginBtn.classList.add('add-to-cart-btn');
    loginBtn.textContent = 'LOG IN';
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

async function loginMain() {
    displayLogin();

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData);

        loginUser(formObject);

        displayToast('Success!', 'You have been logged in.', 'success');

    });

}

loginMain();