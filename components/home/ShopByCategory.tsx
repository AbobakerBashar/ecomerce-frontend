import { Category } from "@/types/category";
import CategoriesList from "./CategoriesList";
import { getCategories } from "@/lib/product";

const fetchCategories = async (): Promise<Category[]> => {
	try {
		const res = await getCategories();
		if (res.success) return res.categories;
		return [];
	} catch (error) {
		console.log(error);
		return [];
	}
};

export default async function ShopByCategory() {
	const categories = await fetchCategories();

	return (
		<section className="space-y-8">
			<div className="text-center">
				<p className="text-sm uppercase tracking-[0.35em] text-primary">
					Shop by category
				</p>
				<h2 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2">
					Find the pieces that match your mood.
				</h2>
				<p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
					Browse our top categories and jump straight to the products you need.
				</p>
			</div>

			<CategoriesList categories={categories} />
		</section>
	);
}
