import { FullProduct } from "@/types/product";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import ProductCard from "./ProductCard";

interface ProductListProps {
	clearAllFilters: () => void;
	removeFilter: (key: string, value: string) => void;

	products: FullProduct[];
	sortOptions: { label: string; value: string }[];
	selectedColors: string[];
	selectedSizes: string[];

	selectedCategory: string;
	selectedBrand: string;
	selectedSort: string;
}

const ProductsList = ({
	products,
	selectedCategory,
	selectedBrand,
	selectedColors,
	selectedSort,
	sortOptions,
	selectedSizes,
	removeFilter,
	clearAllFilters,
}: ProductListProps) => {
	const activeFilters = [
		...(selectedCategory
			? [
					{
						label: `Category: ${selectedCategory}`,
						key: "category",
						value: selectedCategory,
					},
				]
			: []),
		...(selectedBrand
			? [
					{
						label: `Brand: ${selectedBrand}`,
						key: "brand",
						value: selectedBrand,
					},
				]
			: []),
		...selectedColors.map((color) => ({
			label: `Color: ${color}`,
			key: "color",
			value: color,
		})),
		...selectedSizes.map((size) => ({
			label: `Size: ${size}`,
			key: "size",
			value: size,
		})),
	];

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-card p-5">
				<div className="space-y-1">
					<p className="text-sm font-semibold text-foreground">
						{products.length} products found
					</p>
					<p className="text-sm text-muted-foreground">
						{selectedCategory ? `${selectedCategory} — ` : "All collections — "}
						{selectedBrand
							? `${selectedBrand} products`
							: "Browse by brand, color and size"}
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-full bg-muted px-3 py-2 text-sm text-muted-foreground">
						Sort:{" "}
						{sortOptions.find((option) => option.value === selectedSort)?.label}
					</span>
					<span className="rounded-full bg-muted px-3 py-2 text-sm text-muted-foreground">
						{selectedColors.length} color
						{selectedColors.length === 1 ? "" : "s"}
					</span>
				</div>
			</div>

			{activeFilters.length > 0 ? (
				<div className="flex flex-wrap items-center gap-2">
					{activeFilters.map((filter) => (
						<Button
							key={`${filter.key}-${filter.value}`}
							variant="outline"
							size="sm"
							className="rounded-full"
							onClick={() => removeFilter(filter.key, filter.value)}
						>
							{filter.label}
							<X className="ml-2 h-3.5 w-3.5" />
						</Button>
					))}
					<Button variant="ghost" size="sm" onClick={clearAllFilters}>
						Clear all
					</Button>
				</div>
			) : null}

			<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{products.length === 0 ? (
				<div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
					No products match these filters. Try removing one filter or clearing
					all.
				</div>
			) : null}
		</div>
	);
};

export default ProductsList;
