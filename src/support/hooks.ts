import {
  Before,
  After,
  AfterStep,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
  ITestCaseHookParameter,
  ITestStepHookParameter,
} from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { CustomWorld } from './world';
import { browserOptions, DEFAULT_TIMEOUT } from '../../playwright.config';

setDefaultTimeout(DEFAULT_TIMEOUT);

let browser: Browser;

/** Directorio raíz donde se guardan las capturas en disco. */
const SCREENSHOTS_DIR = path.join(process.cwd(), 'reports', 'screenshots');

/** Convierte un texto libre en un nombre de archivo/carpeta seguro. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Lanza un único navegador para toda la ejecución (más rápido). */
BeforeAll(async function () {
  browser = await chromium.launch(browserOptions);
});

/** Contexto y página nuevos por escenario => aislamiento total. */
Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  this.browser = browser;
  this.context = await browser.newContext();
  this.page = await this.context.newPage();

  // Prepara metadatos y carpeta de capturas para este escenario.
  this.scenarioName = scenario.pickle.name;
  this.stepCounter = 0;
});

/**
 * Captura de pantalla después de CADA paso (éxito o fallo).
 * Se adjunta al reporte HTML y se guarda en disco por escenario.
 * Puede desactivarse con SCREENSHOT_EACH_STEP=false.
 */
AfterStep(async function (this: CustomWorld, step: ITestStepHookParameter) {
  if (process.env.SCREENSHOT_EACH_STEP === 'false' || !this.page) {
    return;
  }

  this.stepCounter += 1;
  const screenshot = await this.page.screenshot({ fullPage: true });

  // Adjuntar al reporte (visible en el HTML).
  const status = step.result?.status ?? Status.UNKNOWN;
  this.attach(screenshot, 'image/png');

  // Guardar también en disco, organizado por escenario.
  const scenarioDir = path.join(SCREENSHOTS_DIR, slugify(this.scenarioName));
  fs.mkdirSync(scenarioDir, { recursive: true });
  const fileName = `step-${String(this.stepCounter).padStart(2, '0')}-${status.toLowerCase()}.png`;
  fs.writeFileSync(path.join(scenarioDir, fileName), screenshot);
});

/** Cierre de recursos al terminar cada escenario. */
After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
