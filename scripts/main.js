// main.js

import { AtmosphericValues } from './atmosphere.js';

// selecting body and theme elements
const body = document.querySelector('body'); // body
const switchThemeButton = document.querySelector('#switch-theme-button'); // switch theme button
const themeIcon = document.querySelector('#switch-theme-icon'); // theme icon svg

// selectiong input section elements
const input = document.querySelector('#input'); // input
const calculateButton = document.querySelector('#calculate-button'); // calculate button
const alert = document.querySelector('.alert'); // alert box

// selecting output section elements
const outputBox = document.querySelector('.output'); // output inputs box
const outputs = outputBox.getElementsByTagName('input'); // output inputs

const switchTheme = function() { // when user clicks 'shitch theme'
    let bodyClass = body.className;
    if (bodyClass === 'light') {
        body.classList.replace(bodyClass, 'dark'); // switching mode
        themeIcon.innerHTML = '<path d="M338.5-338.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM451.5-771.5Q440-783 440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760q-17 0-28.5-11.5Zm0 720Q440-63 440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40q-17 0-28.5-11.5ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Z"/>' // switching icon vector
    }
    if (bodyClass === 'dark') {
        body.classList.replace(bodyClass, 'light'); // switching mode
        themeIcon.innerHTML = '<path d="M480-120q-151 0-255.5-104.5T120-480q0-138 90-239.5T440-838q13-2 23 3.5t16 14.5q6 9 6.5 21t-7.5 23q-17 26-25.5 55t-8.5 61q0 90 63 153t153 63q31 0 61.5-9t54.5-25q11-7 22.5-6.5T819-479q10 5 15.5 15t3.5 24q-14 138-117.5 229T480-120Z"/>' // switching icon vector
    }
}

const calculate = function() { // when user clicks 'calculate'
    let z = Number(input.value);
    const isa = new AtmosphericValues(z);
    if (isa.isZValid) { // validating if typed altitude is valid
        let values = [isa.gravity(), isa.temperature(), isa.pressure(), isa.density(), isa.speedOfSound(), isa.viscosity()];
        let formatedValues = [];
        for (let i = 0; i < outputs.length; i++) {
            formatedValues.push(Number(values[i].toFixed(8))); // formating values to 8 decimals only
            outputs[i].value = formatedValues[i];
        }
        // replacing classes
        alert.classList.remove('alert--error')
        alert.classList.add('alert--done');
        alert.textContent = isa.alert; // adding alert label
    } else {
        for (let i = 0; i < outputs.length; i++) {
            outputs[i].value = '';
        }
        // replacing classes
        alert.classList.remove('alert--done');
        alert.classList.add('alert--error');
        alert.textContent = isa.alert; // adding alert label
    }
}

// adding events to buttons
switchThemeButton.addEventListener('click', switchTheme);
calculateButton.addEventListener('click', calculate);