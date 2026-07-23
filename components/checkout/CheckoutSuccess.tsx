import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { OrderResponse } from "@/types/order";
import Image from "next/image";

export default function CheckoutSuccess({
	order,
}: {
	order: OrderResponse["order"];
}) {
	return (
		<div className="space-y-6">
			{/* Success Banner */}
			<div className="flex flex-col items-center gap-3 rounded-xl bg-green-50 px-6 py-10 text-center dark:bg-green-950/20">
				<div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
					<CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
				</div>
				<div>
					<h1 className="text-2xl font-semibold text-foreground">
						Order Confirmed!
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Thank you for your purchase. Your order has been placed and is being
						processed.
					</p>
				</div>
			</div>

			{/* Order Info */}
			<Card className="p-5">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div>
						<p className="text-xs text-muted-foreground">Order number</p>
						<p className="text-lg font-semibold tracking-tight">{order.id}</p>
					</div>
				</div>
			</Card>

			{/* Order Items */}
			<Card className="p-5">
				<h2 className="text-base font-semibold text-foreground">Order Items</h2>
				<Separator className="my-4" />

				<div className="space-y-3">
					{order.items.map((item) => (
						<div
							key={item.id}
							className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-3"
						>
							{/* Thumbnail */}
							<div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
								{item.images?.[0] ? (
									<Image
										src={item.images[0]}
										alt={item.name}
										fill
										sizes="100%"
										className="size-full object-cover"
									/>
								) : (
									<Package className="size-6 text-muted-foreground" />
								)}
							</div>

							{/* Details */}
							<div className="flex-1 min-w-0">
								<p className="truncate text-sm font-medium">{item.name}</p>
								<p className="text-xs text-muted-foreground">
									Qty: {item.quantity}
									{item.color ? ` · ${item.color}` : ""}
									{item.size ? ` · ${item.size}` : ""}
								</p>
							</div>

							{/* Price */}
							<p className="shrink-0 text-sm font-medium">
								${(item.price * item.quantity).toFixed(2)}
							</p>
						</div>
					))}
				</div>

				<Separator className="my-4" />

				{/* Totals */}
				<div className="space-y-1.5 text-sm">
					<Separator className="my-2" />
					<div className="flex items-center justify-between text-base">
						<span className="font-semibold">Total</span>
						<span className="text-lg font-bold">
							${order.total?.toFixed(2)}
						</span>
					</div>
				</div>
			</Card>

			{/* Shipping Details (Demo) */}
			<Card className="p-5">
				<h2 className="text-base font-semibold text-foreground">Shipping To</h2>
				<Separator className="my-4" />
				<div className="space-y-1 text-sm">
					<p className="font-medium">{order.shippingAddress.fullName}</p>
					<p className="text-muted-foreground">{order.shippingAddress.email}</p>
					<p className="text-muted-foreground">{order.shippingAddress.phone}</p>
					<p className="mt-2 text-muted-foreground">
						{order.shippingAddress.address}
						<br />
						{order.shippingAddress.city}, {order.shippingAddress.zip}
						<br />
						United States
					</p>
				</div>
			</Card>

			{/* Actions */}
			<div className="flex flex-col gap-3 sm:flex-row">
				<Link href="/collections" className="flex-1">
					<Button className="w-full cursor-pointer">
						<ShoppingBag className="size-4" />
						Continue Shopping
					</Button>
				</Link>
				<Link href="/dashboard/orders" className="flex-1">
					<Button variant="outline" className="w-full cursor-pointer">
						View Orders
					</Button>
				</Link>
			</div>
		</div>
	);
}
