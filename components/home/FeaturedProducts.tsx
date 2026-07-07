import { products } from "@/lib/data";
import ProductCard from "../collections/ProductCard";

const FeaturedProducts = () => {
	return (
		<section id="featured" className="space-y-10">
			<div className="flex flex-col gap-3 text-center">
				<p className="text-sm uppercase tracking-[0.35em] text-primary">
					Featured products
				</p>
				<h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
					Shop the pieces people keep coming back for
				</h2>
				<p className="mx-auto max-w-2xl text-base text-muted-foreground">
					From wardrobe staples to daily carry, these picks are built to stand
					the test of time.
				</p>
			</div>

			<div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
};

export default FeaturedProducts;
