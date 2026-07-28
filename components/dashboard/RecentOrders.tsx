import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/order";
import { Eye } from "lucide-react";
import Link from "next/link";

type Props = {
	orders: Order[];
};

const statusConfig: Record<
	OrderStatus,
	{
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
	}
> = {
	pending: { label: "Pending", variant: "outline" },
	processing: { label: "Processing", variant: "default" },
	shipped: { label: "Shipped", variant: "secondary" },
	delivered: { label: "Delivered", variant: "secondary" },
	cancelled: { label: "Cancelled", variant: "destructive" },
};

const RecentOrders = ({ orders }: Props) => {
	return (
		<div className="lg:col-span-2 space-y-4">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Recent Orders</CardTitle>
						<Link href="/dashboard/orders">
							<Button variant="outline" size="sm" className="cursor-pointer">
								<Eye className="size-3.5 mr-1" />
								View All Orders
							</Button>
						</Link>
					</div>
				</CardHeader>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-border">
									<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
										Order
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
										Date
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
										Status
									</th>
									<th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
										Total
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{orders.map((order: Order) => (
									<tr
										key={order.id}
										className="hover:bg-muted/30 transition-colors"
									>
										<td className="px-4 py-3 font-mono text-xs font-medium">
											#{order.id}
										</td>
										<td className="px-4 py-3 text-muted-foreground text-xs">
											{formatDate(order.createdAt)}
										</td>
										<td className="px-4 py-3 hidden sm:table-cell">
											<Badge variant={statusConfig[order.orderStatus].variant}>
												{statusConfig[order.orderStatus].label}
											</Badge>
										</td>
										<td className="px-4 py-3 text-right font-medium">
											${order.total.toFixed(2)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RecentOrders;
