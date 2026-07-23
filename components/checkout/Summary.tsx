import { CartItem } from "@/types/cart";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface SummaryProps {
	items: CartItem[];
	totals: {
		subtotal: number;
		shipping: number;
		tax: number;
		total: number;
	};
}

const Summary = ({ items, totals }: SummaryProps) => {
	return (
		<div className="space-y-4">
			<Card className="p-5">
				<h2 className="text-base font-semibold text-foreground">
					Order Summary
				</h2>
				<Separator className="my-4" />

				<div className="space-y-3 text-sm">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between gap-3"
						>
							<span className="text-muted-foreground">
								{item.name} × {item.quantity}
							</span>
							<span className="font-medium">
								${(item.price * item.quantity).toFixed(2)}
							</span>
						</div>
					))}
				</div>

				<Separator className="my-4" />

				<div className="space-y-2 text-sm">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Subtotal</span>
						<span className="font-medium">${totals.subtotal.toFixed(2)}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Shipping</span>
						<span className="font-medium">
							{totals.shipping === 0
								? "Free"
								: `$${totals.shipping.toFixed(2)}`}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Estimated tax</span>
						<span className="font-medium">${totals.tax.toFixed(2)}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Total</span>
						<span className="text-lg font-semibold">
							${totals.total.toFixed(2)}
						</span>
					</div>
				</div>
			</Card>

			<Card className="p-5">
				<h2 className="text-base font-semibold text-foreground">Delivery</h2>
				<Separator className="my-4" />
				<p className="text-sm text-muted-foreground">
					Free shipping on orders over $50. Delivery time is estimated and will
					be confirmed after payment.
				</p>
			</Card>
		</div>
	);
};

export default Summary;
