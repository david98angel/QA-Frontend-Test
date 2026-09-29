import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('el usuario procede al checkout', async function (this: CustomWorld) {
  await this.cartPage.proceedToCheckout();
});

When(
  'el usuario ingresa la información {string} {string} {string}',
  async function (this: CustomWorld, first: string, last: string, zip: string) {
    await this.checkoutPage.fillCustomerInformation(first, last, zip);
  },
);

When('el usuario finaliza la compra', async function (this: CustomWorld) {
  expect(await this.checkoutPage.isOverviewLoaded()).toBeTruthy();
  await this.checkoutPage.finishPurchase();
});

Then(
  'debería ver la confirmación de compra {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    expect(await this.checkoutPage.isComplete()).toBeTruthy();
    expect(await this.checkoutPage.getConfirmationMessage()).toContain(
      expectedMessage,
    );
  },
);

Then(
  'debería ver un error de checkout que contenga {string}',
  async function (this: CustomWorld, expectedText: string) {
    expect(await this.checkoutPage.getErrorMessage()).toContain(expectedText);
  },
);
