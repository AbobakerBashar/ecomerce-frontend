"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
	AlertCircle,
	CheckCircle2,
	Circle,
	ImagePlus,
	Layers3,
	Sparkles,
	Trash2,
	Plus,
	UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { brands, categoriesOptions } from "@/lib/data";
import { toast } from "sonner";

// --- TYPES ---
export interface ProductImage {
	id: string;
	file: File;
	preview: string;
}

export interface ColorVariant {
	name: string;
	value: string;
}

export interface SizeVariant {
	value: string;
	checked: boolean;
}

export interface ProductFormState {
	name: string;
	slug: string;
	sku: string;
	brand: string;
	category: string;
	subCategory: string;
	description: string;
	price: number;
	discount: number;
	stock: number;
	isFeatured: boolean;
	gender: "Men" | "Women" | "Unisex" | "Kids";
	colors: ColorVariant[];
	sizes: SizeVariant[];
	images: ProductImage[];
}

export type FieldErrors = Partial<Record<keyof ProductFormState, string>>;

const genderAllowed: ProductFormState["gender"][] = [
	"Men",
	"Women",
	"Unisex",
	"Kids",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 6;

// --- UTILS ---
const generateSlug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "");

const generateSKU = (text: string) => {
	if (!text) return "";
	const parts = text.split(" ").filter(Boolean);
	const prefix = parts
		.slice(0, 2)
		.map((p) => p.substring(0, 3).toUpperCase())
		.join("-");
	return prefix ? `${prefix}-001` : "";
};

