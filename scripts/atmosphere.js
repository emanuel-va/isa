// atmosphere.js

import { constants, layers } from './data.js';

// ----- values functions -----
const geopotentialAltitude = z => (constants.R0 * z) / (constants.R0 + z) // converting geometrical into geopotential altitude
const temp = (tb, lb, h, hb) => tb + lb * (h - hb); // calculating molecular-scale temperature as a function of geopotential altitude
const pres = (pb, tb, lb, h, hb) => { // calculating pressure as a function of geopotential altitude
    if (lb !== 0) {
        return pb * (tb / (tb + lb * (h - hb)))**((constants.G0 * constants.M0) / (constants.R * lb));
    } else {
        return pb * Math.exp((-constants.G0 * constants.M0 * (h - hb)) / (constants.R * tb));
    }
}

// ----- calculating base altitudes temperatures and heights -----
let tb = constants.T0; // sea-level temperature
let pb = constants.P0; // sea-level pressure

for (let i = 0; i < layers.length - 1; i++) {
    let ht = layers[i + 1].HB; // layer top altitude
    let hb = layers[i].HB; // layer base altitude
    let lb = layers[i].LB; // layer base gradient

    let tt = temp(tb, lb, ht, hb); // calculating layer top temperature
    let pt = pres(pb, tb, lb, ht, hb); // calculating layer top pressure

    tb = tt // updating layer base temperature for next loop lap
    pb = pt // updating layer base pressure for next loop lap

    layers[i + 1].TB = tb; // adding layer base temperatures to layer array objects
    layers[i + 1].PB = pb; // adding layer base pressures to layer array objects
}

// ----- calculator class -----
export class AtmosphericValues {
    constructor(z) {
        this.z = z;
        this.isZValid;
        this.alert;

        if (this.z >= constants.ZMIN && this.z <= constants.ZMAX) { // adding calculator altitude range from 0 to 86 km
            this.h = this.z === constants.ZMAX ? Math.floor(geopotentialAltitude(this.z)) : geopotentialAltitude(this.z);
            this.hb, this.lb, this.tb, this.pb; // variables as a function of altitude
            for (let i = 0; i < layers.length; i++) {
                let currentLayer = layers[i];
                let nextLayer = layers[i + 1];
                if (this.h >= currentLayer.HB && (nextLayer === undefined || this.h < nextLayer.HB)) { // select layers from geopotential altitude 0 to 84.852 km
                    this.hb = currentLayer.HB;
                    this.lb = currentLayer.LB ?? layers[i - 1].LB;
                    this.tb = currentLayer.TB ?? constants.T0;
                    this.pb = currentLayer.PB ?? constants.P0;
                }
            }
            this.alert = 'Done!';
            this.isZValid = true;
        } else {
            this.isZValid = false;
            this.alert = `Altitude must be a value between ${constants.ZMIN} and ${constants.ZMAX.toLocaleString('en-us')} m.`
        }
        // defining temperature & pressure as functions of geometrical altitude
        this.t = temp(this.tb, this.lb, this.h, this.hb);
        this.p = pres(this.pb, this.tb, this.lb, this.h, this.hb);
    }

    // ----- methods -----
    gravity() {
        return constants.G0 * (constants.R0 / (constants.R0 + this.z))**2 // calculating gravitational acceleration as a function of geometrical altitude
    }
    temperature() {
        return this.t;
    }
    pressure() {
        return this.p;
    }
    density() {
        return (this.p * constants.M0) / (constants.R * this.t); // calculating mass density as a function of geopotential altitude
    }
    speedOfSound() {
        return ((constants.GAMMA * constants.R * this.t) / constants.M0)**(1/2); // calculating speed of sound as a function of geopotential altitude
    }
    viscosity() {
        return (constants.BETA * this.t**(3/2)) / (this.t + constants.S); // calculating dynamic viscosity as a function of geopotential altitude
    }
}