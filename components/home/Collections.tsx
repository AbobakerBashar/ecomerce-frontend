"use client";

import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Package } from "lucide-react";

const featureCards = [
	{
		title: "Everyday essentials",
		description:
			"Minimal design and premium craftsmanship for home, travel, and work.",
		icon: Sparkles,
	},
	{
		title: "Fast, free shipping",
		description:
			"Delivered across the globe with flexible returns and support.",
		icon: Package,
	},
	{
		title: "Trusted by creators",
		description:
			"Loved by more than 20,000 customers for comfort and durability.",
		icon: ShieldCheck,
	},
];

const Collections = () => {
	return (
		<section className="space-y-10">
			<div className="flex flex-col gap-3 text-center">
				<p className="text-sm uppercase tracking-[0.35em] text-primary">
					Why shop with us
				</p>
				<h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
					Designed for every part of your day
				</h2>
				<p className="mx-auto max-w-2xl text-base text-muted-foreground">
					Access modern essentials that blend performance, comfort, and curated
					style.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				{featureCards.map((feature) => {
					const Icon = feature.icon;
					return (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
							className="rounded-3xl border border-border bg-card p-6 shadow-sm"
						>
							<div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<Icon className="h-5 w-5" />
							</div>
							<div className="mt-6 space-y-3">
								<h3 className="text-lg font-semibold text-foreground">
									{feature.title}
								</h3>
								<p className="text-sm leading-6 text-muted-foreground">
									{feature.description}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
};

export default Collections;
