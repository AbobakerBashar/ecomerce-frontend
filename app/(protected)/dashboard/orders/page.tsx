import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
	return (
		<div className="space-y-4">
			<Card className="p-4">
				<h2 className="text-lg font-semibold">Orders</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Track your purchase history.
				</p>
			</Card>

			<div className="grid gap-4 md:grid-cols-2">
				<Card className="p-4">
					<p className="text-sm font-medium">Order #1042</p>
					<p className="mt-1 text-xs text-muted-foreground">Processing</p>
					<div className="mt-3 flex items-center gap-2">
						<Badge>Processing</Badge>
						<Badge variant="outline">ETA 3-5 days</Badge>
					</div>
				</Card>
				<Card className="p-4">
					<p className="text-sm font-medium">Order #1029</p>
					<p className="mt-1 text-xs text-muted-foreground">Delivered</p>
					<div className="mt-3 flex items-center gap-2">
						<Badge variant="secondary">Delivered</Badge>
						<Badge variant="outline">Completed</Badge>
					</div>
				</Card>
			</div>
		</div>
	);
}
