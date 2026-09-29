import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { getUser } from '../data/users';

Given(
  'que el usuario ha iniciado sesión como {string}',
  async function (this: CustomWorld, userKey: string) {
    const user = getUser(userKey);
    await this.loginPage.open();
    await this.loginPage.login(user.username, user.password);
  },
);

Given('está en la página de productos', async function (this: CustomWorld) {
  expect(await this.inventoryPage.isLoaded()).toBeTruthy();
});

When(
  'el usuario agrega el producto {string} al carrito',
  async function (this: CustomWorld, product: string) {
    await this.inventoryPage.addProductToCart(product);
  },
);

When(
  'el usuario elimina el producto {string} del carrito',
  async function (this: CustomWorld, product: string) {
    await this.inventoryPage.removeProductFromCart(product);
  },
);

When('el usuario abre el carrito', async function (this: CustomWorld) {
  await this.inventoryPage.goToCart();
  expect(await this.cartPage.isLoaded()).toBeTruthy();
});

Then(
  'el contador del carrito debería mostrar {string}',
  async function (this: CustomWorld, count: string) {
    expect(await this.inventoryPage.getCartCount()).toBe(Number(count));
  },
);

Then('el contador del carrito debería estar vacío', async function (this: CustomWorld) {
  expect(await this.inventoryPage.getCartCount()).toBe(0);
});

Then(
  'el carrito debería contener el producto {string}',
  async function (this: CustomWorld, product: string) {
    expect(await this.cartPage.hasProduct(product)).toBeTruthy();
  },
);

Then(
  'el carrito debería tener {int} productos',
  async function (this: CustomWorld, count: number) {
    expect(await this.cartPage.getItemCount()).toBe(count);
  },
);
