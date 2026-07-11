import CollectionPage from "@/components/collections/CollectionPage";
import { getProducts } from "@/lib/product";
import { FullProduct } from "@/types/product";
import axios from "axios";

export const metadata = {
	title: "Collections",
	description: "",
};

const fetchProducts = async (): Promise<FullProduct[]> => {
	try {
		const res = await getProducts();
		if (res.success) return res.products;
		return [];
	} catch (error) {
		console.log(error);

		if (axios.isAxiosError(error)) {
			console.log(error.response?.data);
		}
		return [];
	}
};

export default async function CollectionsRoute() {
	const products = await fetchProducts();

	const c = products.map((p) => p.category);
	console.log(c);

	return <CollectionPage products={products} />;
}
