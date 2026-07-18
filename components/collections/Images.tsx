import Image from "next/image";
import { Badge } from "../ui/badge";
import { FullProduct } from "@/types/product";
import { useState } from "react";

import { AnimatePresence, motion, Variants } from "motion/react";

const Images = ({
	product,
	fadeUp,
}: {
	product: FullProduct;
	fadeUp: Variants;
}) => {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const images = product.images;

	const displayedImageSrc = images[selectedImageIndex];

	return (
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
					{product.newArrival ? <Badge variant="secondary">New</Badge> : null}
					{product.bestSeller ? <Badge>Best Seller</Badge> : null}
					{product.discount ? <Badge variant="destructive">Sale</Badge> : null}
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
	);
};

export default Images;
