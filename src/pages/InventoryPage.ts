import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object de la página de productos (inventario).
 */
export class InventoryPage extends BasePage {
  private readonly title: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  /** Verdadero cuando el inventario se ha cargado correctamente. */
  async isLoaded(): Promise<boolean> {
    return (await this.currentUrl()).includes('/inventory.html');
  }

  async getTitle(): Promise<string> {
    return this.getText(this.title);
  }

  /** Convierte el nombre visible del producto en el sufijo data-test. */
  private toSlug(productName: string): string {
    return productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  /** Botón "Add to cart" del producto indicado. */
  private addButton(productName: string): Locator {
    return this.page.locator(
      `[data-test="add-to-cart-${this.toSlug(productName)}"]`,
    );
  }

  /** Botón "Remove" del producto indicado. */
  private removeButton(productName: string): Locator {
    return this.page.locator(
      `[data-test="remove-${this.toSlug(productName)}"]`,
    );
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.click(this.addButton(productName));
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.click(this.removeButton(productName));
  }

  /** Número mostrado en el badge del carrito (0 si no hay badge). */
  async getCartCount(): Promise<number> {
    if (await this.isVisible(this.cartBadge)) {
      return Number(await this.getText(this.cartBadge));
    }
    return 0;
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartLink);
  }
}
