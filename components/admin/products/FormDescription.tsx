import { ProductFormState } from "@/types/product";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
	product: ProductFormState;
	updateField: (
		key: keyof ProductFormState,
		value: ProductFormState[keyof ProductFormState],
	) => void;
	errors: Partial<Record<keyof ProductFormState, string>>;
};

const FormDescription = ({ product, updateField, errors }: Props) => {
	return (
		<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
			<div className="space-y-2">
				<Label>
					Description <span className="text-destructive">*</span>
				</Label>
				<Textarea
					value={product.description}
					placeholder="Write a clear, persuasive product description..."
					rows={6}
					onChange={(e) => updateField("description", e.target.value)}
				/>
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>Recommended: 100+ characters</span>
					<span>{product.description.length} chars</span>
				</div>

				{errors.description && (
					<p className="text-xs text-destructive">{errors.description}</p>
				)}
			</div>
		</section>
	);
};

export default FormDescription;
