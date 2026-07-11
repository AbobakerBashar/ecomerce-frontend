"use client";

import React, { useMemo, useState } from "react";
import KpiCard from "./KpiCard";
import StatusBadge from "./StatusBadge";
import MiniLineChart from "./MiniLineChart";
import { Card } from "../ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import type { AdminSearchItem } from "./AdminTopBar";

const recentOrders = [
	{
		id: "ORD-10492",
		customer: "Ava Johnson",
		amount: 248.5,
		status: "pending",
	},
	{ id: "ORD-10491", customer: "Noah Williams", amount: 89.99, status: "paid" },
	{
		id: "ORD-10490",
		customer: "Mia Rodriguez",
		amount: 134.99,
		status: "shipped",
	},
	{
		id: "ORD-10489",
		customer: "Sophia Brown",
		amount: 379.99,
		status: "pending",
	},
	{
		id: "ORD-10488",
		customer: "Liam Martinez",
		amount: 76.49,
		status: "canceled",
	},
];

const lowStock = [
	{ name: "Classic White Sneakers", sku: "NK-SNK-001", stock: 8 },
	{ name: "Women's Leather Handbag", sku: "MK-BAG-003", stock: 4 },
	{ name: "Apple Watch Series", sku: "APL-WTC-004", stock: 6 },
];

const chartValues = [
	1200, 1300, 1050, 1600, 1550, 1700, 1650, 1820, 1760, 1900, 2005, 1950, 2100,
	2050, 2190, 2300, 2250, 2410, 2380, 2500, 2600, 2550, 2700, 2750, 2680, 2820,
	2900, 3050, 2980, 3120,
];

export default function AdminDashboardHome() {
	const [search, setSearch] = useState("");

	// kept for future wiring with the top-bar search
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const searchItems: AdminSearchItem[] = useMemo(() => {
		return [
			...recentOrders.map((o) => ({
				kind: "order" as const,
				id: o.id,
				label: `${o.id} • ${o.customer}`,
			})),
			{ kind: "product", id: "NK-SNK-001", label: "Classic White Sneakers" },
			{ kind: "product", id: "MK-BAG-003", label: "Women's Leather Handbag" },
			{ kind: "product", id: "APL-WTC-004", label: "Apple Watch Series" },
			{
				kind: "customer",
				id: "ava@demo.com",
				label: "Ava Johnson • ava@demo.com",
			},
		];
	}, []);

	const filteredOrders = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return recentOrders;
		return recentOrders.filter((o) => {
			return (
				o.id.toLowerCase().includes(q) ||
				o.customer.toLowerCase().includes(q) ||
				String(o.amount).includes(q)
			);
		});
	}, [search]);

	return (
		<div className="space-y-6">
			{/* KPI row */}
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<KpiCard
					title="Total Sales"
					value="$1,250"
					subtitle="Today"
					trend={6.2}
					variant="success"
				/>
				<KpiCard
					title="Active Orders"
					value="14"
					subtitle="Awaiting shipment"
					trend={-2.4}
					variant="warning"
				/>
				<KpiCard
					title="Abandoned Carts"
					value="5"
					subtitle="Left behind today"
					trend={1.1}
					variant="warning"
				/>
				<KpiCard
					title="New Customers"
					value="8"
					subtitle="Signed up today"
					trend={9.8}
					variant="success"
				/>
			</div>

			{/* Chart + quick search hint */}
			<div className="grid gap-4 lg:grid-cols-[1fr_26rem]">
				<MiniLineChart
					values={chartValues}
					labels={["-30", "-20", "-10", "Now"]}
				/>

				<Card className="rounded-xl border bg-background/60 p-4 shadow-sm">
					<p className="text-sm font-semibold">Global search</p>
					<p className="mt-1 text-xs text-muted-foreground">
						Type at the top bar to filter recent orders.
					</p>
					<Separator className="my-3" />

					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Filter recent orders..."
						className="h-10"
					/>

					<div className="mt-4 space-y-3">
						<p className="text-xs font-medium text-muted-foreground">Matches</p>
						<div className="flex flex-wrap gap-2">
							{filteredOrders.slice(0, 4).map((o) => (
								<Badge
									key={o.id}
									variant={
										o.status === "canceled" ? "destructive" : "secondary"
									}
									className="cursor-pointer"
									onClick={() => setSearch(o.id)}
								>
									{o.id}
								</Badge>
							))}
							{filteredOrders.length === 0 ? (
								<p className="text-xs text-muted-foreground">No results.</p>
							) : null}
						</div>
					</div>
				</Card>
			</div>

			{/* Recent activity */}
			<div className="grid gap-4 lg:grid-cols-[1fr_26rem]">
				<Card className="rounded-xl border bg-background/60 p-4 shadow-sm">
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="text-sm font-semibold">Recent Orders</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Last actions across the store
							</p>
						</div>
						<span className="text-xs text-muted-foreground">Snapshot</span>
					</div>

					<div className="mt-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[120px]">Order ID</TableHead>
									<TableHead>Customer</TableHead>
									<TableHead className="text-right">Amount</TableHead>
									<TableHead className="w-[120px]">Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredOrders.map((o) => (
									<TableRow key={o.id}>
										<TableCell className="font-medium">{o.id}</TableCell>
										<TableCell>{o.customer}</TableCell>
										<TableCell className="text-right">
											${o.amount.toFixed(2)}
										</TableCell>
										<TableCell>
											<StatusBadge status={o.status} />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>

				<Card className="rounded-xl border bg-background/60 p-4 shadow-sm">
					<p className="text-sm font-semibold">Low Stock Alerts</p>
					<p className="mt-1 text-xs text-muted-foreground">
						Reorder to avoid delays
					</p>
					<Separator className="my-3" />

					<div className="space-y-3">
						{lowStock.map((p) => {
							const variant =
								p.stock <= 5 ? "danger" : p.stock <= 8 ? "warning" : "default";
							const badgeVariant =
								variant === "danger"
									? "destructive"
									: variant === "warning"
										? "secondary"
										: ("default" as const);
							return (
								<div
									key={p.sku}
									className="rounded-lg border border-border/70 p-3"
								>
									<div className="flex items-start justify-between gap-3">
										<div>
											<p className="text-sm font-medium">{p.name}</p>
											<p className="mt-1 text-xs text-muted-foreground">
												SKU: {p.sku}
											</p>
										</div>
										<Badge variant={badgeVariant}>{p.stock} left</Badge>
									</div>
								</div>
							);
						})}
					</div>
				</Card>
			</div>
		</div>
	);
}
