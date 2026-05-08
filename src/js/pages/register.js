import { registerContainer } from '../constants.js';


function displayRegister() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    registerContainer.appendChild(formContainer);

    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');
    formContainer.appendChild(formGroup)

    const usernameLabel = document.createElement('label');
    usernameLabel.htmlFor = 'username';
    usernameLabel.textContent = 'Username';
    formGroup.appendChild(usernameLabel);

    const usernameInput = document.createElement('input');
    usernameInput.id = 'username';
    usernameInput.name = 'username';
    usernameInput.placeholder = 'Select a username';
    formGroup.appendChild(usernameInput);

    const emailLabel = document.createElement('label');
    emailLabel.htmlFor = 'email';
    emailLabel.textContent = 'Email';
    formGroup.appendChild(emailLabel);

    const emailInput = document.createElement('input');
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.type = 'email';
    emailInput.placeholder = 'example@email.com';
    formGroup.appendChild(emailInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.htmlFor = 'password';
    passwordLabel.textContent = 'Password';
    formGroup.appendChild(passwordLabel);

    const passwordInput = document.createElement('input');
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Choose a password';
    formGroup.appendChild(passwordInput);

    const password2Label = document.createElement('label');
    password2Label.htmlFor = 'password2';
    password2Label.textContent = 'Confirm password';
    formGroup.appendChild(password2Label);

    const password2Input = document.createElement('input');
    password2Input.id = 'password2';
    password2Input.name = 'password2';
    password2Input.type = 'password';
    password2Input.placeholder = 'Repeat password';
    formGroup.appendChild(password2Input);

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('add-to-cart-btn');
    submitBtn.textContent = 'SUBMIT';
    formGroup.appendChild(submitBtn);

    const logInLink = document.createElement('a');
    logInLink.classList.add('login-link');
    logInLink.href = 'login.html'
    formContainer.appendChild(logInLink);

    const logInText = document.createElement('span');
    logInText.classList.add('login-text');
    logInText.textContent = 'Already have an account? Click here to log in';
    logInLink.appendChild(logInText);

}

displayRegister();

