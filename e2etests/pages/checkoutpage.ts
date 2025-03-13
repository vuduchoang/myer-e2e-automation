import { Page } from "playwright/test";
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import BasePage from "./basepage";
import * as CheckoutPageLoc from "../locators/checkoutpage.loc.json";
import CartItem from "../entities/cartitem";
import ShippingAddress from "../entities/shippingaddress";

export default class CheckoutPage extends BasePage {

    /**
     * Constructor
     * 
     * @param page 
     */
    constructor(page: Page, clog: ICreateLog) {
        super(page, clog);
    }

    /**
     * Expand Order Summary
     */
    async expandOrderSummary() {
        await this.click(CheckoutPageLoc.orderSummaryExpand);
    }

    /**
     * Get cart items count
     * 
     * @returns 
     */
    async getCartItemsCount(): Promise<number> {

        let countTxt = await this.getText(CheckoutPageLoc.cartItemsCount);
        return Number(countTxt);
    }

    /**
     * Get cart product item count
     * 
     * @returns 
     */
    async getCartProductItemCount() {

        return (await this.getElements(CheckoutPageLoc.cartProductItem)).length;
    }

    async getCartItemDetails(productName: string | null) {
        this.log("Get cart item details for product item: " + productName);

        let cartItemDetailsSelector = {
            'locator': `//strong[@class='product-item-name' and text()='${productName}']/parent::div/parent::div/parent::div[@class='product-item-details']`,
            'description': `Cart Item Details for product ${productName}`,
            'options': {}
        }

        let cartItemDetailsElement = this.getElement(cartItemDetailsSelector);

        let productNameSelector = `xpath=//strong[@class='product-item-name' and text()='${productName}']`;
        let quantitySelector = `xpath=//strong[@class='product-item-name' and text()='${productName}']/parent::div/div[@class='details-qty']/span[@class='value']`;
        let priceSelector = `xpath=//strong[@class='product-item-name' and text()='${productName}']/parent::div/parent::div/div[@class='subtotal']/span/span/span`;
        let sizeSelector = `xpath=//strong[@class='product-item-name' and text()='${productName}']/parent::div/parent::div/parent::div/div[2]/div/dl[@class='item-options']/dd[1]`;
        let colorSelector = `xpath=//strong[@class='product-item-name' and text()='${productName}']/parent::div/parent::div/parent::div/div[2]/div/dl[@class='item-options']/dd[2]`;

        let name = await this.page.locator(productNameSelector).textContent();
        let qty = await this.page.locator(quantitySelector).textContent();
        let price = await this.page.locator(priceSelector).textContent();
        let size = await this.page.locator(sizeSelector).textContent();
        let color = await this.page.locator(colorSelector).textContent();

        // Cart item
        let cartItem: CartItem = new CartItem("", name, size, color, Number(price?.replaceAll("$", "")), Number(qty));

        // Return
        return cartItem;
    }

    /**
     * Enter delivery address
     * 
     * @param deliveryAddress 
     */
    async enterDeliveryAddress(deliveryAddress: ShippingAddress) {

        // Enter first name
        await this.fill(CheckoutPageLoc.firstName, deliveryAddress.firstName);

        // Enter last name
        await this.fill(CheckoutPageLoc.lastName, deliveryAddress.lastName);

        // Enter company
        await this.fill(CheckoutPageLoc.company, deliveryAddress.company);

        // Enter street address
        await this.fill(CheckoutPageLoc.streetAddress, deliveryAddress.streetAddress);

        // Enter city
        await this.fill(CheckoutPageLoc.city, deliveryAddress.city);

        // Select state
        await this.selectDropdownByText(CheckoutPageLoc.state, deliveryAddress.state);

        // Enter zip code
        await this.fill(CheckoutPageLoc.zipcode, deliveryAddress.zipCode);

        // Select country
        await this.selectDropdownByText(CheckoutPageLoc.country, deliveryAddress.country);

        // Enter phone number
        await this.fill(CheckoutPageLoc.phoneNumber, deliveryAddress.phoneNumber);
    }

    /**
     * Enter new delivery address
     * 
     * @param deliveryAddress 
     */
    async enterNewDeliveryAddress(deliveryAddress: ShippingAddress) {

        // Log
        this.log("Enter new shipping address");

        // Click New Address
        await this.clickNewAddress();

        // Enter delivery address
        await this.enterDeliveryAddress(deliveryAddress);

        // Uncheck save in address book
        await this.uncheckSaveInAddressBook();

        // Ship here
        await this.clickShipHere();
        
    }

    /**
     * Select shipping method
     * 
     * @param shippingMethod 
     */
    async selectShippingMethod(shippingMethod: string): Promise<number> {
        this.log("Select the shipping method: " + shippingMethod);

        // Shipping method selector
        let shippingMethodSelector = {
            "locator": `xpath=//td[contains(@class, 'col-carrier') and text()='${shippingMethod}']/parent::tr`,
            "description": `${shippingMethod} shipping method`,
            "options": {}
        }

        await this.click(shippingMethodSelector);

        // Return shipping fee
        let shippingfeeSelector = `xpath=//td[contains(@class, 'col-carrier') and text()='${shippingMethod}']/parent::tr/td[contains(@class, 'col-price')]/span[@class='price']/span`;
        let feetxt = await this.page.locator(shippingfeeSelector).textContent();        
        return Number(feetxt?.replaceAll("$", ""));
    }

    /**
     * Click New Address
     */
    async clickNewAddress() {
        await this.click(CheckoutPageLoc.newAddress);
    }

    /**
     * Click Next
     */
    async clickNext() {
        await this.click(CheckoutPageLoc.next);
    }

    /**
     * Click Place Order
     */
    async clickPlaceOrder() {
        await this.click(CheckoutPageLoc.placeOrder);
    }

    /**
     * Click ship here
     */
    async clickShipHere() {
        await this.click(CheckoutPageLoc.shipHere);
    }

    /**
     * Check save in address book
     */
    async checkSaveInAddressBook() {
        await this.check(CheckoutPageLoc.saveInAddressBook);
    }

    /**
     * Uncheck save in address book
     */
    async uncheckSaveInAddressBook() {
        await this.uncheck(CheckoutPageLoc.saveInAddressBook);
    }

    /**
     * Is New Address btn visible
     * 
     * @returns 
     */
    async isNewAddressVisible() {
        return await this.isVisible(CheckoutPageLoc.newAddress);
    }

    /**
     * Get Order Id
     * 
     * @returns 
     */
    async getOrderId() {

        // Order id selector
        let orderIdSelector = "xpath=//div[@class='checkout-success']/p[contains(text(), 'Your order number is:')]/a/strong";

        // Return order id
        return await this.page.locator(orderIdSelector).textContent();
    }


}