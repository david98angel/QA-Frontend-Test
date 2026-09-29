import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../../playwright.config';

/**
 * Clase base del patrón Page Object Model.
 * Agrupa utilidades comunes de navegación e interacción para
 * que las páginas hijas se centren solo en su lógica específica.
 */
export abstract class BasePage {
  protected readonly baseUrl = BASE_URL;

  constructor(protected readonly page: Page) {}

  /** Navega a una ruta relativa respecto de la URL base. */
  async navigate(path = '/'): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async type(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async currentUrl(): Promise<string> {
    return this.page.url();
  }
}
