import { Given, When, Then, DataTable, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, expect } from 'playwright/test';
import { getPage, log, getBaseUrl } from './hooks';
import HomePage from '../../pages/homepage';
import LoginPage from '../../pages/loginpage';
import * as HomePageLoc from "../../locators/homepage.loc.json";
import ProductPage from '../../pages/productpage';
import CartItem from '../../entities/cartitem';
import ShoppingCartPage from '../../pages/shoppingcartpage';
import CheckoutPage from '../../pages/checkoutpage';
import ShippingAddressBuilder from '../../entities/shippingaddressbuilder';
import * as CheckoutPageLoc from "../../locators/checkoutpage.loc.json";
import AccountPage from '../../pages/accountpage';
import { AccountMenu } from '../../pages/accountmenu';
import exp from 'constants';

When('User add {int} items of {string} {string} {string} to Cart', async function (productNo, category, subcategory, subcategory2) {

    // Navigate to category
    let homepage = new HomePage(getPage(), this.log);
    let categoryLocator = {
        "locator": `xpath=//nav/ul/li/a/span[text()='${category}']/parent::a/parent::li`,
        "description": `${category} category`,
        "options": {}
    }

    await homepage.hover(categoryLocator);

    // Navigate to subcategory
    let subcategoryLocator = {
        "locator": `xpath=//nav/ul/li/a/span[text()='${category}']/parent::a/parent::li/ul/li/a/span[text()='${subcategory}']/parent::a`,
        "description": `Subcategory ${subcategory}`,
        "options": {}
    }
    await homepage.hover(subcategoryLocator);

    // Navigate to subcategory2
    let subcategory2Locator = {
        "locator": `xpath=//nav/ul/li/a/span[text()='${category}']/parent::a/parent::li/ul/li/a/span[text()='${subcategory}']/parent::a/parent::li/ul/li/a/span[text()='${subcategory2}']/parent::a`,
        "description": `Subcategory2 ${subcategory2}`,
        "options": {}
    }
    await homepage.click(subcategory2Locator);


    // Select one random product
    let productItemLocator = {
        "locator": "xpath=//li[@class='item product product-item']",
        "description": "Product Item",
        "options": {}
    }

    await homepage.waitElementVisible(productItemLocator);
    let productItems = await homepage.getElements(productItemLocator);
    const randomIndex = Math.floor(Math.random() * productItems.length);
    const randomElement = productItems[randomIndex];
    await randomElement.click();

    // Get product information
    let productPage = new ProductPage(getPage(), this.log);
    let productName = await productPage.getProductName();
    let productPrice = await productPage.getProductPrice();
    let productId = await productPage.getProductId();

    // Select a random size
    let size = await productPage.selectRandomSize();

    // Select a random color
    let color = await productPage.selectRandomColor();

    let cartitem = new CartItem(productId, productName, size, color, productPrice, productNo);
    this.cart.addItem(cartitem);

    // Set product quantity
    await productPage.setProductQuantity(productNo);

    // Add to Cart
    await productPage.clickAddtoCart();

    let x = 0;

});

When('User clear the shopping cart', async function () {

    // Clear the shopping cart if there are some cart items
    let shoppingcartpage = new ShoppingCartPage(getPage(), this.log);
    await shoppingcartpage.clearAll();

});

When('User proceed to checkout', async function () {

    // Proceed to Checkout
    let shoppingcartpage = new ShoppingCartPage(getPage(), this.log);
    await shoppingcartpage.clickProceedToCheckout();

});


When('User go to the shopping cart', async function () {

    // Go to the shopping cart page
    let homepage = new HomePage(getPage(), this.log);
    await homepage.goto(getBaseUrl() + 'checkout/cart/');

});

