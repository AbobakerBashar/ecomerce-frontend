"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HeroSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.7, ease: "easeOut" }}
			className="relative min-h-[85vh] w-full overflow-hidden rounded-4xl mt-2"
		>
			<motion.div
				initial={{ scale: 1.05, opacity: 0.8 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1.2, ease: "easeOut" }}
				className="absolute inset-0"
			>
				<Image
					src="/images/hero-3.jpg"
					alt="Stylish lifestyle essentials background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/20 to-slate-950/80" />
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
				className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-16 lg:px-8"
			>
				<div className="max-w-2xl space-y-6 text-white">
					<Badge className="inline-flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-4 text-sm font-semibold backdrop-blur-sm">
						<Star
							className="h-4 w-4 text-primary"
							fill=" oklch(0.69 0.23 285)"
						/>
						New arrivals dropped today
					</Badge>

					<motion.h1
						initial={{ opacity: 0, y: 32 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.05]"
					>
						Elevate your everyday style with pieces made to move through every
						day.
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
						className="text-base sm:text-lg md:leading-8 text-slate-200/90"
					>
						Discover premium essentials designed for comfort, polish, and
						effortless layering all season long.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
						className="flex flex-wrap items-center gap-4"
					>
						<Link
							href="/collections?sort=newest"
							className="rounded-full px-6 shadow-lg shadow-slate-950/20 bg-primary hover:shadow-xl text-white inline-flex items-center gap-1 transition py-2"
						>
							Shop new arrivals
							<ShoppingBag className="ml-2 h-4 w-4" />
						</Link>
						<Link href="/collections">
							<Button
								variant="ghost"
								size="lg"
								className="rounded-full border border-white/20 text-white/90 hover:bg-white/10 cursor-pointer"
							>
								Explore collections
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</motion.div>

					<p className="max-w-xl text-sm text-slate-200/80">
						Free shipping on all orders over $100 · 30-day hassle-free returns ·
						support available 24/7.
					</p>
				</div>

				<motion.div
					initial={{ opacity: 0, scale: 0.98, y: 24 }}
					whileInView={{ opacity: 1, scale: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
					className="hidden rounded-4xl border border-white/20 bg-slate-950/50 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl lg:block lg:w-md"
				>
					<p className="text-sm uppercase tracking-[0.28em] text-primary/90">
						Featured drop
					</p>
					<h2 className="mt-3 text-3xl font-semibold text-white">
						The Capsule Collection
					</h2>
					<p className="mt-3 text-sm leading-7 text-slate-200/80">
						Limited-run essentials designed to look effortless in any setting.
					</p>
					<Link href="/collections">
						<Button className="mt-6 rounded-full px-6 bg-white text-slate-950 hover:bg-slate-100 cursor-pointer">
							View the collection
						</Button>
					</Link>
				</motion.div>
			</motion.div>
		</motion.section>
	);
}
