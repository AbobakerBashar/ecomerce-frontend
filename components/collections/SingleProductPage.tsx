"use client";

import { FullProduct } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// Imported Variants and AnimatePresence to fix TS and add smooth image transitions
import { Star } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { Checkbox } from "../ui/checkbox";

// --- Animation Variants ---
// Adding the : Variants type fixes the 'AnimationGeneratorType' TypeScript error
const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { type: "spring", stiffness: 300, damping: 24 },
	},
};

type Props = {
	product: FullProduct;
	children: React.ReactNode;
};

type Errors = {
	colors: string;
	sizes: string;
};

export default function SingleProductPage({ product, children }: Props) {
	const [selectedColors, setSelectedColors] = useState<string[]>([]);

	const [errs, setErrs] = useState<Errors>({ colors: "", sizes: "" });

	const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const images = product.images;

	const displayedImageSrc = images[selectedImageIndex];

	return (
		<motion.div
			className="space-y-10 pt-8 pb-20"
			variants={staggerContainer}
			initial="hidden"
			animate="show"
		>
			<section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
				{/* LEFT COLUMN: IMAGES */}
				<motion.div variants={fadeUp} className="space-y-4">
					<div className="relative overflow-hidden rounded-3xl border border-border bg-muted/30">
						{/* Smooth transition for the main image changing */}
						<AnimatePresence mode="wait">
							<motion.div
								key={displayedImageSrc}
								initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
								animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
								exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
								transition={{ duration: 0.3 }}
							>
								<Image
									src={displayedImageSrc}
									alt={product.name}
									width={1200}
									height={900}
									unoptimized
									className="h-96 w-full object-cover"
								/>
							</motion.div>
						</AnimatePresence>

						<div className="absolute inset-x-0 top-4 flex flex-wrap gap-2 px-4">
							{product.newArrival ? (
								<Badge variant="secondary">New</Badge>
							) : null}
							{product.bestSeller ? <Badge>Best Seller</Badge> : null}
							{product.discount ? (
								<Badge variant="destructive">Sale</Badge>
							) : null}
						</div>
					</div>

					{images.length > 1 ? (
						<motion.div variants={fadeUp} className="flex flex-wrap gap-3">
							{images.map((src, idx) => (
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									type="button"
									key={`${src}-${idx}`}
									onClick={() =>
										idx !== selectedImageIndex && setSelectedImageIndex(idx)
									}
									className={`relative h-16 w-16 overflow-hidden rounded-2xl border border-1.5 transition cursor-pointer ${
										selectedImageIndex === idx
											? "border-primary"
											: "border-border hover:border-primary/60"
									}`}
									aria-label={`Image ${idx + 1}`}
								>
									<Image
										src={src}
										alt={`${product.name} thumbnail ${idx + 1}`}
										fill
										unoptimized
										className="object-cover"
									/>
								</motion.button>
							))}
						</motion.div>
					) : null}
				</motion.div>

				{/* RIGHT COLUMN: DETAILS */}
				<div className="space-y-6">
					<motion.div variants={fadeUp} className="space-y-3">
						<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
							<span className="rounded-full bg-muted px-3 py-1">
								{product.brand}
							</span>
							<span>
								0 <Star className="h-3 w-3" />
							</span>
							<span className="text-xs">(0 reviews)</span>
						</div>

						<h1 className="text-3xl font-semibold text-foreground">
							{product.name}
						</h1>

						<div className="flex flex-wrap items-center gap-4">
							<div className="text-3xl font-semibold text-foreground">
								${product.salePrice.toFixed(2)}
							</div>
							{product.discount ? (
								<span className="text-sm text-muted-foreground line-through">
									${product.price.toFixed(2)}
								</span>
							) : null}
							{product.discount ? (
								<span className="text-sm text-primary">
									Save {product.discount}%
								</span>
							) : null}
						</div>
					</motion.div>

					<motion.div variants={fadeUp} className="space-y-4">
						{errs && errs.colors && (
							<p className="text-destructive">{errs.colors}</p>
						)}

						{product.colors.length > 0 ? (
							<div className="space-y-2">
								<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
									Colors
								</p>
								<div className="flex flex-wrap gap-3">
									{product.colors.map((color) => (
										<motion.label
											whileHover={{ scale: 1.15 }}
											whileTap={{ scale: 0.85 }}
											key={color.name}
											className="text-xs flex gap-2 items-center cursor-pointer"
										>
											<span
												className={`border transition ${
													selectedColors.includes(color.name)
														? "border-primary ring-2 ring-primary/20"
														: "border-border"
												}`}
											></span>
											{color.name}
											<Checkbox
												className="h-4 w-4"
												checked={selectedColors.includes(color.name)}
												aria-label={`${selectedColors.includes(color.name) ? "Remove" : "Add"} ${color.name}`}
												onCheckedChange={(checked) => {
													setErrs((prev) => ({
														...prev,
														colors: "",
													}));

													if (checked && selectedColors.length === quantity)
														return setErrs((prev) => ({
															...prev,
															colors:
																"Increase the quantity before selecting another color.",
														}));

													setSelectedColors((prev) =>
														checked
															? [...prev, color.name]
															: prev.filter((c) => c !== color.name),
													);
												}}
											/>
										</motion.label>
									))}
								</div>
							</div>
						) : null}

						{product.sizes.length > 0 ? (
							<div className="space-y-2">
								{errs && errs.sizes && (
									<p className="text-destructive">{errs.sizes}</p>
								)}
								<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
									Sizes
								</p>
								<div className="flex flex-wrap gap-2">
									{product.sizes.map((size) => (
										<motion.label
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											key={size}
											className={`rounded-full border px-3 py-2 text-sm transition relative cursor-pointer ${
												selectedSizes.includes(size)
													? "border-primary bg-muted/40 text-foreground"
													: "border-border bg-transparent text-muted-foreground hover:bg-muted"
											}`}
										>
											{size}
											<Checkbox
												checked={selectedSizes.includes(size)}
												className="opacity-0 absolute w-full h-full"
												onCheckedChange={(checked) => {
													setErrs((prev) => ({
														...prev,
														sizes: "",
													}));

													if (checked && selectedSizes.length === quantity)
														return setErrs((prev) => ({
															...prev,
															sizes:
																"Increase the quantity before selecting another size.",
														}));

													setSelectedSizes((prev) =>
														checked
															? [...prev, size]
															: prev.filter((c) => c !== size),
													);
												}}
											/>
										</motion.label>
									))}
								</div>
							</div>
						) : null}

						<motion.div
							variants={fadeUp}
							className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5"
						>
							<div className="space-y-1">
								<p className="text-sm text-muted-foreground">Availability</p>
								<p
									className={
										product.stock && product.stock > 0
											? "text-foreground"
											: "text-destructive"
									}
								>
									{product.stock && product.stock > 0
										? `${product.stock} in stock`
										: "Out of stock"}
								</p>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										type="button"
										className="h-10 w-10 rounded-full border border-border bg-background hover:bg-muted"
										onClick={() => setQuantity((q) => Math.max(1, q - 1))}
										aria-label="Decrease quantity"
									>
										-
									</motion.button>
									<span className="w-8 text-center text-sm font-semibold">
										{quantity}
									</span>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										type="button"
										className="h-10 w-10 rounded-full border border-border bg-background hover:bg-muted"
										onClick={() => {
											setErrs({
												colors: "",
												sizes: "",
											});

											setQuantity((q) =>
												Math.min(product.stock || q + 1, q + 1),
											);
										}}
										aria-label="Increase quantity"
									>
										+
									</motion.button>
								</div>

								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										variant="default"
										disabled={!product.stock || product.stock <= 0}
									>
										Add to cart
									</Button>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>

					<motion.div variants={fadeUp} className="space-y-2">
						<p className="text-sm font-semibold text-foreground">
							About this item
						</p>
						<p className="text-sm text-muted-foreground">
							{product.description}
						</p>
						<div className="flex flex-wrap gap-2 pt-2">
							{product.gender ? (
								<span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
									Gender: {product.gender}
								</span>
							) : null}
						</div>
					</motion.div>
				</div>
			</section>

			{/* SIMILAR PRODUCTS SECTION */}
			<motion.section variants={fadeUp} className="space-y-5 mt-10">
				<div className="flex items-end justify-between gap-4">
					<div>
						<h2 className="text-2xl font-semibold text-foreground">
							You may also like
						</h2>
						<p className="text-sm text-muted-foreground">
							Similar items in {product.category.name}
						</p>
					</div>
				</div>
				{children}
			</motion.section>
		</motion.div>
	);
}
