"use client";
import { FullProduct } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CollectionsHeader from "./CollectionsHeader";
import CollectionsSidebar from "./CollectionsSidebar";
import MobileFilters from "./MobileFilters";
import ProductsList from "./ProductsList";

const itemsPerPage = 8;

const sortOptions = [
	{ label: "Featured", value: "featured" },
	{ label: "Newest", value: "newest" },
	{ label: "Price: Low to High", value: "price-low" },
	{ label: "Price: High to Low", value: "price-high" },
];

export default function CollectionPage({
	products,
}: {
	products: FullProduct[];
}) {
	const categoryOptions = Array.from(
		new Set(products.map((product) => product.category.name)),
	).sort();
	const brandOptions = Array.from(
		new Set(products.map((product) => product.brand)),
	).sort();
	const sizeOptions = Array.from(
		new Set(products.flatMap((product) => product.sizes || [])),
	).sort();
	const colorOptions = Array.from(
		new Set(
			products.flatMap((product) => product.colors.map((color) => color.name)),
		),
	).sort();

	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [visibleCount, setVisibleCount] = useState(itemsPerPage);

	const selectedCategory = searchParams.get("category") ?? "";
	const selectedBrand = searchParams.get("brand") ?? "";
	const selectedColors = searchParams.getAll("color");
	const selectedSizes = searchParams.getAll("size");
	const selectedSort = searchParams.get("sort") ?? "featured";

	const updateQuery = (key: string, values: string | string[] | null) => {
		setVisibleCount(itemsPerPage);
		const next = new URLSearchParams(searchParams.toString());

		if (values === null || values === "") {
			next.delete(key);
		} else if (Array.isArray(values)) {
			next.delete(key);
			values.forEach((value) => next.append(key, value));
		} else {
			next.set(key, values);
		}

		next.delete("page");
		const queryString = next.toString();
		router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
			scroll: false,
		});
	};

	const toggleParam = (key: string, value: string) => {
		const currentValues = searchParams.getAll(key);
		const nextValues = currentValues.includes(value)
			? currentValues.filter((item) => item !== value)
			: [...currentValues, value];
		updateQuery(key, nextValues.length ? nextValues : null);
	};

	const clearAllFilters = () => {
		router.replace(pathname, { scroll: false });
	};

	const removeFilter = (key: string, value: string) => {
		if (key === "color" || key === "size") {
			const currentValues = searchParams.getAll(key);
			const nextValues = currentValues.filter((item) => item !== value);
			updateQuery(key, nextValues.length ? nextValues : null);
			return;
		}

		updateQuery(key, null);
	};

	const filteredProducts = products
		.filter((product) => {
			if (selectedCategory && product.category.name !== selectedCategory) {
				return false;
			}
			if (selectedBrand && product.brand !== selectedBrand) {
				return false;
			}
			if (
				selectedColors.length > 0 &&
				!product.colors.some((color) => selectedColors.includes(color.name))
			) {
				return false;
			}
			if (
				selectedSizes.length > 0 &&
				!product.sizes.some((size) => selectedSizes.includes(size))
			) {
				return false;
			}
			return true;
		})
		.sort((a, b) => {
			if (selectedSort === "price-low") return a.salePrice - b.salePrice;
			if (selectedSort === "price-high") return b.salePrice - a.salePrice;
			if (selectedSort === "newest")
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			// if (a.bestSeller === b.bestSeller) return b.rating - a.rating;
			return a.bestSeller ? -1 : 1;
		});

	const visibleProducts = filteredProducts.slice(0, visibleCount);
	const hasMore = visibleProducts.length < filteredProducts.length;

	const categoryTitle = selectedCategory || "All Collections";
	const seoDescription = selectedCategory
		? `Explore the best ${selectedCategory.toLowerCase()} selections with filters for brand, color, and size.`
		: "Discover curated collections across top categories and brands with fast filtering for color, size, and price.";

	return (
		<div className="space-y-10 pt-8 pb-20">
			<CollectionsHeader
				categoryTitle={categoryTitle}
				seoDescription={seoDescription}
			/>

			<section className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
				<CollectionsSidebar
					updateQuery={updateQuery}
					toggleParam={toggleParam}
					categoryOptions={categoryOptions}
					brandOptions={brandOptions}
					colorOptions={colorOptions}
					sizeOptions={sizeOptions}
					sortOptions={sortOptions}
				/>

				<div className="space-y-6">
					<MobileFilters
						updateQuery={updateQuery}
						categoryOptions={categoryOptions}
						brandOptions={brandOptions}
						colorOptions={colorOptions}
						toggleParam={toggleParam}
						sizeOptions={sizeOptions}
						sortOptions={sortOptions}
					/>

					<ProductsList
						filteredProducts={filteredProducts}
						selectedCategory={selectedCategory}
						selectedBrand={selectedBrand}
						selectedColors={selectedColors}
						selectedSort={selectedSort}
						sortOptions={sortOptions}
						selectedSizes={selectedSizes}
						removeFilter={removeFilter}
						clearAllFilters={clearAllFilters}
						visibleProducts={visibleProducts}
						setVisibleCount={setVisibleCount}
						hasMore={hasMore}
						itemsPerPage={itemsPerPage}
					/>
				</div>
			</section>
		</div>
	);
}
