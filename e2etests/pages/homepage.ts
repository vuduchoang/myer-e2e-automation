import { Page } from "playwright/test";
import BasePage from "./basepage"
import * as homePageLoc from "../locators/homepage.loc.json";
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class HomePage extends BasePage {

    /**
     * Constructor
     * 
     * @param page 
     */
    constructor(page: Page, clog: ICreateLog) {
        super(page, clog);        
    }

    
    /**
     * Click Login Link
     */
    async clickLogin() {
        await this.click(homePageLoc.signinJoinLink);

        await this.page.click("xpath=//a[text()='Sign In']");
    }
}                                                                               

