export type ContactInput = {
	name: string;
	email: string;
	message: string;
	type:
		| "General inquiry"
		| "Shipping & returns"
		| "Order support"
		| "Product questions";
};
