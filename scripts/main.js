// main.js

import { AtmosphericValues } from './atmosphere.js';

const isa = new AtmosphericValues(86001);
console.log(isa.gravity());
console.log(isa.temperature());
console.log(isa.pressure());
console.log(isa.density());
console.log(isa.speedOfSound());
console.log(isa.dynamicViscosity());