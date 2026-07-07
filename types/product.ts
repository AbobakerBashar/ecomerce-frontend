export interface Product {
	id: string;
	name: string;
	slug: string;
	brand: string;
	category: string;
	subCategory: string;
	description: string;
	price: number;
	discount: number;
	salePrice: number;
	currency: string;
	stock: number;
	sku: string;
	rating: number;
	reviews: number;
	featured: boolean;
	newArrival: boolean;
	bestSeller: boolean;
	colors: {
		name: string;
		value: string;
	}[];
	sizes: string[];
	images: string[];
	thumbnail: string;
	tags: string[];
	weight: number;
	material: string;
	gender: string;
	createdAt: string;
	updatedAt: string;
}
