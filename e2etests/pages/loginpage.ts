import BasePage from "./basepage";
import {Page} from "playwright";
import * as LoginPageLoc from "../locators/loginpage.loc.json";
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class LoginPage extends BasePage {

    constructor(page: Page, cLog: ICreateLog) {
        super(page, cLog);
    }

    /**
     * Perform Login
     * @param email 
     * @param password 
     */
    async login(email: string, password: string) {

        await this.fill(LoginPageLoc.emailAddress, email);
        await this.fill(LoginPageLoc.password, password);
        await this.click(LoginPageLoc.signinBtn);
    }
}