import { Given, When, Then, DataTable, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, expect } from 'playwright/test';
import { getPage, log } from './hooks';
import HomePage from '../../pages/homepage';
import LoginPage from '../../pages/loginpage';


Given('User is on login page', async function () {

    // Navigate to Login page
    let homepage  = new HomePage(getPage(), this.log);
    await homepage.clickLogin();

    // Verify that user is on login page
    let loginPage = new LoginPage(getPage(), this.log);

    log('Verify that user is on login page');
    let title = await loginPage.getTitle();
    expect(title).toEqual('Sign in | MYER');
    
});


When('User enter the correct credential', async function () {

    log('User enter the correct credential');
    let loginPage = new LoginPage(getPage(), this.log);
    await loginPage.login("aa.duchoang@gmail.com", "password@123");

});
