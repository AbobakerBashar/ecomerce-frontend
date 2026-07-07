import { Button } from "@base-ui/react";

const Contact = () => {
	return (
		<section className="rounded-4xl border border-border bg-primary/5 p-10 sm:p-14">
			<div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
				<div className="space-y-4">
					<p className="text-sm uppercase tracking-[0.35em] text-primary">
						Stay in the loop
					</p>
					<h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
						Get early access to the next drop.
					</h2>
					<p className="max-w-xl text-base text-muted-foreground">
						Join our newsletter and receive exclusive offers, product launches,
						and styling inspiration.
					</p>
				</div>

				<form className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
					<input
						type="email"
						placeholder="Enter your email"
						className="w-full rounded-3xl border border-border bg-background/90 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
						aria-label="Email address"
					/>
					<Button
						type="submit"
						className="rounded-3xl px-6 py-4 text-sm bg-primary text-primary-foreground transition hover:bg-primary/90"
					>
						Subscribe
					</Button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
