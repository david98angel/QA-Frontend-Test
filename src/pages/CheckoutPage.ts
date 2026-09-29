import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object que cubre las tres fases del checkout de Sauce Demo:
 * información del cliente, resumen (overview) y confirmación (complete).
 */
export class CheckoutPage extends BasePage {
  // Paso 1: información
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  // Paso 2: resumen
  private readonly finishButton: Locator;
  private readonly summaryTotal: Locator;

  // Paso 3: confirmación
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryTotal = page.locator('.summary_total_label');

    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /** Completa el formulario de información del comprador. */
  async fillCustomerInformation(
    first: string,
    last: string,
    zip: string,
  ): Promise<void> {
    await this.type(this.firstName, first);
    await this.type(this.lastName, last);
    await this.type(this.postalCode, zip);
    await this.click(this.continueButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async isOverviewLoaded(): Promise<boolean> {
    return (await this.currentUrl()).includes('/checkout-step-two.html');
  }

  async getTotalLabel(): Promise<string> {
    return this.getText(this.summaryTotal);
  }

  /** Confirma la compra en la pantalla de resumen. */
  async finishPurchase(): Promise<void> {
    await this.click(this.finishButton);
  }

  async isComplete(): Promise<boolean> {
    return (await this.currentUrl()).includes('/checkout-complete.html');
  }

  async getConfirmationMessage(): Promise<string> {
    return this.getText(this.completeHeader);
  }

  async getConfirmationDetail(): Promise<string> {
    return this.getText(this.completeText);
  }

  async backToProducts(): Promise<void> {
    await this.click(this.backHomeButton);
  }
}
