"use client";
import type {
	FullProduct,
	Pagination as PaginationType,
} from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import CollectionsHeader from "./CollectionsHeader";
import CollectionsSidebar from "./CollectionsSidebar";
import MobileFilters from "./MobileFilters";
import ProductsList from "./ProductsList";
import Pagination from "./Pagination";

const sortOptions = [
	{ label: "Featured", value: "featured" },
	{ label: "Newest", value: "newest" },
	{ label: "Price: Low to High", value: "price-low" },
	{ label: "Price: High to Low", value: "price-high" },
];

type Props = {
	products: FullProduct[];
	pagination: PaginationType;
};

export default function CollectionPage({ products, pagination }: Props) {
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

	const selectedCategory = searchParams.get("category") ?? "";
	const selectedBrand = searchParams.get("brand") ?? "";
	const selectedColors = searchParams.getAll("color");
	const selectedSizes = searchParams.getAll("size");
	const selectedSort = searchParams.get("sort") ?? "featured";

	const updateQuery = useCallback(
		(key: string, values: string | string[] | null) => {
			const currentQuery = searchParams.toString();

			const next = new URLSearchParams(searchParams.toString());

			if (!values) {
				next.delete(key);
			} else if (Array.isArray(values)) {
				next.delete(key);
				values.forEach((value) => next.append(key, value));
			} else {
				next.set(key, values);
			}

			const queryString = next.toString();

			if (queryString === currentQuery) return;

			router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
				scroll: false,
			});
		},
		[pathname, router, searchParams],
	);

	const toggleParam = useCallback(
		(key: string, value: string) => {
			const currentValues = searchParams.getAll(key);
			const nextValues = currentValues.includes(value)
				? currentValues.filter((item) => item !== value)
				: [...currentValues, value];
			updateQuery(key, nextValues.length ? nextValues : null);
		},
		[searchParams, updateQuery],
	);

	const clearAllFilters = () => {
		router.replace(pathname, { scroll: false });
	};

	const removeFilter = useCallback(
		(key: string, value: string) => {
			if (key === "color" || key === "size") {
				const currentValues = searchParams.getAll(key);
				const nextValues = currentValues.filter((item) => item !== value);
				updateQuery(key, nextValues.length ? nextValues : null);
				return;
			}

			updateQuery(key, null);
		},
		[searchParams, updateQuery],
	);

	return (
		<div className="space-y-10 pt-8 pb-20">
			<CollectionsHeader selectedCategory={selectedCategory} />

			<section className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
				<CollectionsSidebar
					updateQuery={updateQuery}
					toggleParam={toggleParam}
					categoryOptions={categoryOptions}
					brandOptions={brandOptions}
					colorOptions={colorOptions}
					sizeOptions={sizeOptions}
					sortOptions={sortOptions}
					selectedBrand={selectedBrand}
					selectedColors={selectedColors}
					selectedCategory={selectedCategory}
					selectedSizes={selectedSizes}
					selectedSort={selectedSort}
					clearAllFilters={clearAllFilters}
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
						selectedBrand={selectedBrand}
						selectedColors={selectedColors}
						selectedCategory={selectedCategory}
						selectedSizes={selectedSizes}
						selectedSort={selectedSort}
						clearAllFilters={clearAllFilters}
					/>

					<ProductsList
						products={products}
						selectedCategory={selectedCategory}
						selectedBrand={selectedBrand}
						selectedColors={selectedColors}
						selectedSort={selectedSort}
						sortOptions={sortOptions}
						selectedSizes={selectedSizes}
						removeFilter={removeFilter}
						clearAllFilters={clearAllFilters}
					/>
					<Pagination pagination={pagination} updateQuery={updateQuery} />
				</div>
			</section>
		</div>
	);
}
