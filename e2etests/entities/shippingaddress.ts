import { State } from "./state";
import { Country } from "./country";

export default class ShippingAddress {

    // First Name
    public firstName: string = "";

    // Last Name
    public lastName: string = "";

    // Company
    public company: string = "";

    // Street Address
    public streetAddress: string = "";

    // City
    public city: string = "";

    // State
    public state: State = State.Alabama;

    // Zipcode
    public zipCode: string = "";

    // Country
    public country: Country = Country.UnitedStates;

    // Phone number
    public phoneNumber: string = "0999123456";


}