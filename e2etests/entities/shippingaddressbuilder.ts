import ShippingAddress from "./shippingaddress";
import { State } from "./state";
import { Country } from "./country";

export default class ShippingAddressBuilder {

    static create(): ShippingAddress {

        // Random number
        let randomNo = Math.floor(Math.random() * 100).toString();
        let shippingaddress = new ShippingAddress();
        shippingaddress.firstName = "Hoang " + randomNo; 
        shippingaddress.lastName = "Vu " + randomNo;
        shippingaddress.company = "Myer Tech";
        shippingaddress.streetAddress = randomNo + " Hanoi";
        shippingaddress.city = "New York";
        shippingaddress.state = State.Arizona;
        shippingaddress.zipCode = "12345";
        shippingaddress.country = Country.UnitedStates;
        shippingaddress.phoneNumber = "0123456789"

        return shippingaddress;
    }

}