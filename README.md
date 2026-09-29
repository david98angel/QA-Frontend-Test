# QA-Frontend-Test — Sauce Demo (Playwright + Cucumber + TypeScript)

Suite de pruebas automatizadas **end-to-end** para la aplicación web
[Sauce Demo](https://www.saucedemo.com/), construida con **Playwright** y
**Cucumber (BDD/Gherkin)** en **TypeScript**, aplicando el patrón de diseño
**Page Object Model (POM)**.

---

## Stack tecnológico

| Herramienta | Uso |
|-------------|-----|
| **TypeScript** | Lenguaje principal, tipado estático |
| **Playwright** | Automatización del navegador |
| **Cucumber.js** | Framework BDD (features en Gherkin) |
| **ts-node** | Ejecución de TypeScript sin build previo |
| **cucumber-html-reporter** | Reporte HTML de resultados |

---

## Estructura del proyecto

```
QA-Frontend-Test/
├── src/
│   ├── data/
│   │   └── users.ts              # Credenciales centralizadas
│   ├── features/                 # Escenarios en Gherkin (.feature)
│   │   ├── login.feature
│   │   ├── cart.feature
│   │   └── checkout.feature
│   ├── pages/                    # Page Object Model
│   │   ├── BasePage.ts           # Utilidades comunes (clase base)
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── steps/                    # Step definitions
│   │   ├── login.steps.ts
│   │   ├── cart.steps.ts
│   │   └── checkout.steps.ts
│   └── support/
│       ├── world.ts              # Custom World (contexto compartido)
│       └── hooks.ts              # Before/After: setup y teardown
├── scripts/
│   └── generate-report.js        # Generación del reporte HTML
├── reports/                      # Salida de reportes (JSON + HTML)
├── cucumber.js                   # Configuración de Cucumber
├── playwright.config.ts          # Opciones del navegador / URL base
├── tsconfig.json
├── package.json
├── ESTRATEGIA.md                 # Informe de estrategia y patrones
└── README.md
```

---

## Requisitos previos

- **Node.js** >= 18 (probado con Node 24)
- **npm** >= 9

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd QA-Frontend-Test

# 2. Instalar dependencias (descarga Chromium automáticamente)
npm install
```

> **Nota:** si la descarga del navegador falla por un
> error de certificado (`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`), ejecuta:
>
> ```bash
> NODE_TLS_REJECT_UNAUTHORIZED=0 npx playwright install chromium
> ```

---

## Ejecución de las pruebas

```bash
# Ejecutar toda la suite
npm test

# Ejecutar por funcionalidad (tags)
npm run test:login       # solo login
npm run test:cart        # solo carrito
npm run test:checkout    # solo checkout

# Ejecutar en modo visible (con navegador)
npm run test:headed
```

### Filtrar por tags de Cucumber

```bash
npx cucumber-js --tags @smoke
npx cucumber-js --tags "@e2e and not @negativo"
```

### Variables de entorno soportadas

| Variable | Valores | Descripción |
|----------|---------|-------------|
| `HEADLESS` | `true` (def.) / `false` | Ejecuta con o sin interfaz gráfica |
| `SLOWMO` | milisegundos | Ralentiza las acciones (debug) |
| `BASE_URL` | URL | Sobrescribe la URL de la aplicación |
| `SCREENSHOT_EACH_STEP` | `true` (def.) / `false` | Captura de pantalla tras **cada paso** |

Ejemplo:

```bash
HEADLESS=false SLOWMO=300 npm test
```

---

## Reporte de resultados

Tras ejecutar `npm test`, genera el reporte HTML:

```bash
npm run report
```

Se creará `reports/cucumber-report.html`. Ábrelo en el navegador para ver
el detalle de escenarios, pasos y las **capturas de pantalla de cada paso**
(tanto en escenarios exitosos como fallidos).

### Capturas por paso

Por defecto se toma una captura **después de cada paso** de todos los
escenarios. Se guardan en disco organizadas por escenario:

```
reports/screenshots/<nombre-del-escenario>/step-01-passed.png
```

y además quedan **embebidas en el reporte HTML**. Para desactivarlas:

```bash
SCREENSHOT_EACH_STEP=false npm test
```

---

## Cobertura de escenarios

Basado en los criterios de aceptación del reto:

| # | Criterio de aceptación | Feature |
|---|------------------------|---------|
| 1 | Login con credenciales **válidas** | `login.feature` |
| 2 | Login con credenciales **inválidas** / usuario bloqueado | `login.feature` |
| 3 | Agregar un producto al carrito | `cart.feature` |
| 4 | Ver los productos en el carrito | `cart.feature` |
| 5 | Completar la compra hasta la **confirmación** | `checkout.feature` |

Escenarios adicionales incluidos: múltiples productos, eliminación de
productos del carrito y validaciones negativas del formulario de checkout.

Usuarios cubiertos: `standard_user` y `locked_out_user` (además de casos de
credenciales inválidas).
