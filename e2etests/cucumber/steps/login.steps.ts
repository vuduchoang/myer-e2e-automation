import { Given, When, Then, DataTable, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, expect } from 'playwright/test';
import { getPage, log } from './hooks';
import HomePage from '../../pages/homepage';
import LoginPage from '../../pages/loginpage';
import * as HomePageLoc from "../../locators/homepage.loc.json";



Given('User is on login page', async function () {

    // Navigate to Login page
    let homepage  = new HomePage(getPage(), this.log);
    await homepage.clickLogin();

    // Verify that user is on login page
    let loginPage = new LoginPage(getPage(), this.log);

    log('Verify that user is on login page');
    let title = await loginPage.getTitle();
    expect(title).toEqual('Customer Login');
    
});


When('User login as a registered user {string} and password {string}', async function (email, password) {
    
    let loginPage = new LoginPage(getPage(), this.log);
    
    // Login with email & password
    await loginPage.login(email, password);    

  });
