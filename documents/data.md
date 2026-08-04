# Data

This section contains the data required by the atmospheric model.

## Inputs & Outputs

### Inputs:

| Symbol | Units | Description |
|:-------|:------|:------------|
| $Z$ | $m$ | Geometric altitude |

### Outputs:

| Symbol | Units | Description |
|:-------|:------|:------------|
| $g$ | $m/s^2$ | Gravitational acceleration as a function of geometric altitude |
| $T_M$ | $K$ | Molecular-scale temperature as a function of geopotential altitude |
| $P$ | $Pa$ | Pressure as a function of geopotential altitude |
| $\rho$ | $kg/m^3$ | Mass density as a function of geopotential altitude |
| $C_s$ | $m/s$ | Speed of sound as a function of geopotential altitude |
| $\mu$ | $Pa \cdot s$ | Dynamic viscosity as a function of geopotential altitude |

## Constants & Equations

### Constants:

| Symbol | Value | Units | Description |
|:-------|:------|:------|:------------|
| $H$ | | $m$ | Geopotential altitude |
| $Z$ | | $m$ | Geometric altitude |
| $g_0$ | $9.80665$ | $m/s^2$ | Sea-level gravitational acceleration |
| $g_0'$ | $9.80665$ | $m^2/(s^2 \cdot m')$ | Standard gravitational acceleration for geopotential altitude |
| $T_0$ | $288.15$ | $K$ | Sea-level molecular-scale temperature |
| $P_0$ | $1.01325 \times 10^5$ | $Pa$ | Sea-level pressure |
| $r_0$ | $6.356766 \times 10^6$ | $m$ | Effective earth radius |
| $M_0$ |  $28.9644$ | $kg/kmol$ | Mean molecular weight of air |
| $R^*$ |  $8.31432 \times 10^3$ | $J/(kmol \cdot K)$ | Universal gas constant |
| $\gamma$ | $1.4$ | | Ratio of specific heat of air at constant pressure to that at constant volume |
| $\beta$ | $1.458 \times 10^{-6}$ | $kg/(s \cdot m \cdot K^{1/2})$ | Sutherland coefficient |
| $S$ | $110$ | $K$ | Sutherland constant |

### $H_b$ and $L_{M,b}$ values:

Note: For unit consistency, convert altitude from $km$ to $m$ and molecular-scale temperature gradient from $K/km$ to $K/m$ before applying the equations.

| Subscript | Geopotential height $(H_b \quad [km])$ | Molecular-scale temperature gradient $(L_{M,b} \quad [K/km])$|
|:----------|:---------------------------------------|:-------------------------------------------------------------|
| $0$ | $0$ | $-6.5$ |
| $1$ | $11$ | $0$ |
| $2$ | $20$ | $+1$ |
| $3$ | $32$ | $+2.8$ |
| $4$ | $47$ | $0$ |
| $5$ | $51$ | $-2.8$ |
| $6$ | $71$ | $-2$ |
| $7$ | $84.852$ | |

### Equations:

Note: All calculations are performed using SI units.

- **Geopotential altitude** as a function of geometric altitude. This conversion allows the use of a standard gravitational acceleration:

$$
H = \frac {r_0 \cdot Z} {r_0 + Z} \qquad (1)
$$

- **Gravitational acceleration** as a function of geometric altitude:

$$
g = g_0 \cdot \left(\frac {r_0} {r_0 + Z} \right)^2 \qquad (2)
$$

- **Molecular-scale temperature** as a function of geopotential altitude:

$$
T_M = T_{M,b} + L_{M,b} \cdot (H - H_b) \qquad (3)
$$

- **Pressure** as a function of geopotential altitude when $L_{M,b} \neq 0$ (gradient layer):

$$
P = P_b \cdot \left[\frac {T_{M,b}} {T_{M,b} + L_{M,b} \cdot (H - H_b)} \right]^{\left[\frac {g_0' \cdot M_0} {R^* \cdot L_{M,b}} \right]} \qquad (4a)
$$

- **Pressure** as a function of geopotential altitude when $L_{M,b} = 0$ (isothermal layer):

$$
P = P_b \cdot \exp \left[\frac {-g_0' \cdot M_0 \cdot (H - H_b)} {R^* \cdot T_{M,b}} \right] \qquad (4b)
$$

- **Mass density** as a function of geopotential altitude:

$$
\rho = \frac {P \cdot M_0} {R^* \cdot T_M} \qquad (5)
$$

- **Speed of Sound** as a function of geopotential altitude:

$$
C_s = \left(\frac {\gamma \cdot R^* \cdot T_M} {M_0} \right)^{1/2} \qquad (6)
$$

- **Dynamic viscosity** as a function of geopotential altitude:

$$
\mu = \frac {\beta \cdot T_M^{3/2}} {T_M + S} \qquad (7)
$$