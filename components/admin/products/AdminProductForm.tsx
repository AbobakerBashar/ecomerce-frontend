"use client";

import { useEffect, useState } from "react";
import { Card } from "../../ui/card";

// Assume toast is available from your UI library (e.g., sonner, react-hot-toast, or shadcn)
import {
	ColorVariant,
	CreateProductErr,
	ProductFormState,
	ProductImage,
	SizeVariant,
} from "@/types/product";
import { toast } from "sonner";
import AddProductFormHeader from "./AddProductFormHeader";
import FormBasicsSection from "./FormBasicsSection";
import FormDescription from "./FormDescription";
import FormPricingSection from "./FormPricingSection";
import FormVariantsSection from "./FormVariantsSection";
import FormMediaSection from "./FormMediaSection";
import FormSummary from "./FormSummary";
import { generateSKU } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useCreateProduct } from "@/hooks/product";
import axios from "axios";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 6;

// --- UTILS ---

const DEFAULT_STATE: ProductFormState = {
	name: "",
	sku: "",
	brand: "",
	category: "",
	subCategory: "",
	description: "",
	price: 0,
	discount: 0,
	stock: 0,
	isFeatured: false,
	gender: "Unisex",
	colors: [],
	sizes: [
		{ value: "XS", checked: false },
		{ value: "S", checked: false },
		{ value: "M", checked: false },
		{ value: "L", checked: false },
		{ value: "XL", checked: false },
		{ value: "XXL", checked: false },
	],
	images: [],
};

export type FieldErrors = Partial<Record<keyof ProductFormState, string>>;

