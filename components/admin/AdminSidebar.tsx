"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
	PanelLeft,
	LayoutDashboard,
	Package,
	ShoppingCart,
	Users,
	BarChart3,
	Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
	{
		href: "/admin",
		label: "Dashboard",
		desc: "Overview & KPI",
		icon: LayoutDashboard,
		badge: "Live",
	},
	{
		href: "/admin/products",
		label: "Products",
		desc: "Inventory & pricing",
		icon: Package,
	},
	{
		href: "/admin/orders",
		label: "Orders",
		desc: "Pending & shipped",
		icon: ShoppingCart,
		badge: "3",
	},
	{
		href: "/admin/customers",
		label: "Customers/Users",
		desc: "Accounts & users",
		icon: Users,
	},
	{
		href: "/admin/analytics",
		label: "Analytics/Reports",
		desc: "Sales & traffic",
		icon: BarChart3,
	},
	{
		href: "/admin/settings",
		label: "Settings",
		desc: "Store & admin roles",
		icon: Settings,
	},
];

function NavItem({
	href,
	label,
	desc,
	active,
	Badge: badge,
	icon: Icon,
}: {
	href: string;
	label: string;
	desc?: string;
	active?: boolean;
	Badge?: string;
	icon: React.ComponentType<{ className?: string }>;
}) {
	return (
		<Link
			href={href}
			className={cn(
				"group block rounded-xl border px-3 py-2 transition",
				active
					? "bg-secondary/60 border-secondary/60"
					: "bg-background/20 border-border hover:bg-secondary/40",
			)}
		>
			<div className="flex items-start gap-3">
				<div
					className={cn(
						"mt-0.5",
						active ? "text-primary" : "text-muted-foreground",
					)}
				>
					<Icon className="h-4 w-4" />
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-3">
						<p className="truncate text-sm font-medium">{label}</p>
						{badge ? (
							<Badge variant={active ? "secondary" : "outline"}>{badge}</Badge>
						) : null}
					</div>
					{desc ? (
						<p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
							{desc}
						</p>
					) : null}
				</div>
			</div>
		</Link>
	);
}

function SidebarInner({
	className,
	pathname,
}: {
	className?: string;
	pathname: string;
}) {
	return (
		<Card className={cn("sticky top-20 p-4", className)}>
			<div className="flex items-center justify-between gap-3">
				<div>
					<p className="text-sm font-semibold">Admin</p>
					<p className="text-xs text-muted-foreground">Command center</p>
				</div>
				<Badge variant="outline">Demo</Badge>
			</div>

			<Separator className="my-4" />

			<nav className="space-y-2">
				{items.map((it) => {
					const active = pathname === it.href;
					return (
						<NavItem
							key={it.href}
							href={it.href}
							label={it.label}
							desc={it.desc}
							active={active}
							Badge={it.badge}
							icon={it.icon}
						/>
					);
				})}
			</nav>

			<Separator className="my-4" />
			<p className="text-xs text-muted-foreground">
				Use the dashboard to quickly scan KPIs, trends, and recent activity.
			</p>
		</Card>
	);
}

export default function AdminSidebar() {
	const pathname = usePathname();

	return (
		<>
			{/* Desktop */}
			<div className="hidden lg:block">
				<SidebarInner pathname={pathname} />
			</div>

			{/* Mobile */}
			<div className="lg:hidden">
				<Sheet>
					<SheetTrigger className="inline-flex items-center gap-2">
						<PanelLeft className="h-4 w-4" />
						<span>Menu</span>
					</SheetTrigger>
					<SheetContent side="left" className="p-0">
						<SheetHeader className="p-4">
							<SheetTitle>Admin Navigation</SheetTitle>
						</SheetHeader>
						<div className="px-4 pb-4">
							<SidebarInner
								className="p-0 border-0 bg-transparent"
								pathname={pathname}
							/>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
}
