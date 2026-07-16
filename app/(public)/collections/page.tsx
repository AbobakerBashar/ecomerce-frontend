import CollectionPage from "@/components/collections/CollectionPage";
import { getProducts } from "@/lib/product";
import type { FullProduct, Pagination, SearchParams } from "@/types/product";
import type { Metadata } from "next";

import axios from "axios";

export const metadata: Metadata = {
	title: "Collections",
	description: "",
};

const fetchProducts = async (
	searchParams: SearchParams,
): Promise<{
	pagination: Pagination;
	products: FullProduct[];
}> => {
	const params = new URLSearchParams();

	Object.entries(searchParams).forEach(([key, value]) => {
		if (!value) return;

		if (Array.isArray(value)) {
			value.forEach((v) => params.append(key, v));
		} else {
			params.append(key, value);
		}
	});

	try {
		const res = await getProducts(params.toString());
		if (res.success)
			return { products: res.products, pagination: res.pagination };
		return {
			pagination: {
				totalProducts: 0,
				totalPages: 0,
				currentPage: 0,
			},
			products: [],
		};
	} catch (error) {
		console.log(error);

		if (axios.isAxiosError(error)) {
			console.log(error.response?.data);
		}
		return {
			pagination: {
				totalProducts: 0,
				totalPages: 0,
				currentPage: 0,
			},
			products: [],
		};
	}
};

type Props = {
	searchParams: Promise<SearchParams>;
};

export default async function CollectionsRoute({ searchParams }: Props) {
	const { category, brand, sort, page, size, color } = await searchParams;

	const { products, pagination } = await fetchProducts({
		category,
		brand,
		sort,
		page,
		size,
		color,
	});

	return <CollectionPage products={products} pagination={pagination} />;
}
