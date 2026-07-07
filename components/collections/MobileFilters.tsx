import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { products } from "@/lib/data";
import { Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MobileFiltersProps {
	updateQuery: (key: string, values: string | string[] | null) => void;
	toggleParam: (key: string, value: string) => void;
	categoryOptions: string[];
	brandOptions: string[];
	colorOptions: string[];
	sizeOptions: string[];
	sortOptions: { label: string; value: string }[];
}

const MobileFilters = ({
	updateQuery,
	categoryOptions,
	brandOptions,
	colorOptions,
	toggleParam,
	sizeOptions,
	sortOptions,
}: MobileFiltersProps) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const selectedCategory = searchParams.get("category") ?? "";
	const selectedBrand = searchParams.get("brand") ?? "";
	const selectedColors = searchParams.getAll("color");
	const selectedSizes = searchParams.getAll("size");
	const selectedSort = searchParams.get("sort") ?? "featured";

	const clearAllFilters = () => {
		router.replace(pathname, { scroll: false });
	};

	return (
		<div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm lg:hidden">
			<div className="flex items-center justify-between gap-3">
				<div>
					<p className="text-sm font-semibold text-foreground">Filter & Sort</p>
					<p className="text-sm text-muted-foreground">
						Open filters to refine the collection.
					</p>
				</div>
				<Sheet>
					<SheetTrigger className="inline-flex items-center gap-2 rounded-full border-primary/20 bg-primary/5 text-primary texr-sm cursor-pointer">
						<Filter className="h-4 w-4" />
						Filters
					</SheetTrigger>
					<SheetContent
						side="bottom"
						showCloseButton={false}
						className="h-[90vh] rounded-t-4xl border-border bg-card px-0 pb-0"
					>
						<div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border" />
						<SheetHeader className="px-4 pt-4">
							<div className="flex items-start justify-between gap-4">
								<div className="space-y-2">
									<SheetTitle>Filters & Sort</SheetTitle>
									<SheetDescription>
										Tap an option to refine the collection.
									</SheetDescription>
								</div>
								<SheetClose
									render={
										<Button
											variant="ghost"
											size="icon-sm"
											className="rounded-full cursor-pointer"
											type="button"
										/>
									}
								>
									<X className="h-4 w-4" />
									<span className="sr-only">Close filter panel</span>
								</SheetClose>
							</div>
						</SheetHeader>

						<div className="max-h-[calc(90vh-11rem)] space-y-6 overflow-y-auto px-4 py-5">
							<div className="space-y-3">
								<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
									Category
								</p>
								<div className="grid gap-2">
									<Button
										variant={selectedCategory ? "outline" : "default"}
										size="sm"
										className="justify-between rounded-2xl cursor-pointer"
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
											className="justify-between rounded-2xl cursor-pointer"
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
											className="justify-between rounded-2xl cursor-pointer"
											onClick={() =>
												updateQuery(
													"brand",
													selectedBrand === brand ? null : brand,
												)
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
											variant={
												selectedSizes.includes(size) ? "default" : "outline"
											}
											size="sm"
											className="rounded-2xl cursor-pointer"
											onClick={() => toggleParam("size", size)}
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
											className="justify-between rounded-2xl cursor-pointer"
											onClick={() => updateQuery("sort", option.value)}
										>
											{option.label}
										</Button>
									))}
								</div>
							</div>
						</div>

						<SheetFooter className="border-t border-border bg-background/80 px-4 py-4 backdrop-blur">
							<Button
								variant="outline"
								onClick={clearAllFilters}
								className="w-full rounded-full cursor-pointer"
							>
								Clear all filters
							</Button>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
};

export default MobileFilters;
