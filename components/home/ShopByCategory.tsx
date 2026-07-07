"use client";

import { categories } from "@/lib/data";
import { Product } from "@/types/product";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShopByCategory() {
	const [currentCategory, setCurrentCategory] = useState<{
		shoes: Product;
		apparel: Product;
		accessories: Product;
		newArrivals: Product;
	}>({
		shoes: categories.shoes[0],
		apparel: categories.apparel[0],
		accessories: categories.accessories[0],
		newArrivals: categories.newArrivals[0],
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentCategory({
				shoes:
					categories.shoes[Math.floor(Math.random() * categories.shoes.length)],
				apparel:
					categories.apparel[
						Math.floor(Math.random() * categories.apparel.length)
					],
				accessories:
					categories.accessories[
						Math.floor(Math.random() * categories.accessories.length)
					],
				newArrivals:
					categories.newArrivals[
						Math.floor(Math.random() * categories.newArrivals.length)
					],
			});
		}, 8000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="space-y-8">
			<div className="text-center">
				<p className="text-sm uppercase tracking-[0.35em] text-primary">
					Shop by category
				</p>
				<h2 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2">
					Find the pieces that match your mood.
				</h2>
				<p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
					Browse our top categories and jump straight to the products you need.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{Object.entries(currentCategory).map(([catKey, product]) => (
					<Link
						key={catKey}
						href={`/collections?category=${catKey}`}
						className="group block overflow-hidden rounded-4xl border border-border bg-card p-8 transition hover:border-primary/50 hover:bg-primary/5"
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
								className="flex h-full flex-col"
							>
								<div className="inline-flex h-16 w-16 overflow-hidden rounded-3xl transition group-hover:bg-primary/20 bg-muted">
									<Image
										src={product.thumbnail || product.images[0]}
										alt={product.name}
										width={100}
										height={100}
										className="object-cover w-full h-full"
									/>
								</div>

								<div className="mt-6 flex-1 space-y-3">
									<div className="flex items-start justify-between gap-2">
										<h3 className="text-lg font-semibold text-foreground line-clamp-1">
											{product.name}
										</h3>
									</div>

									<p className="text-sm text-muted-foreground line-clamp-2">
										{product.description}
									</p>
								</div>

								<div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
									<span className="font-medium text-foreground">
										Explore {product.category}
									</span>
									<span className="text-primary font-semibold">
										${product.price}
									</span>
								</div>
							</motion.div>
						</AnimatePresence>
					</Link>
				))}
			</div>
		</section>
	);
}
