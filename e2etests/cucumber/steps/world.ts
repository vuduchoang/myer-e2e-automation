import {setWorldConstructor, World} from "@cucumber/cucumber"
import Cart from "../../entities/cart";

class CustomWorld extends World {

    private cart:Cart;
    
    constructor(options:any) {
        super(options);
        this.cart = new Cart(); 
    }
}

setWorldConstructor(CustomWorld);