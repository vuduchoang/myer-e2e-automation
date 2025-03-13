import { Page } from "playwright/test";
import BasePage from "./basepage";
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import * as ProductPageLoc from "../locators/productpage.loc.json";

export default class ProductPage extends BasePage {

    /**
     * Constructor
     * 
     * @param page 
     */
    constructor(page: Page, clog: ICreateLog) {
        super(page, clog);
    }

    /**
     * Get product name
     * 
     * @returns 
     */
    async getProductName() {
        this.log("Get product name on product page");
        return await this.getText(ProductPageLoc.productName);
    }

    /**
     * Get product price
     * 
     * @returns 
     */
    async getProductPrice(): Promise<number> {
        this.log("Get product price on product page");
        let priceTxt = await this.getText(ProductPageLoc.productPrice);

        return Number(priceTxt?.replace("$", ""));
    }

    /**
     * Get product id 
     * 
     * @returns 
     */
    async getProductId(): Promise<string> {
        this.log("Get product id on product page");
        return await this.getText(ProductPageLoc.productId);
    }

    /**
     * Select random size
     * 
     * @returns 
     */
    async selectRandomSize() {
        this.log("Select a random size");

        let sizeLocator = {
            "locator": "xpath=//div[contains(@id, 'option-label-size')]",
            "description": "Product size",
            "options": {}
        }
        await this.waitElementVisible(sizeLocator);
        let sizes = await this.getElements(sizeLocator);

        const randomIndex = Math.floor(Math.random() * sizes.length);
        const randomElement = sizes[randomIndex];
        const txt = randomElement.textContent();
        await randomElement.click();

        return txt;
        
    }

    /**
     * 
     * Select a random color
     * 
     * @returns 
     */
    async selectRandomColor() {
        this.log("Select a random color");

        let colorLocator = {
            "locator": "xpath=//div[contains(@id, 'option-label-color')]",
            "description": "Product color",
            "options": {}
        }
        await this.waitElementVisible(colorLocator);
        let colors = await this.getElements(colorLocator);

        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomElement = colors[randomIndex];
        const txt = randomElement.getAttribute('option-label');
        await randomElement.click();

        return txt;
    }

    /**
     * Set product quantity
     * 
     * @param qty 
     */
    async setProductQuantity(qty: number) {
        this.log("Set product quantity on product page");
        await this.fill(ProductPageLoc.productQty, qty.toString());
    }

    /**
     * Click Add to Cart
     */
    async clickAddtoCart() {
        await this.click(ProductPageLoc.addToCart);
    }
}