import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { Locator, Page } from "playwright/test";

export default class BasePage {

    /**
     * Page
     */
    public page: Page;

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
     * Select dropdown by text
     * 
     * @param object 
     * @param value 
     */
    async selectDropdownByText(object: any, value: string) {
        this.log('Select dropdown ' + object['description'] + ' with value: ' + value);
        await this.page.selectOption(object['locator'], {label: `${value}`});
    }

    /**
     * Check the checkbox
     * 
     * @param object 
     */
    async check(object: any) {
        this.log('Check the checkbox ' + object['description']);
        await this.page.locator(object['locator']).check();
    }

    /**
     * Uncheck the checkbox
     * 
     * @param object 
     */
    async uncheck(object: any) {
        this.log('Uncheck the checkbox ' + object['description']);
        await this.page.locator(object['locator']).uncheck();
    }

    /**
     * Hover on the element
     * 
     * @param object 
     */
    async hover(object: any) {
        this.log('Hover on the ' + object['description']);
        await this.waitElementVisible(object);
        await this.page.hover(object['locator']);
    }

    /**
     * Go to url
     * 
     * @param url 
     */
    async goto(url: string) {
        this.log("Go to the url: " + url);
        await this.page.goto(url, {timeout: 60000});
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('networkidle');
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
     * Get element text
     * 
     * @param object
     * @returns 
     */
    async getText(object: any): Promise<string> {
        this.log('Get text of ' + object['description']);
        let txt = await this.page.locator(object['locator']).textContent();
        if(txt === null) {
            return "";
        } 

        return txt ;
    }

    /**
     * Get all elements of a selector
     * 
     * @param object 
     * @returns 
     */
    async getElements(object: any) {
        this.log('Get all elements of ' + object['description']);
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        return await this.page.locator(object['locator']).all();
    }

    /**
     * Get Element
     * 
     * @param object 
     * @returns 
     */
    async getElement(object: any): Promise<Locator> {
        this.log('Get element of ' + object['description']);
        return await this.page.locator(object['locator']);
    }

    /**
     * Wait Element Visible
     * 
     * @param object 
     */
    async waitElementVisible(object: any) {
        this.log('Wait element to be visible: ' + object['description']);
        await this.page.locator(object['locator']).first().waitFor({ state: 'visible' });
    }

    /**
     * Is element visible
     * 
     * @param object 
     * @returns 
     */
    async isVisible(object: any) {
        this.log('Is element ' + object['description'] + ' visible');
        return await this.page.locator(object['locator']).isVisible();
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
