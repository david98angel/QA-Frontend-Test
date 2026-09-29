import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { getUser } from '../data/users';

Given('que el usuario está en la página de login', async function (this: CustomWorld) {
  await this.loginPage.open();
});

When(
  'el usuario inicia sesión como {string}',
  async function (this: CustomWorld, userKey: string) {
    const user = getUser(userKey);
    await this.loginPage.login(user.username, user.password);
  },
);

When(
  'el usuario ingresa el usuario {string} y la contraseña {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

Then('debería ver la página de productos', async function (this: CustomWorld) {
  expect(await this.inventoryPage.isLoaded()).toBeTruthy();
});

Then(
  'el título de la página debería ser {string}',
  async function (this: CustomWorld, expectedTitle: string) {
    expect(await this.inventoryPage.getTitle()).toBe(expectedTitle);
  },
);

Then('debería ver un mensaje de error', async function (this: CustomWorld) {
  expect(await this.loginPage.isErrorVisible()).toBeTruthy();
});

Then(
  'el mensaje de error debería contener {string}',
  async function (this: CustomWorld, expectedText: string) {
    const message = await this.loginPage.getErrorMessage();
    expect(message).toContain(expectedText);
  },
);
