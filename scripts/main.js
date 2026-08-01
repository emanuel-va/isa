// main.js

import { AtmosphericValues } from './atmosphere.js';

// selecting body and theme elements
const body = document.querySelector('body'); // body
const switchThemeButton = document.querySelector('#switch-theme-button'); // switch theme button
const logo = document.querySelector('#logo'); // logo img
const themeIcon = document.querySelector('#theme-icon'); // theme icon img

// selectiong input section elements
const input = document.querySelector('#input'); // input
const calculateButton = document.querySelector('#calculate-button'); // calculate button
const error = document.querySelector('.message'); // error box

// selecting output section elements
const outputBox = document.querySelector('.output'); // output inputs box
const outputs = outputBox.getElementsByTagName('input'); // output inputs

const switchTheme = function() { // when user clicks 'shitch theme'
    let bodyClass = body.className;
    if (bodyClass === 'light') {
        body.classList.replace(bodyClass, 'dark');
        logo.setAttribute('src', 'assets/img/logos/dark.png');
        themeIcon.setAttribute('src', 'assets/img/icons/light.png');
    }
    if (bodyClass === 'dark') {
        body.classList.replace(bodyClass, 'light');
        logo.setAttribute('src', 'assets/img/logos/light.png');
        themeIcon.setAttribute('src', 'assets/img/icons/dark.png');
    }
}

const calculate = function() { // when user clicks 'calculate'
    let z = Number(input.value);
    const isa = new AtmosphericValues(z);
    if (isa.isZValid) { // validating if typed altitude is valid
        let values = [isa.gravity(), isa.temperature(), isa.pressure(), isa.density(), isa.speedOfSound(), isa.viscosity()];
        let formatedValues = [];
        for (let i = 0; i < outputs.length; i++) {
            formatedValues.push(Number(values[i].toFixed(8)));
            outputs[i].value = formatedValues[i];
        }
        error.classList.remove('message--error');
        error.classList.add('message--done');
        error.textContent = isa.message;
    } else {
        for (let i = 0; i < outputs.length; i++) {
            outputs[i].value = '';
        }
        error.classList.remove('message--done');
        error.classList.add('message--error');
        error.textContent = isa.message;
    }
}

switchThemeButton.addEventListener('click', switchTheme);
calculateButton.addEventListener('click', calculate);