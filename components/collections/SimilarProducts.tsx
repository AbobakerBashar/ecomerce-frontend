import { FullProduct } from "@/types/product";
import ProductCard from "./ProductCard";
import { getSimilarProducts } from "@/lib/product";

const fetchSimilarProducts = async (
	categoryId: string,
): Promise<FullProduct[]> => {
	try {
		const res = await getSimilarProducts(categoryId);
		return res.products;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const SimilarProducts = async ({ categoryId }: { categoryId: string }) => {
	const similarProducts = await fetchSimilarProducts(categoryId);

	return (
		<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{similarProducts.length ? (
				similarProducts.map((p) => <ProductCard key={p.id} product={p} />)
			) : (
				<div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground sm:col-span-2 xl:col-span-3">
					No similar products found.
				</div>
			)}
		</div>
	);
};

export default SimilarProducts;
