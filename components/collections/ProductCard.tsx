"use client";

import { FullProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import AddToCartBtn from "../common/AddToCartBtn";

function ProductCard({ product }: { product: FullProduct }) {
	const [selectedColor, setSelectedColor] = useState(
		product.colors[0]?.name ?? "",
	);

	const [selectedSize, setSelectedSize] = useState("");

	const [isHovered, setIsHovered] = useState(false);
	const [quickAddOpen, setQuickAddOpen] = useState(false);

	const selectedColorIndex = product.colors.findIndex(
		(color) => color.name === selectedColor,
	);
	const imageIndex = isHovered
		? Math.min(1, product.images.length - 1)
		: selectedColorIndex >= 0
			? selectedColorIndex % product.images.length
			: 0;
	const imageSrc = product.images[imageIndex] ?? product.images[0];

	return (
		<div
			className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-200 hover:shadow-lg"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Link href={`/collections/${product.slug}`} className="block">
				<div className="relative h-72 w-full overflow-hidden bg-muted/50">
					<Image
						src={imageSrc}
						alt={product.name}
						fill
						sizes="100%"
						loading="lazy"
						// unoptimized
						className="object-cover transition duration-500 ease-out group-hover:scale-105"
					/>
					<div className="absolute inset-x-0 top-4 flex flex-wrap gap-2 px-4">
						{product.newArrival ? <Badge variant="secondary">New</Badge> : null}
						{product.bestSeller ? <Badge>Best Seller</Badge> : null}
						{product.discount ? (
							<Badge variant="destructive">Sale</Badge>
						) : null}
					</div>
				</div>
			</Link>

			<div className="space-y-4 p-5">
				<div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
					<span>{product.brand}</span>
					<span>
						{(0).toFixed(1)} <Star className="h-3 w-3" />
					</span>
				</div>
				<div className="space-y-2">
					<Link
						href={`/products/${product.slug}`}
						className="block hover:text-primary"
					>
						<h3 className="text-lg font-semibold text-foreground">
							{product.name}
						</h3>
					</Link>
					<p className="line-clamp-2 text-sm text-muted-foreground">
						{product.description}
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="text-lg font-semibold text-foreground">
						${product.salePrice.toFixed(2)}
					</div>
					{product.discount ? (
						<span className="text-sm text-muted-foreground line-through">
							${product.price.toFixed(2)}
						</span>
					) : null}
				</div>

				{product.colors.length > 0 ? (
					<div className="space-y-2">
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
							Colors
						</p>
						<div className="flex flex-wrap gap-2">
							{product.colors.map((color) => (
								<button
									key={color.name}
									type="button"
									onClick={() => setSelectedColor(color.name)}
									className={`rounded-full border border-border bg-transparent px-2 py-1.5 text-xs text-foreground transition hover:bg-muted cursor-pointer ${selectedColor === color.name ? "border-primary" : ""}`}
								>
									{color.name}
								</button>
							))}
						</div>
					</div>
				) : null}

				<div className="grid gap-3">
					<Button
						variant="outline"
						size="sm"
						className="w-full cursor-pointer"
						onClick={() => setQuickAddOpen((value) => !value)}
					>
						{quickAddOpen ? "Hide quick add" : "Quick add"}
					</Button>

					{quickAddOpen ? (
						<div className="rounded-3xl border border-border bg-background p-4">
							<p className="text-sm font-medium text-foreground">Select size</p>
							<div className="mt-3 flex flex-wrap gap-2">
								{product.sizes.map((size) => (
									<button
										key={size}
										type="button"
										onClick={() => setSelectedSize(size)}
										className={`rounded-full border border-border bg-transparent px-2 py-1.5 text-xs text-foreground transition hover:bg-muted cursor-pointer ${
											selectedSize === size ? "border-primary" : ""
										}`}
									>
										{size}
									</button>
								))}
							</div>
							<AddToCartBtn
								className="mt-4 w-full"
								productId={product.id}
								variants={{
									color: selectedColor,
									size: selectedSize,
								}}
								quantity={1}
							/>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
