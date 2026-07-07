import CheckoutUI from "@/components/checkout/CheckoutUI";

export default function CheckoutPage() {
	return (
		<div className="mx-auto max-w-6xl space-y-8 py-6">
			<div className="space-y-3">
				<h1 className="text-3xl font-semibold text-foreground">Checkout</h1>
				<p className="text-sm text-muted-foreground">
					Review your details and confirm your order.
				</p>
			</div>
			<CheckoutUI />
		</div>
	);
}
