// lib/products.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export async function getFeaturedProducts(limit: number = 8) {
	const res = await axios.get(`${API_URL}/products/featured?limit=${limit}`);
	return res.data;
}

export async function getNewArrivals() {
	const res = await axios.get(`${API_URL}/products/new-arrivals`);
	return res.data;
}

export async function getBestSellers() {
	const res = await axios.get(`${API_URL}/products/best-sellers`);
	return res.data;
}

export async function getCategories() {
	const res = await axios.get(`${API_URL}/categories`);
	return res.data;
}

export async function getProducts(params: string = "") {
	const res = await axios.get(`${API_URL}/products${params}`);
	return res.data;
}
