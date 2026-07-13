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

export type CreateProductErr = {
	success: boolean;
	message?: string;
	errors?: Record<string, string>;
};

export interface ProductImage {
	id: string;
	file: File;
	preview: string;
}

export interface ColorVariant {
	name: string;
	value: string;
}

export interface SizeVariant {
	value: string;
	checked: boolean;
}

export interface ProductFormState {
	name: string;
	sku: string;
	brand: string;
	category: string;
	subCategory: string;
	description: string;
	price: number;
	discount: number;
	stock: number;
	isFeatured: boolean;
	gender: "Men" | "Women" | "Unisex" | "Kids";
	colors: ColorVariant[];
	sizes: SizeVariant[];
	images: ProductImage[];
}

export type ImagesInput = {
	image: File | null;
	url: string;
};

export type SizesInput = {
	checked: boolean;
	value: "XS" | "S" | "M" | "L" | "XL" | "XXL";
};

export type NewArrivalProduct = {
	id: string;
	name: string;
	description: string;
	brand: string;
	slug: string;
	images: string[];
	price: number;
	salePrice: number;
};

export interface FullProduct extends NewArrivalProduct {
	category: {
		id: string;
		name: string;
		slug: string;
	};
	bestSeller: boolean;
	newArrival: boolean;
	// isFeatured: boolean;
	gender: string;
	discount: number;
	stock?: number;
	colors: {
		name: string;
		value: string;
	}[];
	sizes: string[];
	createdAt: string;
}

// name brand slug description bestSeller images price salePrice discount colors sizes
