"use client";

import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { ContactInput } from "@/types/contact";
import { useSendMessage } from "@/hooks/contact";
import axios from "axios";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Loader } from "lucide-react";

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const stagger: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.12, delayChildren: 0.1 },
	},
};

const FaqItem = ({ q, a }: { q: string; a: string }) => {
	return (
		<details className="group rounded-3xl border border-border bg-card px-5 py-4">
			<summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
				<span className="pr-2 text-primary">+</span>
				{q}
			</summary>
			<p className="mt-3 text-sm text-muted-foreground">{a}</p>
		</details>
	);
};

const ContactPage = () => {
	const [contact, setContact] = useState<ContactInput>({
		name: "",
		email: "",
		message: "",
		type: "General inquiry",
	});

	const [errors, setErrors] = useState<Record<
		keyof ContactInput,
		string
	> | null>(null);
	const [generalError, setGeneralError] = useState("");

	const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setErrors(null);
			setGeneralError("");

			const res = await sendMessage(contact);

			if (res.success) {
				toast.success("Messaged sent successfully!");
				setContact({
					name: "",
					email: "",
					type: "General inquiry",
					message: "",
				});
			} else setGeneralError("Something went wrong!");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data);
				if (error.response?.data?.errors) setErrors(error.response.data.errors);
				else if (error.response?.status === 500)
					setGeneralError("Internal server error!");
				else
					setGeneralError(
						error.response?.data?.message || "Something went wrong!",
					);
			} else setGeneralError("Something went wrong!");
		}
	};

	return (
		<motion.div
			className="space-y-16 py-10"
			initial="hidden"
			animate="visible"
			variants={stagger}
		>
			{/* Hero */}
			<motion.section
				variants={fadeUp}
				className="rounded-4xl border border-border bg-primary/5 p-10 sm:p-14"
			>
				<div className="max-w-2xl space-y-4">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						Contact us
					</p>
					<h1 className="text-3xl sm:text-4xl font-semibold text-foreground">
						We’d love to hear from you
					</h1>
					<p className="text-base text-muted-foreground">
						Our team typically replies within 24 business hours.
					</p>
				</div>
			</motion.section>

			{/* Core layout */}
			<section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
				{/* Column A */}
				<motion.div variants={stagger} className="space-y-6">
					<motion.div
						variants={fadeUp}
						className="rounded-4xl border border-border bg-card p-7"
					>
						<h2 className="text-xl font-semibold text-foreground">
							Direct line
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Choose the fastest way to reach us.
						</p>

						<div className="mt-5 space-y-4">
							<motion.div
								variants={fadeUp}
								className="rounded-3xl border border-border bg-background/60 p-4"
							>
								<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
									Email
								</p>
								<a
									href="mailto:support@example.com"
									className="mt-2 block text-sm font-semibold text-foreground hover:text-primary"
								>
									support@example.com
								</a>
							</motion.div>

							<motion.div
								variants={fadeUp}
								className="rounded-3xl border border-border bg-background/60 p-4"
							>
								<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
									Phone
								</p>
								<a
									href="tel:+15551234567"
									className="mt-2 block text-sm font-semibold text-foreground hover:text-primary"
								>
									+1 (555) 123-4567
								</a>
							</motion.div>

							<motion.div
								variants={fadeUp}
								className="rounded-3xl border border-border bg-background/60 p-4"
							>
								<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
									Hours
								</p>
								<p className="mt-2 text-sm font-semibold text-foreground">
									Mon–Fri, 9am–5pm
								</p>
							</motion.div>
						</div>
					</motion.div>

					<motion.div
						variants={fadeUp}
						className="rounded-4xl border border-border bg-card p-7"
					>
						<p className="text-xs uppercase tracking-[0.35em] text-primary">
							Need help with something specific?
						</p>
						<div className="mt-4 grid gap-3">
							<a
								className="rounded-3xl border border-border bg-background/60 px-4 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
								href="#"
							>
								Shipping & Returns
							</a>
							<a
								className="rounded-3xl border border-border bg-background/60 px-4 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
								href="#"
							>
								Order Support
							</a>
							<a
								className="rounded-3xl border border-border bg-background/60 px-4 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
								href="#"
							>
								Product Questions
							</a>
						</div>
					</motion.div>
				</motion.div>

				{/* Column B */}
				<motion.div variants={stagger} className="space-y-6">
					<motion.div
						variants={fadeUp}
						className="rounded-4xl border border-border bg-card p-7"
					>
						<h2 className="text-xl font-semibold text-foreground">
							Send a message
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Tell us what you need—our team will get back to you.
						</p>

						<form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
							<motion.input
								variants={fadeUp}
								type="text"
								placeholder="Name"
								aria-label="Name"
								value={contact.name}
								onChange={(e) =>
									setContact((c) => ({ ...c, name: e.target.value }))
								}
								className="w-full rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>
							{errors?.name && (
								<p className="text-destructive">{errors.name}</p>
							)}
							<motion.input
								variants={fadeUp}
								type="email"
								placeholder="Email"
								aria-label="Email"
								value={contact.email}
								onChange={(e) =>
									setContact((c) => ({ ...c, email: e.target.value }))
								}
								className="w-full rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>{" "}
							{errors?.email && (
								<p className="text-destructive">{errors.email}</p>
							)}
							<motion.div variants={fadeUp} className="w-full">
								<Select
									value={contact.type}
									onValueChange={(val) =>
										val
											? setContact((c) => ({
													...c,
													type: val,
												}))
											: null
									}
								>
									<SelectTrigger
										aria-label="Subject"
										className="w-full rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 h-auto"
									>
										<SelectValue placeholder="Select a subject">
											{contact.type}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="General inquiry">
											General inquiry
										</SelectItem>
										<SelectItem value="Shipping & returns">
											Shipping & returns
										</SelectItem>
										<SelectItem value="Order support">Order support</SelectItem>
										<SelectItem value="Product questions">
											Product questions
										</SelectItem>
									</SelectContent>
								</Select>{" "}
								{errors?.type && (
									<p className="text-destructive">{errors.type}</p>
								)}
							</motion.div>
							<motion.textarea
								variants={fadeUp}
								placeholder="Message"
								value={contact.message}
								aria-label="Message"
								rows={5}
								onChange={(e) =>
									setContact((c) => ({ ...c, message: e.target.value }))
								}
								className="w-full resize-none rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>{" "}
							{errors?.message && (
								<p className="text-destructive">{errors.message}</p>
							)}
							{generalError && (
								<p className="text-destructive">{generalError}</p>
							)}
							<Separator />
							<motion.div variants={fadeUp}>
								<Button
									type="submit"
									disabled={isSending}
									className="w-full rounded-3xl px-6 py-5 text-base cursor-pointer"
									size="lg"
								>
									{isSending ? (
										<>
											<Loader className="w-4 h-4 animate-spin" />
											Sending..
										</>
									) : (
										"Submit message"
									)}
								</Button>
							</motion.div>
						</form>
					</motion.div>

					<motion.section variants={fadeUp} className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">FAQ</h3>
						<motion.div variants={stagger} className="grid gap-4">
							<motion.div variants={fadeUp}>
								<FaqItem
									q="How fast will I hear back?"
									a="We typically respond within 24 business hours."
								/>
							</motion.div>
							<motion.div variants={fadeUp}>
								<FaqItem
									q="Where are you located?"
									a="We operate globally, with a support team available during Mon–Fri hours."
								/>
							</motion.div>
							<motion.div variants={fadeUp}>
								<FaqItem
									q="Can I change or cancel my order?"
									a="If it hasn’t shipped yet, our team can often help—send your request using the form."
								/>
							</motion.div>
						</motion.div>
					</motion.section>
				</motion.div>
			</section>
		</motion.div>
	);
};

export default ContactPage;
