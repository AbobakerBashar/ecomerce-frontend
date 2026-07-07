import Link from "next/link";
import { Globe, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
	return (
		<footer className="border-t border-border bg-background/80 px-4 py-12 text-sm text-muted-foreground sm:px-8">
			<div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
				<div className="max-w-md space-y-4">
					<p className="text-xl font-semibold text-foreground">
						E-Commerce App
					</p>
					<p className="max-w-sm leading-7">
						Beautifully curated essentials for home, travel and work — designed
						to look effortless every day.
					</p>
				</div>

				<div className="grid gap-8 sm:grid-cols-3">
					<div className="space-y-3">
						<p className="font-semibold text-foreground">Company</p>
						<Link href="/about" className="block hover:text-foreground">
							About
						</Link>
						<Link href="/products" className="block hover:text-foreground">
							Products
						</Link>
						<Link href="/contact" className="block hover:text-foreground">
							Contact
						</Link>
					</div>
					<div className="space-y-3">
						<p className="font-semibold text-foreground">Support</p>
						<Link href="/faq" className="block hover:text-foreground">
							FAQ
						</Link>
						<Link href="/shipping" className="block hover:text-foreground">
							Shipping
						</Link>
						<Link href="/returns" className="block hover:text-foreground">
							Returns
						</Link>
					</div>
					<div className="space-y-3">
						<p className="font-semibold text-foreground">Stay connected</p>
						<div className="flex items-center gap-3">
							<Link
								href="mailto:hello@example.com"
								className="inline-flex items-center gap-2 hover:text-foreground"
							>
								<Mail className="h-4 w-4" />
								hello@example.com
							</Link>
						</div>
						<div className="flex items-center gap-3 text-foreground/70">
							<a
								href="https://example.com"
								aria-label="Visit site"
								className="hover:text-foreground"
							>
								<Globe className="h-5 w-5" />
							</a>
							<a
								href="https://example.com"
								aria-label="External link"
								className="hover:text-foreground"
							>
								<ExternalLink className="h-5 w-5" />
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
				<span className="font-semibold uppercase tracking-[0.3em] text-foreground/80">
					Secure checkout
				</span>
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs font-semibold text-foreground/80">
						Visa
					</span>
					<span className="rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs font-semibold text-foreground/80">
						Mastercard
					</span>
					<span className="rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs font-semibold text-foreground/80">
						Apple Pay
					</span>
					<span className="rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs font-semibold text-foreground/80">
						SSL secured
					</span>
				</div>
			</div>
			<div className="mt-6 border-t border-border pt-6 text-center text-xs text-muted-foreground">
				&copy; {new Date().getFullYear()} E-Commerce App. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
