import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

/**
 * Custom World de Cucumber.
 *
 * Comparte el estado del navegador (browser/context/page) entre los
 * distintos step definitions de un mismo escenario y expone instancias
 * "lazy" de los Page Objects para mantener los steps limpios.
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Metadatos para las capturas por paso
  scenarioName = '';
  stepCounter = 0;

  // Page Objects (inicializados de forma perezosa)
  private _loginPage?: LoginPage;
  private _inventoryPage?: InventoryPage;
  private _cartPage?: CartPage;
  private _checkoutPage?: CheckoutPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  get loginPage(): LoginPage {
    return (this._loginPage ??= new LoginPage(this.page));
  }

  get inventoryPage(): InventoryPage {
    return (this._inventoryPage ??= new InventoryPage(this.page));
  }

  get cartPage(): CartPage {
    return (this._cartPage ??= new CartPage(this.page));
  }

  get checkoutPage(): CheckoutPage {
    return (this._checkoutPage ??= new CheckoutPage(this.page));
  }
}

setWorldConstructor(CustomWorld);
