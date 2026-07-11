// scripts/download-images.ts

import { products } from "@/lib/data";
import fs from "fs";
import path from "path";

const outputDir = path.join(process.cwd(), "public", "products");

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const categoryCount: Record<string, number> = {};

async function downloadImage(url: string, filename: string) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed: ${response.status}`);
		}

		const buffer = Buffer.from(await response.arrayBuffer());

		let ext = ".jpg";

		const contentType = response.headers.get("content-type");

		if (contentType?.includes("png")) ext = ".png";
		else if (contentType?.includes("webp")) ext = ".webp";
		else if (contentType?.includes("jpeg")) ext = ".jpg";
		else if (contentType?.includes("jpg")) ext = ".jpg";

		const filePath = path.join(outputDir, `${filename}${ext}`);

		fs.writeFileSync(filePath, buffer);

		console.log(`✅ ${filename}${ext}`);
	} catch (error) {
		console.error(`❌ ${filename}`, error);
	}
}

async function main() {
	const newPrImg = [];
	for (const product of products) {
		const category = product.category.toLowerCase().replace(/\s+/g, "-");

		for (const image of product.images) {
			categoryCount[category] = (categoryCount[category] || 0) + 1;

			const filename = `${category}-${categoryCount[category]}`;

			await downloadImage(image, filename);
			newPrImg.push("/products/" + filename);
		}
		product.images = newPrImg;
	}

	console.log("🎉 All images downloaded.", products);
}

main();
const d = [
	{
		id: "1",
		name: "Classic White Sneakers",
		slug: "classic-white-sneakers",
		brand: "Nike",
		category: "Shoes",
		subCategory: "Sneakers",
		description:
			"Premium everyday sneakers made with breathable mesh and durable rubber outsole for all-day comfort.",
		price: 89.99,
		discount: 15,
		salePrice: 76.49,
		currency: "USD",
		stock: 42,
		sku: "NK-SNK-001",
		rating: 4.8,
		reviews: 243,
		featured: true,
		newArrival: true,
		bestSeller: true,
		colors: [[Object], [Object]],
		sizes: ["39", "40", "41", "42", "43", "44"],

		thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
		tags: ["sports", "casual", "running"],
		weight: 0.8,
		material: "Mesh, Rubber",
		gender: "Unisex",
		createdAt: "2026-07-04T10:00:00Z",
		updatedAt: "2026-07-04T10:00:00Z",
	},
	{
		id: "2",
		name: "Men's Oversized Hoodie",
		slug: "mens-oversized-hoodie",
		brand: "Adidas",
		category: "Clothing",
		subCategory: "Hoodies",
		description:
			"Soft fleece oversized hoodie with kangaroo pocket and adjustable hood.",
		price: 59.99,
		discount: 20,
		salePrice: 47.99,
		currency: "USD",
		stock: 65,
		sku: "AD-HOD-002",
		rating: 4.7,
		reviews: 192,
		featured: false,
		newArrival: true,
		bestSeller: false,
		colors: [[Object], [Object], [Object]],
		sizes: ["S", "M", "L", "XL"],
		images: [
			"/products/shoes-1",
			"/products/shoes-2",
			"/products/shoes-3",
			"/products/shoes-4",
			"/products/clothing-1",
			"/products/clothing-2",
			"/products/bags-1",
			"/products/bags-2",
			"/products/electronics-1",
			"/products/electronics-2",
			"/products/electronics-3",
			"/products/electronics-4",
		],
		thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
		tags: ["hoodie", "winter", "fashion"],
		weight: 0.6,
		material: "Cotton Blend",
		gender: "Men",
		createdAt: "2026-07-04T10:00:00Z",
		updatedAt: "2026-07-04T10:00:00Z",
	},
	{
		id: "3",
		name: "Women's Leather Handbag",
		slug: "womens-leather-handbag",
		brand: "Michael Kors",
		category: "Bags",
		subCategory: "Handbags",
		description: "Elegant genuine leather handbag with spacious compartments.",
		price: 149.99,
		discount: 10,
		salePrice: 134.99,
		currency: "USD",
		stock: 18,
		sku: "MK-BAG-003",
		rating: 4.9,
		reviews: 431,
		featured: true,
		newArrival: false,
		bestSeller: true,
		colors: [[Object], [Object]],
		sizes: [],
		images: [
			"/products/shoes-1",
			"/products/shoes-2",
			"/products/shoes-3",
			"/products/shoes-4",
			"/products/clothing-1",
			"/products/clothing-2",
			"/products/bags-1",
			"/products/bags-2",
			"/products/electronics-1",
			"/products/electronics-2",
			"/products/electronics-3",
			"/products/electronics-4",
		],
		thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
		tags: ["luxury", "women", "leather"],
		weight: 1.2,
		material: "Genuine Leather",
		gender: "Women",
		createdAt: "2026-07-04T10:00:00Z",
		updatedAt: "2026-07-04T10:00:00Z",
	},
	{
		id: "4",
		name: "Apple Watch Series",
		slug: "apple-watch-series",
		brand: "Apple",
		category: "Electronics",
		subCategory: "Smart Watches",
		description:
			"Advanced smartwatch with fitness tracking, notifications and GPS.",
		price: 399.99,
		discount: 5,
		salePrice: 379.99,
		currency: "USD",
		stock: 24,
		sku: "APL-WTC-004",
		rating: 4.9,
		reviews: 1256,
		featured: true,
		newArrival: true,
		bestSeller: true,
		colors: [[Object], [Object]],
		sizes: ["41mm", "45mm"],
		images: [
			"/products/shoes-1",
			"/products/shoes-2",
			"/products/shoes-3",
			"/products/shoes-4",
			"/products/clothing-1",
			"/products/clothing-2",
			"/products/bags-1",
			"/products/bags-2",
			"/products/electronics-1",
			"/products/electronics-2",
			"/products/electronics-3",
			"/products/electronics-4",
		],
		thumbnail: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
		tags: ["watch", "smartwatch", "fitness"],
		weight: 0.2,
		material: "Aluminum",
		gender: "Unisex",
		createdAt: "2026-07-04T10:00:00Z",
		updatedAt: "2026-07-04T10:00:00Z",
	},
	{
		id: "5",
		name: "Wireless Noise Cancelling Headphones",
		slug: "wireless-noise-cancelling-headphones",
		brand: "Sony",
		category: "Electronics",
		subCategory: "Headphones",
		description:
			"Premium wireless headphones with industry-leading noise cancellation.",
		price: 299.99,
		discount: 25,
		salePrice: 224.99,
		currency: "USD",
		stock: 36,
		sku: "SNY-HDP-005",
		rating: 4.8,
		reviews: 982,
		featured: true,
		newArrival: false,
		bestSeller: true,
		colors: [[Object], [Object]],
		sizes: [],
		images: [
			"/products/shoes-1",
			"/products/shoes-2",
			"/products/shoes-3",
			"/products/shoes-4",
			"/products/clothing-1",
			"/products/clothing-2",
			"/products/bags-1",
			"/products/bags-2",
			"/products/electronics-1",
			"/products/electronics-2",
			"/products/electronics-3",
			"/products/electronics-4",
		],
		thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
		tags: ["audio", "music", "wireless"],
		weight: 0.35,
		material: "Plastic",
		gender: "Unisex",
		createdAt: "2026-07-04T10:00:00Z",
		updatedAt: "2026-07-04T10:00:00Z",
	},
];
