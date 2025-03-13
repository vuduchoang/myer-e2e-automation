export default class OrderItem {

    // Product name
    public productName: string = "";

    // Sku
    public sku: string | null;

    // Price
    public price: number = 0;

    // Quantity
    public quantity: number = 0;

    // Subtotal
    public subTotal: number = 0;

    // Size
    public size: string = "";

    // Color
    public color: string = "";

    // Constructor
    constructor(productName: string, 
        sku: string, 
        price: number, 
        quantity: number, 
        subTotal: number, 
        size: string,
        color: string) {

        this.productName = productName;
        this.sku = sku;
        this.price = price;
        this.quantity = quantity;
        this.subTotal = subTotal;
        this.size = size;
        this.color = color;
    }
}