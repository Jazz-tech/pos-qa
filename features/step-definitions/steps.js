const { Given, When, Then } = require('@wdio/cucumber-framework');
const HomePage = require('../pageobjects/home.page');

const pages = {
    home: HomePage
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I select (\w+) and (\w+)$/, async (productIndex, productSize) => {
    await HomePage.selectProduct(productIndex);
    await HomePage.switchToProductIframe();
    await HomePage.selectNonStandardColorIfExists();
    await HomePage.selectSize(productSize);
});

Then(/^Add the product to cart$/, async () => {
    await HomePage.addProductToCart();
    await sleep(20000);
});

