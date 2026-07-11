export type Category = {
	id: string;
	name: string;
	slug: string;
	products: CategoryProduct[];
};

type CategoryProduct = {
	id: string;
	name: string;
	description: string;
	images: string[];
	price: number;
	salePrice: number;
};
