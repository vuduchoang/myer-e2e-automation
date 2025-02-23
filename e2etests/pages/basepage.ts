import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { Page } from "playwright/test";

export default class BasePage {

    /**
     * Page
     */
    protected page: Page;

    /**
     * Cucumber log
     */
    protected clog: ICreateLog;


    /**
     * Constructor
     * 
     * @param page 
     */
    constructor(page: Page, clog: ICreateLog) {
        this.page = page;
        this.clog = clog;
    }

    /**
     * Click
     * 
     * @param selector 
     * @param options 
     */
    async click(object: any) {
        this.log('Click on ' + object['description']);

        await this.page.click(object['locator'], object['options']);
    }

    /**
     * Fill the textbox/textarea with value
     * 
     * @param object 
     * @param value 
     */
    async fill(object: any, value: string) {
        this.log('Fill the ' + object['description'] + ' with value: ' + value);
        await this.page.fill(object['locator'], value);
    }


    /**
     * Get Page Title
     * @returns
     */
    async getTitle() {

        // Ensure the page is fully loaded before getting the title
        await this.page.waitForLoadState("load");
        return await this.page.title();
    }

    /**
     * Log to console & cucumber report
     * 
     * @param msg 
     */
    async log(msg: string) {

        // Log to console
        console.log(msg);

        // Log to cucumber report
        this.clog(msg);
    }
}