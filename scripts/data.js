// data.js

export const constants = {
    G0: 9.80665,
    T0: 288.15,
    P0: 1.01325e5,
    R0: 6.356766e6,
    M0: 28.9644,
    R: 8.31432e3,
    GAMMA: 1.4,
    BETA: 1.458e-6,
    S: 110,
    HMAX: 86e3
};
export const layers = [
    {HB: 0, LB: -6.5e-3},
    {HB: 11e3, LB: 0},
    {HB: 20e3, LB: 1e-3},
    {HB: 32e3, LB: 2.8e-3},
    {HB: 47e3, LB: 0},
    {HB: 51e3, LB: -2.8e-3},
    {HB: 71e3, LB: -2e-3},
    {HB: 84.852e3}
];