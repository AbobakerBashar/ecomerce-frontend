import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductFormState } from "@/types/product";
import { CheckCircle2, Circle } from "lucide-react";
import { useMemo } from "react";

type Props = {
	product: ProductFormState;
	isCreating: boolean;
	progress: number;
	resetForm: () => void;
	completionChecks: { label: string; done: boolean }[];
};

const FormSummary = ({
	product,
	progress,
	resetForm,
	isCreating,
	completionChecks,
}: Props) => {
	const discountedPrice = useMemo(() => {
		if (product.price <= 0) return 0;
		return Math.max(
			product.price - (product.price * product.discount) / 100,
			0,
		);
	}, [product.price, product.discount]);

	const isReadyToSubmit = progress === 100;

	return (
		<aside className="h-fit space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:sticky md:top-4">
			<div className="space-y-2">
				<p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
					Live Summary
				</p>
				<h3 className="text-lg font-semibold tracking-tight line-clamp-2">
					{product.name || "Untitled Product"}
				</h3>
				<p className="text-sm text-muted-foreground">
					{product.brand || "No brand selected"}
				</p>
			</div>

			<div className="rounded-xl border border-border/70 bg-card/70 p-3">
				<p className="text-sm text-muted-foreground">Estimated Sale Price</p>
				<p className="mt-1 text-2xl font-semibold">
					${discountedPrice.toFixed(2)}
				</p>
				{product.discount > 0 && (
					<p className="mt-1 text-xs text-muted-foreground">
						Base ${product.price.toFixed(2)} with {product.discount}% OFF
					</p>
				)}
			</div>

			<div className="flex flex-wrap gap-2">
				{product.category && (
					<Badge variant="outline">{product.category}</Badge>
				)}
				{product.subCategory && (
					<Badge variant="outline">{product.subCategory}</Badge>
				)}
				<Badge variant="secondary">{product.gender}</Badge>
				{product.isFeatured && <Badge>Featured</Badge>}
				{product.stock > 0 && (
					<Badge variant="outline">Stock: {product.stock}</Badge>
				)}
			</div>

			<Separator />

			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium">Readiness</p>
					<span className="text-xs font-medium text-muted-foreground">
						{progress}%
					</span>
				</div>

				{/* Progress Bar */}
				<div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
					<div
						className="h-full bg-primary transition-all duration-500"
						style={{ width: `${progress}%` }}
					/>
				</div>

				<div className="space-y-1.5 pt-2">
					{completionChecks.map((item) => (
						<div
							key={item.label}
							className="flex items-center justify-between text-sm"
						>
							<span className="text-muted-foreground">{item.label}</span>
							{item.done ? (
								<CheckCircle2 className="size-4 text-emerald-500" />
							) : (
								<Circle className="size-4 text-muted-foreground" />
							)}
						</div>
					))}
				</div>
			</div>

			<div className="pt-4 space-y-3">
				<Button
					type="submit"
					className="w-full"
					disabled={!isReadyToSubmit || isCreating}
				>
					{isCreating
						? "Creating..."
						: isReadyToSubmit
							? "Create Product"
							: "Complete Required Fields"}
				</Button>
				<Button
					type="button"
					variant="ghost"
					className="w-full text-muted-foreground"
					onClick={resetForm}
					disabled={isCreating}
				>
					Reset Form
				</Button>
			</div>
		</aside>
	);
};

export default FormSummary;
