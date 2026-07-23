export type CartItemInput = {
	productId: string;
	variants?: {
		color?: string;
		size?: string;
	};
	quantity: number;
};

export type CartItem = {
	id: string;
	name: string;
	description: string;
	brand?: string;
	images: string[];
	price: number;
	salePrice?: number;
	color?: string;
	size?: string;
	quantity: number;
};

export type CartResponse = {
	id: string;
	items: CartItem[];
};
