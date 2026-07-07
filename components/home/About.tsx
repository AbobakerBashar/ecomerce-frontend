import SocialProof from "./SocialProof";

export default function About() {
	return (
		<div className="space-y-16 py-10">
			{/* Hero */}
			<section className="rounded-4xl border border-border bg-primary/5 p-10 sm:p-14">
				<div className="max-w-2xl space-y-5">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						Our story
					</p>
					<h1 className="text-3xl sm:text-4xl font-semibold text-foreground">
						Built for real life—comfort, quality, and clean style.
					</h1>
					<p className="text-base text-muted-foreground">
						We started with a simple idea: everyday essentials should feel
						great, last longer, and look sharp—without the hype. Today, we still
						choose materials and details the same way: for how they feel and how
						they wear.
					</p>
				</div>
			</section>

			{/* Journey */}
			<section className="grid gap-6 md:grid-cols-3">
				<div className="rounded-4xl border border-border bg-card p-6">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						The gap
					</p>
					<h2 className="mt-3 text-xl font-semibold text-foreground">
						Too many basics that don’t last
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						We noticed how quickly “good enough” products fall apart—so we
						focused on durability from day one.
					</p>
				</div>
				<div className="rounded-4xl border border-border bg-card p-6">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						The fix
					</p>
					<h2 className="mt-3 text-xl font-semibold text-foreground">
						Design with wear in mind
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Every choice—from materials to fit—is made for everyday movement and
						comfort.
					</p>
				</div>
				<div className="rounded-4xl border border-border bg-card p-6">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						The result
					</p>
					<h2 className="mt-3 text-xl font-semibold text-foreground">
						Essentials you’ll reach for
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Strong materials, thoughtful details, and a style that stays
						consistent.
					</p>
				</div>
			</section>

			{/* Values */}
			<section className="space-y-6">
				<div className="max-w-2xl">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						Core values
					</p>
					<h2 className="mt-3 text-2xl font-semibold text-foreground">
						What we stand for
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						We build products around three promises: quality you can feel,
						comfort you’ll notice, and style that fits your day.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<div className="rounded-4xl border border-border bg-card p-6">
						<h3 className="text-lg font-semibold">Quality</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Premium materials and careful craftsmanship.
						</p>
					</div>
					<div className="rounded-4xl border border-border bg-card p-6">
						<h3 className="text-lg font-semibold">Comfort</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Thoughtful fit for all-day wear.
						</p>
					</div>
					<div className="rounded-4xl border border-border bg-card p-6">
						<h3 className="text-lg font-semibold">Style</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Clean design that matches your vibe.
						</p>
					</div>
				</div>
			</section>

			{/* Social proof */}
			<SocialProof />

			{/* CTA */}
			<section className="rounded-4xl border border-border bg-card p-10 sm:p-14">
				<div className="max-w-2xl space-y-4">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						Next step
					</p>
					<h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
						Shop the essentials
					</h2>
					<p className="text-base text-muted-foreground">
						Browse collections curated for comfort, quality, and everyday style.
					</p>
				</div>
			</section>
		</div>
	);
}
