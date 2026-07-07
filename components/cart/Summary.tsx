import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Summary = ({
	totals,
}: {
	totals: {
		subtotal: number;
		shipping: number;
		tax: number;
		total: number;
	};
}) => {
	return (
		<div className="space-y-4">
			<Card className="p-5">
				<h2 className="text-base font-semibold text-foreground">
					Order Summary
				</h2>
				<div className="mt-4 space-y-3 text-sm">
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
					<Separator />
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Total</span>
						<span className="text-lg font-semibold">
							${totals.total.toFixed(2)}
						</span>
					</div>
				</div>

				<div className="mt-5 space-y-3">
					<div className="space-y-2">
						<label className="text-sm font-medium text-foreground">
							Promo code
						</label>
						<Input placeholder="Enter code" />
					</div>
					<Button className="w-full">Apply</Button>
				</div>
			</Card>
		</div>
	);
};

export default Summary;
