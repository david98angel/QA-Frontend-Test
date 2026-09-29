# Informe de Estrategia de Automatización

**Proyecto:** Suite E2E — Sauce Demo
**Stack:** Playwright + Cucumber + TypeScript
**Patrón principal:** Page Object Model (POM)

---

## 1. Objetivo de la estrategia

Diseñar una suite de pruebas automatizadas **mantenible, legible y escalable**
que valide los flujos críticos de negocio de Sauce Demo (login, carrito y
checkout), siguiendo un enfoque **BDD (Behavior-Driven Development)** para que
los escenarios sean comprensibles tanto por perfiles técnicos como de negocio.

---

## 2. Enfoque BDD con Cucumber + Gherkin

Los requisitos se expresan como **features en Gherkin** (en español, usando
`# language: es`), lo que aporta:

- **Trazabilidad directa** entre los criterios de aceptación del reto y los
  escenarios automatizados.
- **Documentación viva**: las features describen el comportamiento esperado
  en lenguaje natural.
- **Reutilización de pasos** entre escenarios (steps compartidos).

Se emplean estructuras avanzadas de Gherkin:
- `Antecedentes` (Background) para pre-condiciones comunes.
- `Esquema del escenario` (Scenario Outline) + `Ejemplos` para pruebas
  **data-driven** (login inválido y checkout incompleto).
- **Tags** (`@login`, `@cart`, `@checkout`, `@smoke`, `@e2e`, `@negativo`)
  para ejecución selectiva.

---

## 3. Patrones de diseño aplicados

### 3.1. Page Object Model (POM) — patrón principal
Cada página de la aplicación se modela como una clase que encapsula sus
**selectores** y **acciones**. Los tests interactúan con métodos de negocio
(`login()`, `addProductToCart()`, `finishPurchase()`) y nunca con selectores
crudos.

**Beneficio:** si cambia la UI, solo se modifica el Page Object
correspondiente, no los escenarios ni los steps.

### 3.2. Herencia — `BasePage`
Todas las páginas heredan de `BasePage`, que centraliza utilidades comunes
(navegación, click, escritura, aserciones de visibilidad). Evita duplicación
y homogeneiza las interacciones.

### 3.3. Custom World (patrón de contexto compartido)
`CustomWorld` extiende el World de Cucumber y actúa como **contenedor de
estado** por escenario: mantiene `browser`, `context`, `page` y expone los
Page Objects mediante **inicialización perezosa** (lazy getters). Garantiza
aislamiento entre escenarios y mantiene los step definitions delgados.

### 3.4. Hooks (setup/teardown)
`hooks.ts` gestiona el ciclo de vida:
- `BeforeAll`: lanza un único navegador (rendimiento).
- `Before`: crea un `context` y `page` nuevos por escenario (aislamiento).
- `After`: adjunta **captura de pantalla automática** ante fallos y cierra
  recursos.
- `AfterAll`: cierra el navegador.

### 3.5. Data-Driven / Repositorio de datos
Las credenciales se centralizan en `src/data/users.ts`, eliminando
"magic strings" y facilitando añadir nuevos tipos de usuario.

---

## 4. Estrategia de selectores

Se priorizan los atributos **`data-test`** que expone Sauce Demo
(p. ej. `[data-test="username"]`, `[data-test="checkout"]`), la práctica
recomendada por ser estables frente a cambios de estilo o estructura del DOM.
Para productos dinámicos se genera el selector a partir del nombre del
producto mediante una función *slug*.

---

## 5. Aislamiento y estabilidad

- **Contexto de navegador nuevo por escenario** → sin fugas de sesión/cookies.
- Uso de **auto-waiting** nativo de Playwright (espera automática por
  visibilidad/accionabilidad) → menos flakiness, sin `sleep` arbitrarios.
- Aserciones con `expect` de Playwright (con reintentos internos).

---

## 6. Reportería

- Salida **JSON** de Cucumber (`reports/cucumber-report.json`).
- Reporte **HTML** navegable generado con `cucumber-html-reporter`
  (`npm run report`), incluyendo metadatos del entorno y capturas de fallos.

---

## 7. Cobertura funcional

| Criterio de aceptación | Estado |
|------------------------|--------|
| Login válido (`standard_user`) | Ok |
| Login inválido / `locked_out_user` | Ok |
| Agregar producto al carrito | Ok |
| Ver productos en el carrito | Ok |
| Completar compra hasta confirmación | Ok |

**Escenarios adicionales:** múltiples productos, eliminación del carrito y
validaciones negativas de formulario de checkout (data-driven).

**Resultado de ejecución:** 15 escenarios / 85 pasos — 100% en verde.

