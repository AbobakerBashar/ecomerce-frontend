"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUser } from "@/hooks/user";
import { formatDate } from "@/lib/utils";
import type { OrderStatus, PaymentStatus } from "@/types/order";
import {
	Package,
	Truck,
	CheckCircle2,
	Heart,
	Eye,
	User,
	Mail,
	Phone,
	Calendar,
	MapPin,
	Pencil,
	Store,
	FileText,
	Settings,
	MapPinned,
	Lock,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

// ── Demo / mock orders ─────────────────────────────────────────────────────
const MOCK_ORDERS = [
	{
		id: "ORD-12345",
		total: 84.5,
		paymentStatus: "paid" as PaymentStatus,
		orderStatus: "delivered" as OrderStatus,
		shippingAddress: {
			fullName: "John Doe",
			email: "john@example.com",
			phone: "+1 (555) 123-4567",
			address: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
			country: "US",
		},
		items: [
			{
				id: "item-1",
				name: "Classic White Sneakers",
				price: 84.5,
				quantity: 1,
				color: "White",
				size: "42",
				images: ["/products/shoes-1.jpg"],
			},
		],
		createdAt: "2026-07-20T10:30:00Z",
	},
	{
		id: "ORD-12344",
		total: 39.99,
		paymentStatus: "paid" as PaymentStatus,
		orderStatus: "shipped" as OrderStatus,
		shippingAddress: {
			fullName: "John Doe",
			email: "john@example.com",
			phone: "+1 (555) 123-4567",
			address: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
			country: "US",
		},
		items: [
			{
				id: "item-2",
				name: "Wireless Earbuds",
				price: 39.99,
				quantity: 1,
				color: "Black",
				size: "",
				images: ["/products/electronics-1.jpg"],
			},
		],
		createdAt: "2026-07-18T14:15:00Z",
	},
	{
		id: "ORD-12343",
		total: 149.99,
		paymentStatus: "paid" as PaymentStatus,
		orderStatus: "processing" as OrderStatus,
		shippingAddress: {
			fullName: "John Doe",
			email: "john@example.com",
			phone: "+1 (555) 123-4567",
			address: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
			country: "US",
		},
		items: [
			{
				id: "item-3",
				name: "Women's Leather Handbag",
				price: 149.99,
				quantity: 1,
				color: "Brown",
				size: "",
				images: ["/products/bags-1.jpg"],
			},
		],
		createdAt: "2026-07-15T09:00:00Z",
	},
	{
		id: "ORD-12342",
		total: 224.99,
		paymentStatus: "paid" as PaymentStatus,
		orderStatus: "delivered" as OrderStatus,
		shippingAddress: {
			fullName: "John Doe",
			email: "john@example.com",
			phone: "+1 (555) 123-4567",
			address: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
			country: "US",
		},
		items: [
			{
				id: "item-4",
				name: "Wireless Noise Cancelling Headphones",
				price: 224.99,
				quantity: 1,
				color: "Black",
				size: "",
				images: ["/products/electronics-2.jpg"],
			},
		],
		createdAt: "2026-07-10T11:45:00Z",
	},
	{
		id: "ORD-12341",
		total: 76.49,
		paymentStatus: "paid" as PaymentStatus,
		orderStatus: "delivered" as OrderStatus,
		shippingAddress: {
			fullName: "John Doe",
			email: "john@example.com",
			phone: "+1 (555) 123-4567",
			address: "123 Main Street",
			city: "New York",
			state: "NY",
			zip: "10001",
			country: "US",
		},
		items: [
			{
				id: "item-5",
				name: "Running Shoes Pro",
				price: 76.49,
				quantity: 1,
				color: "Blue",
				size: "43",
				images: ["/products/shoes-2.jpg"],
			},
		],
		createdAt: "2026-07-05T16:20:00Z",
	},
];

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

export default function DashboardPage() {
	const { data: userRes, isLoading: userLoading } = useGetUser();
	const user = userRes?.user;

	const stats = useMemo(() => {
		const total = MOCK_ORDERS.length;
		const inProgress = MOCK_ORDERS.filter(
			(o) =>
				o.orderStatus === "pending" ||
				o.orderStatus === "processing" ||
				o.orderStatus === "shipped",
		).length;
		const completed = MOCK_ORDERS.filter(
			(o) => o.orderStatus === "delivered",
		).length;
		const wishlistCount = 7;

		return { total, inProgress, completed, wishlistCount };
	}, []);

	const recentOrders = MOCK_ORDERS.slice(0, 5);

	return (
		<div className="space-y-6">
			{/* ── Page Header ────────────────────────────────────────────────── */}
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Welcome back
					{user?.name ? `, ${user.name}` : ""}! Here&apos;s an overview of your
					account.
				</p>
			</div>

			{/* ── Top Summary Cards ──────────────────────────────────────────── */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<SummaryCard
					icon={<Package className="size-5" />}
					label="Total Orders"
					value={stats.total}
					iconBg="bg-blue-500/10"
					iconColor="text-blue-600 dark:text-blue-400"
				/>
				<SummaryCard
					icon={<Truck className="size-5" />}
					label="In Progress"
					value={stats.inProgress}
					iconBg="bg-amber-500/10"
					iconColor="text-amber-600 dark:text-amber-400"
				/>
				<SummaryCard
					icon={<CheckCircle2 className="size-5" />}
					label="Completed"
					value={stats.completed}
					iconBg="bg-emerald-500/10"
					iconColor="text-emerald-600 dark:text-emerald-400"
				/>
				<SummaryCard
					icon={<Heart className="size-5" />}
					label="Wishlist Items"
					value={stats.wishlistCount}
					iconBg="bg-rose-500/10"
					iconColor="text-rose-600 dark:text-rose-400"
				/>
			</div>

			{/* ── Two-column layout: Orders (2/3) + Account (1/3) ─────────── */}
			<div className="grid gap-6 lg:grid-cols-3">
				{/* ── Recent Orders ──────────────────────────────────────────── */}
				<div className="lg:col-span-2 space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle>Recent Orders</CardTitle>
								<Link href="/dashboard/orders">
									<Button
										variant="outline"
										size="sm"
										className="cursor-pointer"
									>
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
										{recentOrders.map((order) => (
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
													<Badge
														variant={statusConfig[order.orderStatus].variant}
													>
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

				{/* ── Right Column ────────────────────────────────────────────── */}
				<div className="space-y-4">
					{/* ── Account Information ──────────────────────────────────── */}
					<Card>
						<CardHeader>
							<CardTitle>Account Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{userLoading ? (
								<div className="space-y-3">
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-2/3" />
									<Skeleton className="h-4 w-1/2" />
								</div>
							) : (
								<>
									<InfoRow
										icon={<User className="size-4" />}
										label="Name"
										value={user?.name || "Demo User"}
									/>
									<Separator />
									<InfoRow
										icon={<Mail className="size-4" />}
										label="Email"
										value={user?.email || "demo@example.com"}
									/>
									<Separator />
									<InfoRow
										icon={<Phone className="size-4" />}
										label="Phone"
										value="+1 (555) 123-4567"
									/>
									<Separator />
									<InfoRow
										icon={<Calendar className="size-4" />}
										label="Joined"
										value={
											user?.createdAt
												? formatDate(user.createdAt)
												: "January 2026"
										}
									/>
								</>
							)}
						</CardContent>
					</Card>

					{/* ── Saved Addresses ──────────────────────────────────────── */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle>Saved Addresses</CardTitle>
								<Link href="/dashboard/addresses">
									<Button
										variant="outline"
										size="xs"
										className="cursor-pointer"
									>
										<Pencil className="size-3 mr-1" />
										Edit
									</Button>
								</Link>
							</div>
						</CardHeader>
						<CardContent>
							<div className="flex gap-3">
								<div className="mt-0.5 shrink-0 text-muted-foreground">
									<MapPin className="size-4" />
								</div>
								<div className="space-y-1 text-sm">
									<p className="font-medium">John Doe</p>
									<p className="text-muted-foreground">
										123 Main Street
										<br />
										New York, NY 10001
										<br />
										United States
									</p>
									<p className="text-muted-foreground">
										Phone: +1 (555) 123-4567
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* ── Quick Actions ──────────────────────────────────────────────── */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
						<QuickActionButton
							icon={<Store className="size-5" />}
							label="Continue Shopping"
							href="/"
						/>
						<QuickActionButton
							icon={<FileText className="size-5" />}
							label="View Orders"
							href="/dashboard/orders"
						/>
						<QuickActionButton
							icon={<Settings className="size-5" />}
							label="Edit Profile"
							href="/dashboard/settings"
						/>
						<QuickActionButton
							icon={<MapPinned className="size-5" />}
							label="Manage Addresses"
							href="/dashboard/addresses"
						/>
						<QuickActionButton
							icon={<Lock className="size-5" />}
							label="Change Password"
							href="/dashboard/settings"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

// ── Sub-components ──────────────────────────────────────────────────────────

function SummaryCard({
	icon,
	label,
	value,
	iconBg,
	iconColor,
}: {
	icon: React.ReactNode;
	label: string;
	value: number;
	iconBg: string;
	iconColor: string;
}) {
	return (
		<Card>
			<CardContent className="flex items-start gap-4 p-4">
				<div
					className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
				>
					{icon}
				</div>
				<div className="min-w-0">
					<p className="text-xs text-muted-foreground">{label}</p>
					<p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
				</div>
			</CardContent>
		</Card>
	);
}

function InfoRow({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center gap-3">
			<div className="shrink-0 text-muted-foreground">{icon}</div>
			<div className="min-w-0">
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="truncate text-sm font-medium">{value}</p>
			</div>
		</div>
	);
}

function QuickActionButton({
	icon,
	label,
	href,
}: {
	icon: React.ReactNode;
	label: string;
	href: string;
}) {
	return (
		<Link href={href}>
			<Button
				variant="outline"
				className="h-auto w-full flex-col gap-2 py-4 cursor-pointer"
			>
				<div className="text-muted-foreground">{icon}</div>
				<span className="text-xs font-medium">{label}</span>
			</Button>
		</Link>
	);
}
