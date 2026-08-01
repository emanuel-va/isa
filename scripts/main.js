// main.js

import { AtmosphericValues } from './atmosphere.js';

let input = document.querySelector('#input');
let button = document.querySelector('#calculate');
let outputBox = document.querySelector('.output');
let outputs = outputBox.getElementsByTagName('input');

const calculate = function() {
    let z = Number(input.value);
    const isa = new AtmosphericValues(z);
    let values = [isa.gravity(), isa.temperature(), isa.pressure(), isa.density(), isa.speedOfSound(), isa.dynamicViscosity()];

    let formatedValues = [];
    for (let i = 0; i < values.length; i++) {
        formatedValues.push(Number(values[i].toFixed(8)));
        outputs[i].value = formatedValues[i];
    }
}

button.addEventListener('click', calculate);