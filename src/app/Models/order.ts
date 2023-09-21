import { CartItem } from "./cartItem";

export class Order {
    id: number;
    customerId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerDefaultAddress: string;
    customerAltAddress: string;
    AdditionalMessage: string;
    notifications: Notification[];
    items: CartItem[];
    totalAmount: number;
    paymentStatus: PaymentStatus;
    transactionId: string;
    paymentDate: Date;
    SelfPickUp: boolean;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZipCode: string;
    
    deliveryGuyId: number;
    deliveryGuyName: string;
    orderStatus: OrderStatus;
    orderDate: Date;
    
    lastModifiedByUserId: number;
    lastModifiedByUsername: string;
    lastModifiedDate: Date;
}

export class OrderProduct {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export enum PaymentStatus {
    Paid = 'Paid',
    Pending = 'Pending',
    Failed = 'Failed',
}

export enum OrderStatus {
    Pending = 'Pending',
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
}

export class Notification {
    id: number;
    message: string;
    isMarked: boolean;
    adminId: number;
    adminUsername: string;
    dateReceived: Date;
}
