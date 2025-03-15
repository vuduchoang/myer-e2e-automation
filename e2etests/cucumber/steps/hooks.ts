import {Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status} from "@cucumber/cucumber"
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { Browser, BrowserContext, Page, chromium } from "playwright/test";
import dotenv from "dotenv"
import path from "path";

// Set cucumber default timeout
setDefaultTimeout(180 * 10000);



/**
 * Browser
 */
let browser: Browser;



/**
 * Browser Context
 */
let browserContext: BrowserContext;



/**
 * Page
 */
let page: Page;



/**
 * Base url
 */
let baseUrl: any;



/**
 * Cucumber log;
 */
let clog: ICreateLog;



/**
 * Run before all scenarios
 */
BeforeAll( async function () {

    // Get environment variables
    let env = process.env.NODE_ENV;
    let browserName = process.env.BROWSER_NAME || "chrome";

    // Dotenv config
    dotenv.config({
        path: `${process.cwd()}/e2etests/config/.env.${env}`
    });

    // Base url
    baseUrl = process.env.BASE_URL;

    // Create browser, browser context & page
    browser = await chromium.launch({ headless: true, channel: browserName.toLowerCase(), args: ["--start-maximized"]});
    console.log('Run before all scenario');      
    
});



/**
 * Run after all scenarios
 */
AfterAll(async function () {

    await browser.close();

});



/**
 * Run before each scenario
 */
Before(async function () {

    // Clog
    clog = this.log;

    // Create new browser context & new page
    browserContext = await browser.newContext({viewport: null});
    page = await browserContext.newPage();

    // Open the home page
    await page.goto(baseUrl, { timeout: 60*1000 });    

});



/**
 * Run after each scenario
 */
After(async function (scenario) {

    // Take the screenshot if scenario failed
    if(scenario.result?.status == Status.FAILED) {

        // Current timestamp
        const timestamp: number = Date.now();
        
        // Capture image
        const img = await page.screenshot({
            path: `./reports/screenshots/${timestamp}.png`
        })

        // Attach to report
        this.attach(img, 'image/png');
    }

    // Close page & browser context
    await page.close();    
    await browserContext.close();    
    
});



/**
 * Return page for current cucumber test
 * 
 * @returns 
 */
export function getPage(): Page {
    
    return page;
}

export function getBaseUrl(): string {
    return baseUrl;
}



/**
 * Log to console & cucumber report
 * 
 * @param msg 
 */
export function log(msg: string) {

    // Log to console
    console.log(msg);

    // Log to cucumber report
    clog(msg);
}
