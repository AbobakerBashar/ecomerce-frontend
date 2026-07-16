import { ChevronRight } from "lucide-react";
import Link from "next/link";

const CollectionsHeader = ({
	selectedCategory,
}: {
	selectedCategory: string;
}) => {
	const categoryTitle = selectedCategory || "All Collections";
	const seoDescription = selectedCategory
		? `Explore the best ${selectedCategory.toLowerCase()} selections with filters for brand, color, and size.`
		: "Discover curated collections across top categories and brands with fast filtering for color, size, and price.";

	return (
		<section className="space-y-4">
			<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
				<Link href="/" className="hover:text-foreground">
					Home
				</Link>
				<ChevronRight className="h-4 w-4" />
				<span className="text-foreground">Collections</span>
			</div>
			<div className="space-y-3">
				<h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
					{categoryTitle}
				</h1>
				<p className="max-w-3xl text-base leading-7 text-muted-foreground">
					{seoDescription}
				</p>
			</div>
		</section>
	);
};

export default CollectionsHeader;
