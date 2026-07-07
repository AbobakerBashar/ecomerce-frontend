import { Button } from "@base-ui/react";

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
	return (
		<div className="space-y-16 py-10">
			{/* Hero */}
			<section className="rounded-4xl border border-border bg-primary/5 p-10 sm:p-14">
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
			</section>

			{/* Core layout */}
			<section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
				{/* Column A */}
				<div className="space-y-6">
					<div className="rounded-4xl border border-border bg-card p-7">
						<h2 className="text-xl font-semibold text-foreground">
							Direct line
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Choose the fastest way to reach us.
						</p>

						<div className="mt-5 space-y-4">
							<div className="rounded-3xl border border-border bg-background/60 p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
									Email
								</p>
								<a
									href="mailto:support@example.com"
									className="mt-2 block text-sm font-semibold text-foreground hover:text-primary"
								>
									support@example.com
								</a>
							</div>

							<div className="rounded-3xl border border-border bg-background/60 p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
									Phone
								</p>
								<a
									href="tel:+15551234567"
									className="mt-2 block text-sm font-semibold text-foreground hover:text-primary"
								>
									+1 (555) 123-4567
								</a>
							</div>

							<div className="rounded-3xl border border-border bg-background/60 p-4">
								<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
									Hours
								</p>
								<p className="mt-2 text-sm font-semibold text-foreground">
									Mon–Fri, 9am–5pm
								</p>
							</div>
						</div>
					</div>

					<div className="rounded-4xl border border-border bg-card p-7">
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
					</div>
				</div>

				{/* Column B */}
				<div className="space-y-6">
					<div className="rounded-4xl border border-border bg-card p-7">
						<h2 className="text-xl font-semibold text-foreground">
							Send a message
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Tell us what you need—our team will get back to you.
						</p>

						<form className="mt-6 grid gap-4">
							<input
								type="text"
								placeholder="Name"
								aria-label="Name"
								className="w-full rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>
							<input
								type="email"
								placeholder="Email"
								aria-label="Email"
								className="w-full rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>
							<select
								aria-label="Subject"
								className="w-full rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
								defaultValue="general"
							>
								<option value="general">General inquiry</option>
								<option value="shipping">Shipping & returns</option>
								<option value="orders">Order support</option>
								<option value="products">Product questions</option>
							</select>
							<textarea
								placeholder="Message"
								aria-label="Message"
								rows={5}
								className="w-full resize-none rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>

							<Button
								type="submit"
								className="rounded-3xl px-6 py-4 text-sm bg-primary text-primary-foreground transition hover:bg-primary/90"
							>
								Submit message
							</Button>
						</form>
					</div>

					<section className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">FAQ</h3>
						<div className="grid gap-4">
							<FaqItem
								q="How fast will I hear back?"
								a="We typically respond within 24 business hours."
							/>
							<FaqItem
								q="Where are you located?"
								a="We operate globally, with a support team available during Mon–Fri hours."
							/>
							<FaqItem
								q="Can I change or cancel my order?"
								a="If it hasn’t shipped yet, our team can often help—send your request using the form."
							/>
						</div>
					</section>
				</div>
			</section>
		</div>
	);
};

export default ContactPage;
