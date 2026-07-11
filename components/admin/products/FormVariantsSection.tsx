import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ColorVariant, ProductFormState } from "@/types/product";

type Props = {
	product: ProductFormState;
	updateField: (
		key: keyof ProductFormState,
		value: ProductFormState[keyof ProductFormState],
	) => void;
	addColor: () => void;
	updateColor: (index: number, key: keyof ColorVariant, val: string) => void;
	removeColor: (index: number) => void;
	errors: Partial<Record<keyof ProductFormState, string>>;
};

const FormVariantsSection = ({
	product,
	updateField,
	updateColor,
	addColor,
	removeColor,
	errors,
}: Props) => {
	return (
		<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
			<div className="space-y-1">
				<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
					Variants
				</h3>
			</div>

			{/* Dynamic Colors */}
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<Label>Colors</Label>
					<Button type="button" variant="outline" size="sm" onClick={addColor}>
						<Plus className="mr-2 size-3" /> Add Color
					</Button>
				</div>
				{product.colors.length === 0 && (
					<p className="text-xs text-muted-foreground">No colors added yet.</p>
				)}
				<div className="grid gap-3 sm:grid-cols-2">
					{product.colors.map((color, idx) => (
						<div
							key={idx}
							className="flex items-center gap-2 rounded-lg border p-2 shadow-sm bg-card"
						>
							<Input
								type="color"
								className="h-9 w-12 cursor-pointer p-1 rounded"
								value={color.value}
								onChange={(e) => updateColor(idx, "value", e.target.value)}
							/>
							<Input
								placeholder="Color Name"
								value={color.name}
								onChange={(e) => updateColor(idx, "name", e.target.value)}
								className="flex-1"
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="text-destructive hover:bg-destructive/10"
								onClick={() => removeColor(idx)}
							>
								<Trash2 className="size-4" />
							</Button>
						</div>
					))}
				</div>
				{errors.colors && (
					<p className="text-xs text-destructive">{errors.colors}</p>
				)}
			</div>

			<Separator />

			{/* Sizes */}
			<div className="space-y-2">
				<Label>Sizes</Label>
				<div className="flex flex-wrap gap-4 pt-1">
					{product.sizes.map((size, idx) => (
						<label
							key={size.value}
							className={`flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
								size.checked
									? "bg-primary text-primary-foreground border-primary"
									: "bg-background hover:bg-muted"
							}`}
						>
							<Checkbox
								className="hidden"
								checked={size.checked}
								onCheckedChange={(checked) => {
									const newSizes = [...product.sizes];
									newSizes[idx].checked = checked === true;
									updateField("sizes", newSizes);
								}}
							/>
							{size.value}
						</label>
					))}
				</div>

				{errors.sizes && (
					<p className="text-xs text-destructive">{errors.sizes}</p>
				)}
			</div>
		</section>
	);
};

export default FormVariantsSection;
