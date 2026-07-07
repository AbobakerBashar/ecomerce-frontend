"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

const arrivals = products.filter((product) => product.newArrival);

export default function NewArrivals() {
	return (
		<section className="space-y-8">
			<div className="flex flex-col gap-3 text-center">
				<p className="text-sm uppercase tracking-[0.35em] text-primary">
					New arrivals
				</p>
				<h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
					Fresh finds for your next look
				</h2>
				<p className="mx-auto max-w-2xl text-base text-muted-foreground">
					Discover the newest drops designed to refresh your wardrobe with ease.
				</p>
			</div>

			<div className="scrollbar-none grid w-full auto-cols-[minmax(260px,1fr)] grid-flow-col gap-5 overflow-x-auto py-2">
				{arrivals.map((product) => (
					<div
						key={product.id}
						className="group min-w-65 overflow-hidden rounded-4xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md flex flex-col"
					>
						<div className="relative aspect-4/5 w-full overflow-hidden bg-muted/70">
							<Image
								src={product.images[0]}
								alt={product.name}
								fill
								className="object-cover object-center transition duration-500 group-hover:scale-105"
								loading="lazy"
							/>
						</div>
						<div className="gap-3 p-5 flex-1 flex flex-col justify-between">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
									{product.brand}
								</p>
								<h3 className="mt-2 text-lg font-semibold text-foreground">
									{product.name}
								</h3>
								<p className="text-sm text-muted-foreground">
									{product.description}
								</p>
							</div>
							<div className="flex flex-col gap-3">
								<p className="font-semibold text-foreground bg-secondary w-fit px-3 py-1.5 rounded-full">
									${product.salePrice.toFixed(2)}
								</p>
								<Link
									href={`/collections/${product.slug}`}
									className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
								>
									Shop now
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
