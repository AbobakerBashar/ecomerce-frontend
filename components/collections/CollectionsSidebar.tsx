import { products } from "@/lib/data";
import { Button } from "../ui/button";

interface CollectionsSidebarProps {
	categoryOptions: string[];
	brandOptions: string[];
	colorOptions: string[];
	updateQuery: (key: string, values: string | string[] | null) => void;
	toggleParam: (key: string, value: string) => void;
	clearAllFilters: () => void;
	sizeOptions: string[];
	sortOptions: { label: string; value: string }[];
	selectedBrand: string;
	selectedColors: string[];
	selectedCategory: string;
	selectedSizes: string[];
	selectedSort: string;
}

const CollectionsSidebar = ({
	updateQuery,
	toggleParam,
	categoryOptions,
	brandOptions,
	colorOptions,
	sizeOptions,
	sortOptions,
	selectedBrand,
	selectedColors,
	selectedCategory,
	selectedSizes,
	selectedSort,
	clearAllFilters,
}: CollectionsSidebarProps) => {
	return (
		<aside className="hidden lg:block">
			<div className="sticky top-28 space-y-6 rounded-3xl border border-border bg-card p-6">
				<div className="flex items-center justify-between gap-4">
					<div>
						<p className="text-sm font-semibold text-foreground">Filters</p>
						<p className="text-sm text-muted-foreground">
							Refine the collection instantly.
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={clearAllFilters}
						className="cursor-pointer"
					>
						Clear
					</Button>
				</div>

				<div className="space-y-4">
					<div className="space-y-3">
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
							Category
						</p>
						<div className="grid gap-2">
							<Button
								variant={selectedCategory ? "outline" : "default"}
								size="sm"
								className="justify-between cursor-pointer"
								onClick={() => updateQuery("category", null)}
							>
								All Collections
							</Button>
							{categoryOptions.map((category) => (
								<Button
									key={category}
									variant={
										selectedCategory === category ? "default" : "outline"
									}
									size="sm"
									className="justify-between cursor-pointer"
									onClick={() => updateQuery("category", category)}
								>
									{category}
								</Button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
							Brand
						</p>
						<div className="grid gap-2">
							{brandOptions.map((brand) => (
								<Button
									key={brand}
									variant={selectedBrand === brand ? "default" : "outline"}
									size="sm"
									className="justify-between cursor-pointer"
									onClick={() =>
										updateQuery("brand", selectedBrand === brand ? null : brand)
									}
								>
									{brand}
								</Button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
							Color
						</p>
						<div className="flex flex-wrap gap-2">
							{colorOptions.map((color) => {
								const colorValue =
									products
										.find((product) =>
											product.colors.some((item) => item.name === color),
										)
										?.colors.find((item) => item.name === color)?.value ??
									"#E5E7EB";
								return (
									<button
										key={color}
										type="button"
										onClick={() => toggleParam("color", color)}
										className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
										aria-label={color}
									>
										<span
											className="absolute inset-1 rounded-full"
											style={{ backgroundColor: colorValue }}
										/>
										{selectedColors.includes(color) ? (
											<span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-foreground">
												✓
											</span>
										) : null}
									</button>
								);
							})}
						</div>
					</div>

					<div className="space-y-3">
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
							Size
						</p>
						<div className="grid grid-cols-2 gap-2">
							{sizeOptions.map((size) => (
								<Button
									key={size}
									variant={selectedSizes.includes(size) ? "default" : "outline"}
									size="sm"
									onClick={() => toggleParam("size", size)}
									className="cursor-pointer"
								>
									{size}
								</Button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
							Sort
						</p>
						<div className="grid gap-2">
							{sortOptions.map((option) => (
								<Button
									key={option.value}
									variant={
										selectedSort === option.value ? "default" : "outline"
									}
									size="sm"
									onClick={() => updateQuery("sort", option.value)}
									className="cursor-pointer"
								>
									{option.label}
								</Button>
							))}
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default CollectionsSidebar;
