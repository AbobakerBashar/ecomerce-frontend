import {
	AlertCircle,
	CheckCircle2,
	Clock,
	Eye,
	Package,
	Truck,
	XCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Order, OrderStatus, PaymentStatus } from "@/types/order";
import { formatDate } from "@/lib/utils";

type Props = {
	orders: Order[];
	hasFilters: boolean;
	clearFilters: () => void;
	openOrderDetail: (order: Order) => void;
};

function getItemsSummary(items: Order["items"]) {
	if (!items || items.length === 0) return "No items";
	if (items.length === 1) return `${items[0].name}`;
	return `${items[0].name} +${items.length - 1} more`;
}

const statusConfig: Record<
	OrderStatus,
	{
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
		icon: typeof Clock;
	}
> = {
	pending: { label: "Pending", variant: "outline", icon: Clock },
	processing: { label: "Processing", variant: "default", icon: Package },
	shipped: { label: "Shipped", variant: "secondary", icon: Truck },
	delivered: { label: "Delivered", variant: "secondary", icon: CheckCircle2 },
	cancelled: { label: "Cancelled", variant: "destructive", icon: XCircle },
};

const paymentConfig: Record<
	PaymentStatus,
	{
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
	}
> = {
	pending: { label: "Pending", variant: "outline" },
	paid: { label: "Paid", variant: "secondary" },
	refunded: { label: "Refunded", variant: "default" },
	failed: { label: "Failed", variant: "destructive" },
};

const OrdersList = ({
	orders,
	hasFilters,
	clearFilters,
	openOrderDetail,
}: Props) => {
	return (
		<>
			{orders.length === 0 ? (
				<EmptyState hasFilters={hasFilters} onClear={clearFilters} />
			) : (
				<>
					{/* ── Desktop Table ─────────────────────────────────────────── */}
					<Card className="hidden md:block p-0 overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Order ID</TableHead>
									<TableHead>Items</TableHead>
									<TableHead>Total</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Payment</TableHead>
									<TableHead>Date</TableHead>
									<TableHead className="text-right">Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => {
									const StatusIcon = statusConfig[order.orderStatus].icon;
									return (
										<TableRow key={order.id}>
											<TableCell className="font-mono text-xs font-medium max-w-30 truncate">
												#{order.id.slice(0, 8)}...
											</TableCell>
											<TableCell className="max-w-45 truncate text-muted-foreground">
												{getItemsSummary(order.items)}
											</TableCell>
											<TableCell className="font-medium">
												${order.total?.toFixed(2)}
											</TableCell>
											<TableCell>
												<Badge
													variant={statusConfig[order.orderStatus].variant}
													className="gap-1"
												>
													<StatusIcon className="size-3" />
													{statusConfig[order.orderStatus].label}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge
													variant={paymentConfig[order.paymentStatus].variant}
												>
													{paymentConfig[order.paymentStatus].label}
												</Badge>
											</TableCell>
											<TableCell className="text-muted-foreground text-xs">
												{formatDate(order.createdAt)}
											</TableCell>
											<TableCell className="text-right">
												<Button
													variant="outline"
													size="sm"
													className="cursor-pointer"
													onClick={() => openOrderDetail(order)}
												>
													<Eye className="size-3.5 mr-1" />
													View
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</Card>

					{/* ── Mobile Cards ──────────────────────────────────────────── */}
					<div className="grid gap-3 md:hidden">
						{orders.map((order) => {
							const StatusIcon = statusConfig[order.orderStatus].icon;
							return (
								<Card key={order.id} className="p-4">
									<div className="flex items-start justify-between gap-3">
										<div className="min-w-0 flex-1">
											<p className="font-mono text-xs font-medium truncate">
												#{order.id.slice(0, 12)}...
											</p>
											<p className="mt-1 text-xs text-muted-foreground">
												{formatDate(order.createdAt)}
											</p>
										</div>
										<div className="flex items-center gap-1.5 shrink-0">
											<Badge
												variant={statusConfig[order.orderStatus].variant}
												className="gap-1"
											>
												<StatusIcon className="size-3" />
												{statusConfig[order.orderStatus].label}
											</Badge>
										</div>
									</div>

									<div className="mt-3 flex items-center justify-between">
										<p className="text-sm text-muted-foreground truncate">
											{getItemsSummary(order.items)}
										</p>
										<p className="text-sm font-medium shrink-0 ml-2">
											${order.total?.toFixed(2)}
										</p>
									</div>

									<div className="mt-3 flex items-center justify-between">
										<Badge variant={paymentConfig[order.paymentStatus].variant}>
											{paymentConfig[order.paymentStatus].label}
										</Badge>
										<Button
											variant="outline"
											size="sm"
											className="cursor-pointer"
											onClick={() => openOrderDetail(order)}
										>
											<Eye className="size-3.5 mr-1" />
											Details
										</Button>
									</div>
								</Card>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

export default OrdersList;

function EmptyState({
	hasFilters,
	onClear,
}: {
	hasFilters: boolean;
	onClear: () => void;
}) {
	return (
		<Card className="flex flex-col items-center gap-3 p-10 text-center">
			<div className="flex size-14 items-center justify-center rounded-full bg-muted">
				<AlertCircle className="size-7 text-muted-foreground" />
			</div>
			<div>
				<p className="font-medium">No orders found</p>
				<p className="mt-1 text-sm text-muted-foreground">
					{hasFilters
						? "Try adjusting your search or filter."
						: "You haven't placed any orders yet."}
				</p>
			</div>
			{hasFilters && (
				<Button
					variant="outline"
					size="sm"
					className="cursor-pointer"
					onClick={onClear}
				>
					Clear filters
				</Button>
			)}
		</Card>
	);
}
