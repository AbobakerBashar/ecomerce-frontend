import { ProductFormState } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {
	updateField: (
		key: keyof ProductFormState,
		value: ProductFormState[keyof ProductFormState],
	) => void;
	product: ProductFormState;
	errors: Partial<Record<keyof ProductFormState, string>>;
};

const FormPricingSection = ({ product, updateField, errors }: Props) => {
	return (
		<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
			<div className="space-y-1">
				<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
					Pricing & Inventory
				</h3>
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				<div className="space-y-2">
					<Label>
						Price ($) <span className="text-destructive">*</span>
					</Label>
					<Input
						type="de"
						min={0.01}
						step="0.01"
						value={product.price || ""}
						onChange={(e) =>
							updateField("price", parseFloat(e.target.value) || 0)
						}
					/>

					{errors.price && (
						<p className="text-xs text-destructive">{errors.price}</p>
					)}
				</div>
				<div className="space-y-2">
					<Label>Discount (%)</Label>
					<Input
						type="number"
						min={0}
						max={100}
						value={product.discount || ""}
						onChange={(e) =>
							updateField("discount", parseFloat(e.target.value) || 0)
						}
					/>
					{errors.discount && (
						<p className="text-xs text-destructive">{errors.discount}</p>
					)}
				</div>
				<div className="space-y-2">
					<Label>Stock</Label>
					<Input
						type="number"
						min={0}
						value={product.stock || ""}
						onChange={(e) =>
							updateField("stock", parseInt(e.target.value) || 0)
						}
					/>
				</div>
			</div>
			<div className="rounded-xl border border-border/70 bg-card/70 p-3">
				<label className="flex items-center justify-between gap-3">
					<div>
						<p className="text-sm font-medium">Featured Product</p>
						<p className="text-xs text-muted-foreground">
							Boost this product in curated sections.
						</p>
					</div>
					<Switch
						checked={product.isFeatured}
						onCheckedChange={(val) => updateField("isFeatured", val)}
					/>
				</label>
			</div>

			{errors.isFeatured && (
				<p className="text-xs text-destructive">{errors.isFeatured}</p>
			)}
		</section>
	);
};

export default FormPricingSection;
