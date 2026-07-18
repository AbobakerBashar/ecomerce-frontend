"use client";

import { FullProduct } from "@/types/product";

// Imported Variants and AnimatePresence to fix TS and add smooth image transitions
import { motion, Variants } from "motion/react";
import Details from "./Details";
import Images from "./Images";

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

export default function SingleProductPage({ product, children }: Props) {
	return (
		<motion.div
			className="space-y-10 pt-8 pb-20"
			variants={staggerContainer}
			initial="hidden"
			animate="show"
		>
			<section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
				{/* LEFT COLUMN: IMAGES */}
				<Images product={product} fadeUp={fadeUp} />

				{/* RIGHT COLUMN: DETAILS */}
				<Details product={product} fadeUp={fadeUp} />
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