export default function AdminProductForm() {
	const [errors, setErrors] = useState<FieldErrors>({});
	const [dbError, setDbError] = useState<string | undefined>(undefined);
	const [product, setProduct] = useState<ProductFormState>(DEFAULT_STATE);

	const { mutateAsync: createProduct, isPending: isCreating } =
		useCreateProduct();

	// Cleanup image object URLs to prevent memory leaks
	useEffect(() => {
		return () => {
			product.images.forEach((img) => URL.revokeObjectURL(img.preview));
		};
	}, [product.images]);

	// --- HANDLERS ---
	const updateField = <K extends keyof ProductFormState>(
		key: K,
		value: ProductFormState[K],
	) => {
		setProduct((prev) => {
			const next = { ...prev, [key]: value };

			// Auto-generate SKU
			if (key === "name" && typeof value === "string") {
				const currentAutoSKU = generateSKU(prev.name);

				if (!prev.sku || prev.sku === currentAutoSKU) {
					next.sku = generateSKU(value);
				}
			}

			// Reset subcategory if category changes
			if (key === "category") {
				next.subCategory = "";
			}

			return next;
		});
	};

	const addColor = () => {
		setProduct((prev) => ({
			...prev,
			colors: [...prev.colors, { name: "", value: "#000000" }],
		}));
	};

	const updateColor = (index: number, key: keyof ColorVariant, val: string) => {
		const newColors = [...product.colors];
		newColors[index] = { ...newColors[index], [key]: val };
		updateField("colors", newColors);
	};

	const removeColor = (index: number) => {
		updateField(
			"colors",
			product.colors.filter((_, i) => i !== index),
		);
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (!files.length) return;

		const validImages: ProductImage[] = [];
		let hasError = false;

		files.forEach((file) => {
			if (!file.type.startsWith("image/")) {
				toast.error(`${file.name} is not a valid image.`);
				hasError = true;
				return;
			}
			if (file.size > MAX_FILE_SIZE) {
				toast.error(`${file.name} exceeds the 5MB limit.`);
				hasError = true;
				return;
			}
			validImages.push({
				id: crypto.randomUUID(),
				file,
				preview: URL.createObjectURL(file),
			});
		});

		if (product.images.length + validImages.length > MAX_IMAGES) {
			toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
			return;
		}

		if (!hasError && validImages.length > 0) {
			updateField("images", [...product.images, ...validImages]);
		}

		// Reset input
		e.target.value = "";
	};

	const removeImage = (id: string) => {
		const imgToRemove = product.images.find((img) => img.id === id);
		if (imgToRemove) URL.revokeObjectURL(imgToRemove.preview);
		updateField(
			"images",
			product.images.filter((img) => img.id !== id),
		);
	};

	const resetForm = () => {
		product.images.forEach((img) => URL.revokeObjectURL(img.preview));
		setProduct(DEFAULT_STATE);
	};

	// Validation checks
	const validation = {
		name: product.name.trim().length > 0,
		brand: product.brand.trim().length > 0,
		category: product.category.trim().length > 0,
		price: product.price > 0,
		description: product.description.trim().length > 10,
		images: product.images.length > 0,
	};

	const completionChecks = [
		{
			label: "Basic Info",
			done: validation.name && validation.brand && validation.category,
		},
		{ label: "Pricing", done: validation.price },
		{ label: "Media", done: validation.images },
		{ label: "Details", done: validation.description },
	];

	const progress = Math.round(
		(Object.values(validation).filter(Boolean).length /
			Object.keys(validation).length) *
			100,
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		Object.entries(product).map(([key, value]) => {
			if (key === "images" && value.length <= 0)
				setErrors({ images: "Please upload at least one image" });
			else if (key === "sizes" && value.length <= 0)
				setErrors({ images: "Please upload at least one image" });
			else if (key === "colors" && value.length <= 0)
				setErrors({ images: "Please upload at least one image" });
			if (!value && key !== "images" && key !== "sizes" && key !== "colors")
				setErrors({ [key]: "This field is required" });
			else setErrors({});
		});

		const formData = new FormData();

		Object.entries(product).forEach(([key, value]) => {
			if (key === "images") {
				value.forEach((img: ProductImage) =>
					formData.append("images", img.file),
				);
			} else if (key === "sizes") {
				formData.append(
					"sizes",
					JSON.stringify(value.map((s: SizeVariant) => s.value)),
				);
			} else if (key === "colors") {
				formData.append("colors", JSON.stringify(value));
			} else {
				formData.append(key, value);
			}
		});

		try {
			setErrors({});
			setDbError(undefined);

			await createProduct(formData);

			toast.success("Product created successfully!");
			resetForm();
		} catch (error) {
			if (axios.isAxiosError<CreateProductErr>(error))
				if (error.response?.data.errors) setErrors(error.response?.data.errors);
				else setDbError(error.response?.data.message);
			else if (error instanceof Error) setDbError(error.message);
			else setDbError("Unknown error");
		}

		toast.success("Product created successfully!");
		// resetForm();
	};

	// console.log(product);
	// console.log(errors);

	return (
		<Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-[0_16px_48px_-24px_hsl(var(--foreground)/0.35)]">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-primary/10 via-accent/10 to-transparent" />
			<form className="relative space-y-6 p-4 md:p-6" onSubmit={handleSubmit}>
				{/* HEADER */}
				<AddProductFormHeader progress={progress} />

				{dbError && (
					<div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive animate-in fade-in slide-in-from-top-4">
						<AlertCircle className="size-5 shrink-0" />
						<div className="flex-1">
							<h4 className="text-sm font-semibold">Submission Error</h4>
							<p className="text-sm opacity-90">{dbError}</p>
						</div>
					</div>
				)}

				<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
					<div className="space-y-6">
						{/* BASICS SECTION */}
						<FormBasicsSection
							product={product}
							updateField={updateField}
							validation={validation}
							errors={errors}
						/>

						{/* PRICING SECTION */}
						<FormPricingSection
							product={product}
							updateField={updateField}
							errors={errors}
						/>

						{/* DESCRIPTION SECTION */}
						<FormDescription
							product={product}
							updateField={updateField}
							errors={errors}
						/>

						{/* VARIANTS SECTION */}
						<FormVariantsSection
							product={product}
							updateField={updateField}
							updateColor={updateColor}
							addColor={addColor}
							removeColor={removeColor}
							errors={errors}
						/>

						{/* MEDIA SECTION (Dynamic Upload) */}
						<FormMediaSection
							product={product}
							removeImage={removeImage}
							handleImageUpload={handleImageUpload}
							MAX_IMAGES={MAX_IMAGES}
							errors={errors}
						/>
					</div>

					{/* SIDEBAR SUMMARY */}
					<FormSummary
						product={product}
						isCreating={isCreating}
						progress={progress}
						resetForm={resetForm}
						completionChecks={completionChecks}
					/>
				</div>
			</form>
		</Card>
	);
}
