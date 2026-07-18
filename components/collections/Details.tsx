import type { FullProduct } from "@/types/product";
import { Minus, Plus, Star } from "lucide-react";
import { motion, Variants } from "motion/react";
import { useState } from "react";
import AddToCartBtn from "../common/AddToCartBtn";

type Props = {
	fadeUp: Variants;
	product: FullProduct;
};

const Details = ({ product, fadeUp }: Props) => {
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");

	return (
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
				{product.colors.length > 0 ? (
					<div className="space-y-2">
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
							Colors
						</p>
						<div className="flex flex-wrap gap-3">
							{product.colors.map((color) => (
								<button
									key={color.name}
									onClick={() =>
										setSelectedColor((prevColor) =>
											prevColor === color.name ? "" : color.name,
										)
									}
									className={`h-8 w-8 rounded-full border-2 transition cursor-pointer
                ${
									selectedColor === color.name
										? "border-primary scale-110"
										: "border-gray-300"
								}`}
									style={{ background: color.value }}
								/>
							))}
						</div>
					</div>
				) : null}

				{product.sizes.length > 0 ? (
					<div className="space-y-2">
						<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
							Sizes
						</p>
						<div className="flex flex-wrap gap-2">
							{product.sizes.map((size) => (
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									key={size}
									onClick={() =>
										setSelectedSize((prevSize) =>
											prevSize === size ? "" : size,
										)
									}
									aria-label="Select size"
									className={`rounded-full border px-3 py-2 text-sm transition relative cursor-pointer ${
										selectedSize === size
											? "border-primary bg-muted/40 text-foreground"
											: "border-border bg-transparent text-muted-foreground hover:bg-muted"
									}`}
								>
									{size}
								</motion.button>
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
								className="h-10 w-10 flex items-center justify-between rounded-full border border-border bg-background hover:bg-muted cursor-pointer relative"
								onClick={() => setQuantity((q) => Math.max(1, q - 1))}
								aria-label="Decrease quantity"
							>
								<Minus className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-1/2" />
							</motion.button>
							<span className="w-8 text-center text-sm font-semibold">
								{quantity}
							</span>
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								type="button"
								className="h-10 w-10 rounded-full border border-border bg-background hover:bg-muted cursor-pointer relative"
								onClick={() =>
									setQuantity((q) => Math.min(product.stock || q + 1, q + 1))
								}
								aria-label="Increase quantity"
							>
								<Plus className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-1/2" />
							</motion.button>
						</div>

						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<AddToCartBtn
								productId={product.id}
								quantity={quantity}
								variants={{
									color: selectedColor,
									size: selectedSize,
								}}
							/>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>

			<motion.div variants={fadeUp} className="space-y-2">
				<p className="text-sm font-semibold text-foreground">About this item</p>
				<p className="text-sm text-muted-foreground">{product.description}</p>
				<div className="flex flex-wrap gap-2 pt-2">
					{product.gender ? (
						<span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
							Gender: {product.gender}
						</span>
					) : null}
				</div>
			</motion.div>
		</div>
	);
};

export default Details;