Then('User verify the order summary', async function () {

    let numberOfItems = this.cart.getNumberOfItems();

    // Go to the shopping cart page
    let checkoutPage = new CheckoutPage(getPage(), this.log);

    // Verify cart items count
    let cartItemsCount = await checkoutPage.getCartItemsCount();
    expect(cartItemsCount).toEqual(numberOfItems);

    // Verify cart product item count
    await checkoutPage.expandOrderSummary();
    let cartProductItemCount = await checkoutPage.getCartProductItemCount();
    expect(cartProductItemCount).toEqual(this.cart.items.size);

    // Loop to verify all cart item details
    for (const cartItem of this.cart.items.values()) {
        let itemName = cartItem.productName;
        let cartItemDetails = await checkoutPage.getCartItemDetails(itemName);

        // Verify product name
        expect(cartItem.productName).toEqual(cartItemDetails.productName);

        // Verify product price
        expect(cartItem.price * cartItem.quantity).toEqual(cartItemDetails.price);

        // Verify product quantity
        expect(cartItem.quantity).toEqual(cartItemDetails.quantity);

        // Verify product size
        expect(cartItem.size).toEqual(cartItemDetails.size);

        // Verify color
        expect(cartItem.color).toEqual(cartItemDetails.color);
    }

});

Then('User enter a valid delivery address', async function () {

    log("User enter a valid delivery address");

    // Create a delivery address
    let deliveryAddress = ShippingAddressBuilder.create();

    // Enter delivery address
    let checkoutPage = new CheckoutPage(getPage(), this.log);

    // Add new address if there are some address already added
    if(await checkoutPage.isNewAddressVisible()) {    

        await checkoutPage.enterNewDeliveryAddress(deliveryAddress);
    } else {        
        await checkoutPage.enterDeliveryAddress(deliveryAddress);
    }

    // Set shipping address to cart
    this.cart.shippingAddress = deliveryAddress;

});


Then('User select delivery method {string}', async function (shippingMethod) {
    
    // Checkout page
    let checkoutPage = new CheckoutPage(getPage(), this.log);

    // Select shipping method
    let shippingfee = await checkoutPage.selectShippingMethod(shippingMethod);

    // Set shipping method to cart
    this.cart.shippingMethod = shippingMethod;

    // Set shipping fee to cart
    this.cart.shippingFee = shippingfee;

});

Then('User place the order', async function () {

    log("User place the order");

    // Checkout page
    let checkoutPage = new CheckoutPage(getPage(), this.log);

    // Click Next
    await checkoutPage.clickNext();

    // Click Place Order
    await checkoutPage.clickPlaceOrder();

    // Get order id & set to cart
    this.cart.orderId = await checkoutPage.getOrderId();

});


Then('User verify order submission under My Orders', async function () {

    // Log
    log("User verify order submission under My Orders");

    // Navigate to My orders 
    // Checkout page
    let checkoutPage = new CheckoutPage(getPage(), this.log);
    await checkoutPage.goto(getBaseUrl() + 'sales/order/history/');

    // Cart
    let cart = this.cart;

    // Account page
    let accountPage = new AccountPage(getPage(), this.log);

    // Get order under my orders
    let order = await accountPage.getOrder(cart.orderId);

    // Verify that order submission is correct as in cart
    // Verify order id
    log("Expect order Id is: " + cart.orderId);
    expect(order.orderId).toEqual(cart.orderId);

    // Verify order total
    let expectedOrderTotal = cart.getTotalPrice() + cart.shippingFee;
    log("Expect order total is: " + expectedOrderTotal);
    expect(order.orderTotal).toEqual(expectedOrderTotal);

    // Verify ship to
    let expectedShipTo = cart.shippingAddress.firstName + ' ' + cart.shippingAddress.lastName;
    log("Expect ship to is: " + expectedShipTo);
    expect(order.shipTo).toEqual(expectedShipTo);

    // Verify status
    log("Expect status is: Pending")
    expect(order.status).toEqual('Pending');

    // Verify order items
    // @TO DO
    log("@TO DO: Verify order items");

});