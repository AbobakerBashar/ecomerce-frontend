import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

export default function UGC() {
	return (
		<section className="space-y-8">
			<div className="text-center">
				<p className="text-sm uppercase tracking-[0.35em] text-primary">
					Real customer photos
				</p>
				<h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
					See how real shoppers style our favorites.
				</h2>
				<p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
					Tap any image to shop the piece featured in the look.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{products.slice(0, 4).map((product) => (
					<Link
						key={product.id}
						href={`/collections/${product.slug}`}
						className="group overflow-hidden rounded-4xl border border-border bg-card transition hover:border-primary/50 hover:shadow-lg"
					>
						<div className="relative aspect-4/5 w-full overflow-hidden bg-muted/80">
							<Image
								src={product.images[1]}
								alt={product.name}
								fill
								className="object-cover object-center transition duration-500 group-hover:scale-105"
								loading="lazy"
							/>
						</div>
						<div className="space-y-3 p-5">
							<p className="text-sm uppercase tracking-[0.28em] text-primary/90">
								@styledbyyou
							</p>
							<h3 className="text-lg font-semibold text-foreground">
								{product.name}
							</h3>
							<p className="text-sm text-muted-foreground">
								{product.brand} · {product.category}
							</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
