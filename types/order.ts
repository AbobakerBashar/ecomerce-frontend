import { Address } from "./user";

export type OrderStatus =
	| "pending"
	| "processing"
	| "shipped"
	| "delivered"
	| "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export interface OrderItem {
	name: string;
	price: number;
	quantity: number;
	color: string;
	size: string;
	id: string;
	images: string[];
}

export interface Order {
	id: string;
	total: number;
	paymentStatus: PaymentStatus;
	orderStatus: OrderStatus;
	shippingAddress: Address;
	items: OrderItem[];
	createdAt: string;
}

export interface OrderResponse {
	success: boolean;
	order: Order;
}

export interface OrdersResponse {
	success: boolean;
	orders: Order[];
}
