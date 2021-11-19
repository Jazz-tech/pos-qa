const Page = require('./page');

class HomePage extends Page {

    get allProducts() {
        return $$('//*[@class="product-image-container"]');
    }

    get productIframeXpath() {
        return '//iframe[@class="fancybox-iframe"]'
    }

    get sizeMapping() {
        return {
            'S': '1',
            'M': '2',
            'L': '3'
        }
    }

    async selectProduct(productIndex) {
        await this.allProducts[productIndex].click();
    }

    async switchToProductIframe() {
        const productIframe = await $(this.productIframeXpath);
        await expect(productIframe).toExist();
        await browser.switchToFrame(productIframe);
    }

    async switchToMainPage() {
        await browser.switchToParentFrame();
    }

    async selectSize(productSize) {
        const sizeDropdown = await $('#group_1');
        await expect(sizeDropdown).toExist();
        await sizeDropdown.selectByAttribute('title', productSize);
        // verify the right size is selected
        const sizeIndex = this.sizeMapping[productSize];
        await expect(sizeDropdown).toHaveValue(sizeIndex);
    }

    async selectNonStandardColorIfExists() {
        const nonStandardColors = await $$('//a[contains(@class, "color_pick") and not (contains(@class, "selected"))]')
        // only change color if there are any non standard colors
        if (nonStandardColors.length > 0) {
            // pick first non standard color
            const nonStandardColor = nonStandardColors[0];
            // select color
            await nonStandardColor.click();
            // verify that the color is selected
            await expect(nonStandardColor).toHaveAttributeContaining('class', 'selected');
        }
    }

    async addProductToCart() {
        const addToCartButton = await $('//*[@id="add_to_cart"]/button/span');
        await expect(addToCartButton).toExist();
        await addToCartButton.click();
        // confirm that the product was added to cart
        await this.switchToMainPage();
        const confirmationMessage = await $('//*[@id="layer_cart"]//h2');
        const expectedMessage = 'Product successfully added to your shopping cart';
        await expect(confirmationMessage).toHaveTextContaining(expectedMessage);
    }

    open() {
        return super.open("/");
    }
}

module.exports = new HomePage();
