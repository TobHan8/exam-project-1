import { registerContainer } from '../constants.js';

import { registerUser } from '../api.js';

import { displayToast } from '../utils.js';


function displayRegister() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    registerContainer.appendChild(formContainer);

    const form = document.createElement('form');
    form.classList.add('form-group');
    form.id = 'register-form';
    formContainer.appendChild(form)

    const usernameLabel = document.createElement('label');
    usernameLabel.htmlFor = 'username';
    usernameLabel.textContent = 'Username';
    form.appendChild(usernameLabel);

    const usernameInput = document.createElement('input');
    usernameInput.id = 'name';
    usernameInput.name = 'name';
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Select a username';
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

    const password2Label = document.createElement('label');
    password2Label.htmlFor = 'password2';
    password2Label.textContent = 'Confirm password';
    form.appendChild(password2Label);

    const password2Input = document.createElement('input');
    password2Input.id = 'password2';
    password2Input.name = 'password2';
    password2Input.type = 'password';
    password2Input.placeholder = 'Repeat password';
    form.appendChild(password2Input);

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('add-to-cart-btn');
    submitBtn.textContent = 'SUBMIT';
    form.appendChild(submitBtn);

    const logInLink = document.createElement('a');
    logInLink.classList.add('login-link');
    logInLink.href = 'login.html'
    formContainer.appendChild(logInLink);

    const logInText = document.createElement('span');
    logInText.classList.add('login-text');
    logInText.textContent = 'Already have an account? Click here to log in';
    logInLink.appendChild(logInText);

}

function validateUsername(name) {
    if (name.length > 20 ) {
        displayToast('Error!', 'Username must be 20 characters or below. Please try again', 'error');
        return false;
    } else {
        return true;
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
    displayRegister();

    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData);

        if (!validatePassword(formData.get('password'), formData.get('password2')) 
            || (!validateEmail(formData.get('email'))) 
            || (!validateUsername(formData.get('name')))) {
            return
        } else {
            registerUser(formObject);
            displayToast('Success!', 'Account registered! Please log in to your new account', 'success');

        }
    });
}

registerMain();

