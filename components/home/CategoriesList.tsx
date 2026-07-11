"use client";

import { Category } from "@/types/category";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoriesList = ({ categories }: { categories: Category[] }) => {
	const [currentIdx, setCurrentCategory] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentCategory((prevIdx) => {
				const nextIdx = (prevIdx + 1) % categories.length;
				return nextIdx;
			});
		}, 10000);

		return () => clearInterval(interval);
	});

	return (
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			{categories.map((c) => {
				const product = c.products[currentIdx];

				return (
					product && (
						<Link
							key={c.id}
							href={`/collections?category=${c.slug}`}
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
											src={product.images[0]}
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
											Explore {c.name}
										</span>
										<span className="text-primary font-semibold">
											${product.price}
										</span>
									</div>
								</motion.div>
							</AnimatePresence>
						</Link>
					)
				);
			})}
		</div>
	);
};

export default CategoriesList;
