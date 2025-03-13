export default class CartItem {

    // Product Id
    public id: string|null;

    // Product Name
    public productName: string|null;

    // Product Size
    public size: string|null;

    // Product Color
    public color: string|null;

    // Price
    public price: number|null;

    // Quantity
    public quantity: number;

    // Constructor
    constructor(id: string|null, productName: string|null, size: string|null, color: string|null, price: number|null, quantity: number = 0) {
        this.id = id;
        this.productName = productName;
        this.size = size;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
    }

    /**
     * Get Total
     * 
     * @returns 
     */
    getTotal(): number {
        return this.price! * this.quantity!;
    }

}