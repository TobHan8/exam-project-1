import { registerContainer } from "../constants";

import { addToCart } from "../utils";


displayRegister() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('register-form-container');
    registerContainer.appendChild(formContainer);

    const label = document.createElement('label');
    label.for = 'username'
    label.classList.add('form-label');
    formContainer.appendChild(label);

    const input = document.createElement('input');
    input.id = 'username';
    input.name = 'username';
    formContainer.appendChild(input);

    const label = document.createElement('label');
    label.for = 'username'
    label.classList.add('form-label');
    formContainer.appendChild(label);
};