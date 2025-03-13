import { Page } from "playwright/test";
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import BasePage from "./basepage";
import * as ShoppingCartPageLoc from "../locators/shoppingcartpage.loc.json";

export default class ShoppingCartPage extends BasePage {

    /**
     * Constructor
     * 
     * @param page 
     */
    constructor(page: Page, clog: ICreateLog) {
        super(page, clog);
    }

    /**
     * Get number of cart items
     * 
     * @returns 
     */
    async getNumberOfCartItems(): Promise<number> {
        
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        let cartItems = await this.getElements(ShoppingCartPageLoc.cartItem);
        
        return  cartItems.length;
    }

    /**
     * Clear the shopping cart
     */
    async clearAll() {

        // Clear all
        while(await this.getNumberOfCartItems() > 0) {
            await this.page.locator(ShoppingCartPageLoc.removeCartItem['locator']).first().click(); 
            await this.page.waitForLoadState("load");           
        }

        // Expect cart empty
        this.waitElementVisible(ShoppingCartPageLoc.cartEmpty);
    }

    /**
     * Proceed to checkout
     */
    async clickProceedToCheckout() {
        await this.click(ShoppingCartPageLoc.proceedToCheckout);
    }
}