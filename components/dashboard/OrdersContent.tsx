"use client";

import { useCallback, useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Order, OrderStatus } from "@/types/order";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OrderDetailContent from "./OrderDetailContent";
import OrdersHerder from "./OrdersHerder";
import OrdersList from "./OrdersList";
import OrdersStatus from "./OrdersStatus";
import OrdersTabs from "./OrdersTabs";

export default function OrdersContent({ orders }: { orders: Order[] }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const searchQuery = searchParams.get("q") || "";
	const activeTab = searchParams.get("status") || "all";

	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	const hasFilters = activeTab !== "all" || searchQuery.trim().length > 0;

	const clearFilters = useCallback(() => {
		router.replace(pathname, { scroll: false });
	}, [pathname, router]);

	function openOrderDetail(order: Order) {
		setSelectedOrder(order);
		setDialogOpen(true);
	}

	const updateQuery = useCallback(
		(value: string) => {
			const currentQuery = searchParams.toString();
			const next = new URLSearchParams(searchParams.toString());

			if (value) {
				next.delete("status");
				next.set("q", value);
			} else {
				next.delete("q");
			}

			const queryString = next.toString();
			if (currentQuery === queryString) return;

			router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
				scroll: false,
			});
		},
		[pathname, router, searchParams],
	);

	const updateActiveTab = useCallback(
		(val?: OrderStatus | "all") => {
			const currentQuery = searchParams.toString();
			const next = new URLSearchParams(searchParams.toString());

			next.delete("q");
			if (val === "all" || !val) {
				next.delete("status");
			} else {
				next.set("status", val);
			}

			const queryString = next.toString();
			if (currentQuery === queryString) return;

			router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
				scroll: false,
			});
		},
		[searchParams, router, pathname],
	);

	// ── Render ─────────────────────────────────────────────────────────────
	return (
		<div className="space-y-5">
			{/* Stats Cards */}
			<OrdersStatus orders={orders} />

			{/* Header / Search */}
			<OrdersHerder updateQuery={updateQuery} searchQ={searchQuery} />

			{/* Tabs */}
			<OrdersTabs updateActiveTab={updateActiveTab} activeTab={activeTab} />

			{/* Orders List */}
			<OrdersList
				orders={orders}
				hasFilters={hasFilters}
				clearFilters={clearFilters}
				openOrderDetail={openOrderDetail}
			/>

			{/* ── Order Detail Dialog ────────────────────────────────────────── */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Order Details</DialogTitle>
						<DialogDescription>
							Complete information about this order.
						</DialogDescription>
					</DialogHeader>

					{selectedOrder && <OrderDetailContent order={selectedOrder} />}
				</DialogContent>
			</Dialog>
		</div>
	);
}
