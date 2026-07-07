import { Star } from "lucide-react";
import { products } from "@/lib/data";

const brands = ["Forbes", "GQ", "Vogue", "WSJ"];

export default function SocialProof() {
	const totalReviews = products.reduce(
		(sum, product) => sum + product.reviews,
		0,
	);
	const reviewCount = new Intl.NumberFormat("en-US").format(totalReviews);

	return (
		<section className="space-y-8">
			<div className="mx-auto max-w-3xl text-center">
				<p className="text-sm uppercase tracking-[0.35em] text-primary">
					Trusted by shoppers worldwide
				</p>
				<h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
					Built for comfort, trusted for quality
				</h2>
				<p className="mt-4 text-base text-muted-foreground">
					Shop with confidence: curated essentials, fast Delivery, and thousands
					of delighted customers.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-[1.1fr_auto]">
				<div className="rounded-4xl border border-border bg-card p-8">
					<div className="flex flex-wrap items-center gap-4">
						<div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
							<Star className="h-6 w-6" />
						</div>
						<div>
							<p className="text-sm uppercase tracking-[0.35em] text-primary">
								Customer love
							</p>
							<p className="mt-2 text-3xl font-semibold text-foreground">
								★ ★ ★ ★ ★
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								{reviewCount}+ reviews across our most-loved collections.
							</p>
						</div>
					</div>
				</div>

				<div className="rounded-4xl border border-border bg-card p-8">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						As seen in
					</p>
					<div className="mt-6 grid gap-4 sm:grid-cols-2">
						{brands.map((brand) => (
							<div
								key={brand}
								className="rounded-3xl border border-border bg-background/80 px-4 py-5 text-center text-sm font-semibold text-foreground/80"
							>
								{brand}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
