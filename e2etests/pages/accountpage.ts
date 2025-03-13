import { Page } from "playwright/test";
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import BasePage from "./basepage";
import { AccountMenu } from "./accountmenu";
import Order from "../entities/order";


export default class AccountPage extends BasePage {

    /**
     * Constructor
     * 
     * @param page 
     */
    constructor(page: Page, clog: ICreateLog) {
        super(page, clog);
    }

    /**
     * Click account menu item
     * 
     * @param menu 
     */
    async clickAccountMenuItem(menu: AccountMenu) {
        // Log
        this.log("Click account menu item: " + menu);

        // Click menu
        let menuSelector = {
            "locator": `xpath=//ul[@class='nav items']/li/a[contains(text(), '${menu}')]`,
            "description": `Account menu item: ${menu}`,
            "options": {}
        }
        
        await this.click(menuSelector);
    }

    /**
     * Get order from my orders
     * 
     * @param orderId 
     * @returns 
     */
    async getOrder(orderId: string): Promise<Order> {

        let orderIdSelector = `xpath=//td[@class='col id' and text()='${orderId}']`;
        let dateSelector = `xpath=//td[@class='col id' and text()='${orderId}']/parent::tr/td[@data-th='Date']`;
        let shipToSelector = `xpath=//td[@class='col id' and text()='${orderId}']/parent::tr/td[@data-th='Ship To']`;
        let orderTotalSelector = `xpath=//td[@class='col id' and text()='${orderId}']/parent::tr/td[@data-th='Order Total']`;
        let statusSelector = `xpath=//td[@class='col id' and text()='${orderId}']/parent::tr/td[@data-th='Status']`;

        let orderId2 = await this.page.locator(orderIdSelector).textContent();
        let date = await this.page.locator(dateSelector).textContent();
        let shipTo = await this.page.locator(shipToSelector).textContent();
        let orderTotal = Number((await this.page.locator(orderTotalSelector).textContent())?.replaceAll("$", ""));
        let status = await this.page.locator(statusSelector).textContent();

        // Create order
        let order = new Order(orderId2, date, shipTo, orderTotal, status);

        // @TO DO
        // Get order items

        // Return
        return order;

    }

}