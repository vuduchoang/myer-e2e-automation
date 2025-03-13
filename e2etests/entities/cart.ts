import CartItem from "./cartitem";
import ShippingAddress from "./shippingaddress";

export default class Cart {

    // Cart Items
    public items: Map<string, CartItem> = new Map();

    // Order Id
    public orderId: string = "";    

    // Shipping address
    public shippingAddress?: ShippingAddress | null;

    // Shipping method
    public shippingMethod: string = "";

    // Shipping Fee
    public shippingFee: number = 0;

    // Add Item to Cart
    addItem(item: CartItem): void {
        if (this.items.has(item.id!)) {
            const existingItem = this.items.get(item.id!);
            existingItem!.quantity! += item.quantity!;
        } else {
            this.items.set(item.id!, item);
        }
    }

    // Remove item from cart
    removeItem(itemId: string): void {
        this.items.delete(itemId);
    }

    // Update item quantity
    updateItemQuantity(itemId: string, quantity: number): void {
        if (this.items.has(itemId)) {
            if (quantity > 0) {
                this.items.get(itemId)!.quantity = quantity;
            } else {
                this.removeItem(itemId);
            }
        }
    }

    // Calculate total price
    getTotalPrice(): number {
        const total = Array.from(this.items.values()).reduce(
            (sum, item) => sum + item.getTotal(),
            0
        );
        return total;
    }

    /**
     * Get total number of items in cart
     * 
     * @returns 
     */
    getNumberOfItems(): number {
        
        let total: number = 0;

        this.items.forEach((cartItem, id) => {
            total += cartItem.quantity;
        }) 

        return total;
    }

    // Clear cart
    clearCart(): void {
        this.items.clear();
    }
}