const DEFAULT_STATE: ProductFormState = {
	name: "",
	slug: "",
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

export default function AdminProductForm() {
	// --- UNIFIED STATE ---
	const [product, setProduct] = useState<ProductFormState>(DEFAULT_STATE);
	const [isLoading, setIsLoading] = useState(false);

	// --- ERROR STATE ---
	const [errors, setErrors] = useState<FieldErrors>({});
	const [dbError, setDbError] = useState<string | null>(null);

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
		// Clear specific field error when user starts typing
		if (errors[key]) {
			setErrors((prev) => ({ ...prev, [key]: undefined }));
		}
		// Optionally clear dbError as well
		if (dbError) setDbError(null);

		setProduct((prev) => {
			const next = { ...prev, [key]: value };

			// Auto-generate Slug and SKU if typing name and they haven't been manually altered significantly
			if (key === "name" && typeof value === "string") {
				const currentAutoSlug = generateSlug(prev.name);
				const currentAutoSKU = generateSKU(prev.name);

				if (!prev.slug || prev.slug === currentAutoSlug) {
					next.slug = generateSlug(value);
				}
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
			if (errors.images) setErrors((prev) => ({ ...prev, images: undefined }));
		}

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
		setErrors({});
		setDbError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Reset errors before checking
		setDbError(null);
		setErrors({});

		if (progress < 100) {
			setDbError("Please complete all required fields before submitting.");
			return;
		}

		try {
			setIsLoading(true);

			// Simulated API Call
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					// Simulate a random database/server error 30% of the time for demonstration
					if (Math.random() > 0.7) {
						reject(new Error("Database connection timeout. Please try again."));
					} else {
						resolve(true);
					}
				}, 1200);
			});

			const payload = {
				...product,
				sizes: product.sizes.filter((s) => s.checked).map((s) => s.value),
				images: product.images.map((img) => img.file),
			};

			console.log("Submitting:", payload);
			toast.success("Product created successfully!");
			resetForm();
		} catch (err: any) {
			console.error(err);
			// Show general database error area
			setDbError(
				err?.message ||
					"An unexpected error occurred while saving to the database.",
			);
			toast.error("Failed to create product");

			// Note: If you receive field-specific errors from your backend (e.g. Zod/Prisma),
			// you would parse them here and call `setErrors(backendFieldErrors)`.
		} finally {
			setIsLoading(false);
		}
	};

	// --- COMPUTED VALUES ---
	const discountedPrice = useMemo(() => {
		if (product.price <= 0) return 0;
		return Math.max(
			product.price - (product.price * product.discount) / 100,
			0,
		);
	}, [product.price, product.discount]);

	const subCategories = useMemo(() => {
		if (!product.category) return [];
		return (
			categoriesOptions.find((item) => item.value === product.category)
				?.subCategories ?? []
		);
	}, [product.category]);

	// Live UI Validation checks (separate from submitted errors)
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

	const isReadyToSubmit = progress === 100;

	return (
		<Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-[0_16px_48px_-24px_hsl(var(--foreground)/0.35)]">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-primary/10 via-accent/10 to-transparent" />
			<form className="relative space-y-6 p-4 md:p-6" onSubmit={handleSubmit}>
				{/* HEADER */}
				<header className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
							Product Studio
						</p>
						<h2 className="mt-1 text-xl font-semibold tracking-tight">
							Create Product Listing
						</h2>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="outline" className="rounded-full px-3 py-1">
							<Layers3 className="mr-1 size-3.5" />
							Admin Form
						</Badge>
						<Badge className="rounded-full px-3 py-1">
							<Sparkles className="mr-1 size-3.5" />
							{progress}% Complete
						</Badge>
					</div>
				</header>

				{/* GLOBAL DATABASE ERROR AREA */}
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
						<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
							<div className="space-y-1">
								<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
									Basic Information
								</h3>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2 md:col-span-2">
									<Label className={errors.name ? "text-destructive" : ""}>
										Product Name <span className="text-destructive">*</span>
									</Label>
									<Input
										value={product.name}
										onChange={(e) => updateField("name", e.target.value)}
										placeholder="e.g., Classic White Sneakers"
										className={
											errors.name || (!validation.name && product.name)
												? "border-destructive"
												: ""
										}
									/>
									{errors.name && (
										<p className="text-xs text-destructive">{errors.name}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label className={errors.slug ? "text-destructive" : ""}>
										Slug
									</Label>
									<Input
										value={product.slug}
										onChange={(e) =>
											updateField("slug", generateSlug(e.target.value))
										}
										placeholder="classic-white-sneakers"
										className={errors.slug ? "border-destructive" : ""}
									/>
									{errors.slug && (
										<p className="text-xs text-destructive">{errors.slug}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label className={errors.sku ? "text-destructive" : ""}>
										SKU
									</Label>
									<Input
										value={product.sku}
										onChange={(e) =>
											updateField("sku", e.target.value.toUpperCase())
										}
										placeholder="CLA-WHI-001"
										className={errors.sku ? "border-destructive" : ""}
									/>
									{errors.sku && (
										<p className="text-xs text-destructive">{errors.sku}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label className={errors.brand ? "text-destructive" : ""}>
										Brand <span className="text-destructive">*</span>
									</Label>
									<Select
										value={product.brand}
										onValueChange={(val) => updateField("brand", val || "")}
									>
										<SelectTrigger
											className={errors.brand ? "border-destructive" : ""}
										>
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
									<Label className={errors.category ? "text-destructive" : ""}>
										Category <span className="text-destructive">*</span>
									</Label>
									<Select
										value={product.category}
										onValueChange={(val) => updateField("category", val || "")}
									>
										<SelectTrigger
											className={errors.category ? "border-destructive" : ""}
										>
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
										<p className="text-xs text-destructive">
											{errors.category}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										className={errors.subCategory ? "text-destructive" : ""}
									>
										Sub Category
									</Label>
									<Select
										value={product.subCategory}
										onValueChange={(val) =>
											updateField("subCategory", val || "")
										}
										disabled={!product.category}
									>
										<SelectTrigger
											className={errors.subCategory ? "border-destructive" : ""}
										>
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
										<p className="text-xs text-destructive">
											{errors.subCategory}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label className={errors.gender ? "text-destructive" : ""}>
										Gender
									</Label>
									<Select
										value={product.gender}
										onValueChange={(val) =>
											updateField("gender", val || "Unisex")
										}
									>
										<SelectTrigger
											className={errors.gender ? "border-destructive" : ""}
										>
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

						{/* PRICING SECTION */}
						<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
							<div className="space-y-1">
								<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
									Pricing & Inventory
								</h3>
							</div>
							<div className="grid gap-4 md:grid-cols-3">
								<div className="space-y-2">
									<Label className={errors.price ? "text-destructive" : ""}>
										Price ($) <span className="text-destructive">*</span>
									</Label>
									<Input
										type="number"
										min={0}
										value={product.price || ""}
										onChange={(e) =>
											updateField("price", parseFloat(e.target.value) || 0)
										}
										className={errors.price ? "border-destructive" : ""}
									/>
									{errors.price && (
										<p className="text-xs text-destructive">{errors.price}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label className={errors.discount ? "text-destructive" : ""}>
										Discount (%)
									</Label>
									<Input
										type="number"
										min={0}
										max={100}
										value={product.discount || ""}
										onChange={(e) =>
											updateField("discount", parseFloat(e.target.value) || 0)
										}
										className={errors.discount ? "border-destructive" : ""}
									/>
									{errors.discount && (
										<p className="text-xs text-destructive">
											{errors.discount}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label className={errors.stock ? "text-destructive" : ""}>
										Stock
									</Label>
									<Input
										type="number"
										min={0}
										value={product.stock || ""}
										onChange={(e) =>
											updateField("stock", parseInt(e.target.value) || 0)
										}
										className={errors.stock ? "border-destructive" : ""}
									/>
									{errors.stock && (
										<p className="text-xs text-destructive">{errors.stock}</p>
									)}
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
						</section>

						{/* DESCRIPTION SECTION */}
						<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
							<div className="space-y-2">
								<Label className={errors.description ? "text-destructive" : ""}>
									Description <span className="text-destructive">*</span>
								</Label>
								<Textarea
									value={product.description}
									placeholder="Write a clear, persuasive product description..."
									rows={6}
									onChange={(e) => updateField("description", e.target.value)}
									className={errors.description ? "border-destructive" : ""}
								/>
								{errors.description ? (
									<p className="text-xs text-destructive">
										{errors.description}
									</p>
								) : (
									<div className="flex items-center justify-between text-xs text-muted-foreground">
										<span>Recommended: 100+ characters</span>
										<span>{product.description.length} chars</span>
									</div>
								)}
							</div>
						</section>

						{/* VARIANTS SECTION */}
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
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={addColor}
									>
										<Plus className="mr-2 size-3" /> Add Color
									</Button>
								</div>
								{product.colors.length === 0 && (
									<p className="text-xs text-muted-foreground">
										No colors added yet.
									</p>
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
												onChange={(e) =>
													updateColor(idx, "value", e.target.value)
												}
											/>
											<Input
												placeholder="Color Name"
												value={color.name}
												onChange={(e) =>
													updateColor(idx, "name", e.target.value)
												}
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
							</div>
						</section>

						{/* MEDIA SECTION */}
						<section className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
							<div className="space-y-1">
								<div className="flex items-center justify-between">
									<h3
										className={`text-sm font-semibold uppercase tracking-wide ${errors.images ? "text-destructive" : "text-muted-foreground"}`}
									>
										Media <span className="text-destructive">*</span>
									</h3>
									<span className="text-xs text-muted-foreground">
										{product.images.length} / {MAX_IMAGES} uploaded
									</span>
								</div>
								{errors.images && (
									<p className="text-xs text-destructive">{errors.images}</p>
								)}
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
												size="icon"
												onClick={() => removeImage(img.id)}
											>
												<Trash2 className="size-4" />
											</Button>
										</div>
									</div>
								))}

								{product.images.length < MAX_IMAGES && (
									<Label
										className={`flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed ${errors.images ? "border-destructive bg-destructive/5" : "border-border/70 bg-background/50 hover:bg-muted/50"} transition-colors`}
									>
										<UploadCloud
											className={`size-6 ${errors.images ? "text-destructive" : "text-muted-foreground"}`}
										/>
										<span
											className={`text-xs font-medium ${errors.images ? "text-destructive" : "text-muted-foreground"}`}
										>
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
							</div>
						</section>
					</div>

					{/* SIDEBAR SUMMARY */}
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
							<p className="text-sm text-muted-foreground">
								Estimated Sale Price
							</p>
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
								disabled={!isReadyToSubmit || isLoading}
							>
								{isLoading
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
								disabled={isLoading}
							>
								Reset Form
							</Button>
						</div>
					</aside>
				</div>
			</form>
		</Card>
	);
}
