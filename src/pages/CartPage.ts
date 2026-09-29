import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object del carrito de compras.
 */
export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly itemNames: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async isLoaded(): Promise<boolean> {
    return (await this.currentUrl()).includes('/cart.html');
  }

  /** Cantidad de líneas de producto en el carrito. */
  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /** Nombres de los productos presentes en el carrito. */
  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  /** Verifica que un producto concreto esté en el carrito. */
  async hasProduct(productName: string): Promise<boolean> {
    const names = await this.getItemNames();
    return names.map((n) => n.trim()).includes(productName);
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }
}
