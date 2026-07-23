"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import type { Order, OrderStatus, PaymentStatus } from "@/types/order";
import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";
import Image from "next/image";

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

export default function OrderDetailContent({ order }: { order: Order }) {
	const StatusIcon = statusConfig[order.orderStatus].icon;
	const PaymentBadge = paymentConfig[order.paymentStatus];

	return (
		<div className="space-y-5">
			{/* Order Header */}
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<p className="text-xs text-muted-foreground">Order ID</p>
					<p className="mt-0.5 break-all font-mono text-sm font-medium">
						{order.id}
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					<Badge variant={statusConfig[order.orderStatus].variant}>
						<StatusIcon className="mr-1 size-3" />
						{statusConfig[order.orderStatus].label}
					</Badge>
					<Badge variant={PaymentBadge.variant}>{PaymentBadge.label}</Badge>
				</div>
			</div>

			<p className="text-xs text-muted-foreground">
				Placed on {formatDate(order.createdAt)}
			</p>

			<Separator />

			{/* Items */}
			<div>
				<h4 className="mb-3 text-sm font-medium">Items</h4>
				<div className="space-y-2">
					{order.items?.map((item) => (
						<div
							key={item.id}
							className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2.5"
						>
							<div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
								{item.images?.[0] ? (
									<Image
										src={item.images[0]}
										alt={item.name}
										fill
										sizes="100%"
										className="size-full object-cover"
									/>
								) : (
									<Package className="size-5 text-muted-foreground" />
								)}
							</div>
							<div className="flex-1 min-w-0">
								<p className="truncate text-sm font-medium">{item.name}</p>
								<p className="text-xs text-muted-foreground">
									Qty: {item.quantity}
									{item.color ? ` · ${item.color}` : ""}
									{item.size ? ` · ${item.size}` : ""}
								</p>
							</div>
							<p className="shrink-0 text-sm font-medium">
								${(item.price * item.quantity).toFixed(2)}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Shipping */}
			<div>
				<h4 className="mb-2 text-sm font-medium">Shipping To</h4>
				<div className="space-y-1 rounded-lg border border-border bg-muted/30 p-3 text-sm">
					<p className="font-medium">{order.shippingAddress.fullName}</p>
					<p className="text-muted-foreground">{order.shippingAddress.email}</p>
					<p className="text-muted-foreground">{order.shippingAddress.phone}</p>
					<p className="mt-1 text-muted-foreground">
						{order.shippingAddress.address}
						<br />
						{order.shippingAddress.city}, {order.shippingAddress.state}{" "}
						{order.shippingAddress.zip}
					</p>
				</div>
			</div>

			<Separator />

			{/* Totals */}
			<div className="space-y-1.5 text-sm">
				<div className="flex items-center justify-between text-base">
					<span className="font-semibold">Total</span>
					<span className="text-lg font-bold">${order.total?.toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
}
