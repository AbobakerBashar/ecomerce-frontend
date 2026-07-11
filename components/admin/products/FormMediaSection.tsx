import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductFormState } from "@/types/product";
import { Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";

type Props = {
	product: ProductFormState;
	MAX_IMAGES: number;
	removeImage: (id: string) => void;
	handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errors: Partial<Record<keyof ProductFormState, string>>;
};

const FormMediaSection = ({
	product,
	removeImage,
	handleImageUpload,
	MAX_IMAGES,
	errors,
}: Props) => {
	return (
		<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
			<div className="space-y-1">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
						Media <span className="text-destructive">*</span>
					</h3>
					<span className="text-xs text-muted-foreground">
						{product.images.length} / {MAX_IMAGES} uploaded
					</span>
				</div>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
				{product.images.map((img) => (
					<div
						key={img.id}
						className="group relative flex h-36 items-center justify-center rounded-xl border border-border/70 bg-card/60 overflow-hidden"
					>
						<Image
							src={img.preview}
							alt="Product preview"
							fill
							unoptimized
							className="object-cover transition-transform group-hover:scale-105"
						/>
						<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
							<Button
								type="button"
								variant="destructive"
								className="cursor-pointer"
								size="icon"
								onClick={() => removeImage(img.id)}
							>
								<Trash2 className="size-4" />
							</Button>
						</div>
					</div>
				))}

				{product.images.length < MAX_IMAGES && (
					<Label className="flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/70 bg-background/50 hover:bg-muted/50 transition-colors">
						<UploadCloud className="size-6 text-muted-foreground" />
						<span className="text-xs font-medium text-muted-foreground">
							Upload Image
						</span>
						<Input
							type="file"
							accept="image/*"
							multiple
							className="hidden"
							onChange={handleImageUpload}
						/>
					</Label>
				)}
			</div>{" "}
			{errors.images && (
				<p className="text-xs text-destructive">{errors.images}</p>
			)}
		</section>
	);
};

export default FormMediaSection;
