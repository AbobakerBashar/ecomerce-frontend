"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
	return (
		<section className="relative min-h-full w-full overflow-hidden py-8">
			<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
				<div className="space-y-8 max-w-2xl">
					<div className="inline-flex items-center gap-3 rounded-full border border-border bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
						<Star className="h-4 w-4" />
						New arrivals dropped today
					</div>

					<motion.h1
						initial={{ opacity: 0, y: 32 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]"
					>
						Elevate your everyday style with thoughtfully designed essentials.
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
						className="text-base sm:text-lg text-muted-foreground max-w-xl leading-8"
					>
						Discover premium quality gear built for modern living — from
						work-ready carry to warm layers and elevated home accents.
					</motion.p>

					<div className="flex flex-wrap items-center gap-4">
						<Button size="lg" className="rounded-full px-6">
							Shop new arrivals
							<ShoppingBag className="ml-2 h-4 w-4" />
						</Button>
						<Button variant="ghost" size="lg" className="rounded-full">
							Explore collections
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>

					<p className="text-sm text-muted-foreground">
						Free shipping on all orders over $100 · 30-day hassle-free returns ·
						Support available 24/7.
					</p>
				</div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95, x: 40 }}
					whileInView={{ opacity: 1, scale: 1, x: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="relative overflow-hidden rounded-4xl border border-border bg-card/70 p-4 shadow-[0_30px_120px_rgba(15,23,42,0.15)] backdrop-blur-sm sm:p-6"
				>
					<div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />
					<div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.6rem] bg-muted/60">
						<Image
							src="/images/hero-3.jpg"
							alt="Lifestyle essentials display"
							fill
							className="object-cover object-center"
							sizes="(max-width: 1024px) 100vw, 40vw"
						/>
					</div>
					<div className="mt-6 rounded-3xl border border-border/70 bg-background/90 p-6 shadow-sm">
						<p className="text-sm uppercase tracking-[0.28em] text-primary">
							Featured drop
						</p>
						<h2 className="mt-3 text-3xl font-semibold text-foreground">
							The Capsule Collection
						</h2>
						<p className="mt-3 text-sm leading-7 text-muted-foreground">
							Limited-run essentials designed to look effortless in any setting.
						</p>
						<Button className="mt-6 rounded-full px-6">
							View the collection
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
