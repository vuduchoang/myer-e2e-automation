import OrderItem from "./orderitem";

export default class Order {

    // Order Id
    public orderId: string | null;

    // Date
    public date: string | null;

    // Ship To
    public shipTo: string | null;

    // Order Total
    public orderTotal: number | null;

    // Status
    public status: string | null;

    // Order Items
    public orderItems: OrderItem[] = [];

    // Constructor 
    constructor(orderId: string | null, 
        date: string | null, 
        shipTo: string | null,
        orderTotal: number | null,
        status: string | null
    ) {
        this.orderId = orderId;
        this.date = date;
        this.shipTo = shipTo;
        this.orderTotal = orderTotal;
        this.status = status;
    }

    // Add Order Item to Order
    addOrderItem(orderItem: OrderItem) {
        this.orderItems.push(orderItem);
    }
}