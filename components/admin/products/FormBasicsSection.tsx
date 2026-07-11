import { brands, categoriesOptions } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ProductFormState } from "@/types/product";
import { useMemo } from "react";

const genderAllowed: ProductFormState["gender"][] = [
	"Men",
	"Women",
	"Unisex",
	"Kids",
];

type Props = {
	product: ProductFormState;
	updateField: (
		key: keyof ProductFormState,
		value: ProductFormState[keyof ProductFormState],
	) => void;
	validation: Record<string, boolean>;
	errors: Partial<Record<keyof ProductFormState, string>>;
};

const FormBasicsSection = ({
	product,
	updateField,
	validation,
	errors,
}: Props) => {
	const subCategories = useMemo(() => {
		if (!product.category) return [];
		return (
			categoriesOptions.find((item) => item.value === product.category)
				?.subCategories ?? []
		);
	}, [product.category]);

	return (
		<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
			<div className="space-y-1">
				<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
					Basic Information
				</h3>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="space-y-2 md:col-span-2">
					<Label>
						Product Name <span className="text-destructive">*</span>
					</Label>
					<Input
						value={product.name}
						onChange={(e) => updateField("name", e.target.value)}
						placeholder="e.g., Classic White Sneakers"
						className={
							!validation.name && product.name ? "border-destructive" : ""
						}
					/>
					{!validation.name && product.name && (
						<p className="text-xs text-destructive">
							Product name is required.
						</p>
					)}
					{errors.name && (
						<p className="text-xs text-destructive">{errors.name}</p>
					)}
				</div>

				{/* <div className="space-y-2">
					<Label>SKU</Label>
					<Input
						value={product.sku}
						onChange={(e) => updateField("sku", e.target.value.toUpperCase())}
						placeholder="CLA-WHI-001"
					/>
				</div> */}

				<div className="space-y-2">
					<Label>
						Category <span className="text-destructive">*</span>
					</Label>
					<Select
						value={product.category}
						onValueChange={(val) => updateField("category", val || "")}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select Category" />
						</SelectTrigger>
						<SelectContent>
							{categoriesOptions.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.category && (
						<p className="text-xs text-destructive">{errors.category}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label>Sub Category</Label>
					<Select
						value={product.subCategory}
						onValueChange={(val) => updateField("subCategory", val || "")}
						disabled={!product.category}
					>
						<SelectTrigger>
							<SelectValue
								placeholder={
									product.category
										? "Select Sub Category"
										: "Choose category first"
								}
							/>
						</SelectTrigger>
						<SelectContent>
							{subCategories.map((opt) => (
								<SelectItem key={opt} value={opt}>
									{opt}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{errors.subCategory && (
						<p className="text-xs text-destructive">{errors.subCategory}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label>
						Brand <span className="text-destructive">*</span>
					</Label>
					<Select
						value={product.brand}
						onValueChange={(val) => updateField("brand", val || "")}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select Brand" />
						</SelectTrigger>
						<SelectContent>
							{brands.map((b) => (
								<SelectItem key={b} value={b}>
									{b}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{errors.brand && (
						<p className="text-xs text-destructive">{errors.brand}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label>Gender</Label>
					<Select
						value={product.gender}
						onValueChange={(val) => updateField("gender", val || "Unisex")}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select Gender" />
						</SelectTrigger>
						<SelectContent>
							{genderAllowed.map((opt) => (
								<SelectItem key={opt} value={opt}>
									{opt}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{errors.gender && (
						<p className="text-xs text-destructive">{errors.gender}</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default FormBasicsSection;
