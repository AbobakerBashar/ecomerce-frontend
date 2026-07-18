import CartContent from "@/components/cart/CartContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cart",
	description: "Review items, adjust quantities, and proceed to checkout.",
};

export default function CartPage() {
	return (
		<div className="mx-auto max-w-6xl space-y-8 py-6">
			<div className="space-y-3">
				<h1 className="text-3xl font-semibold text-foreground">Your Cart</h1>
				<p className="text-sm text-muted-foreground">
					Review items, adjust quantities, and proceed to checkout.
				</p>
			</div>
			<CartContent />
		</div>
	);
}
