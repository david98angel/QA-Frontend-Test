import { LaunchOptions } from '@playwright/test';

/**
 * Opciones de lanzamiento del navegador reutilizadas por el World de Cucumber.
 * El modo headless se controla mediante la variable de entorno HEADLESS.
 */
export const browserOptions: LaunchOptions = {
  headless: process.env.HEADLESS !== 'false',
  slowMo: process.env.SLOWMO ? Number(process.env.SLOWMO) : 0,
};

export const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';

export const DEFAULT_TIMEOUT = 30_000;
