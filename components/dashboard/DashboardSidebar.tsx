"use client";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

function SidebarNavItem({
	href,
	label,
	desc,
	active,
}: {
	href: string;
	label: string;
	desc?: string;
	active?: boolean;
}) {
	return (
		<Link
			href={href}
			className={
				active
					? "block rounded-lg bg-secondary/60 px-3 py-2 text-sm font-medium text-foreground"
					: "block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
			}
		>
			<div className="flex items-center justify-between gap-3">
				<span className="truncate">{label}</span>
				{active ? <Badge variant="secondary">Active</Badge> : null}
			</div>
			{desc ? (
				<p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
					{desc}
				</p>
			) : null}
		</Link>
	);
}

const DashboardSidebar = () => {
	const pathname = usePathname();

	return (
		<aside className="hidden lg:block">
			<Card className="sticky top-24 p-4">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-semibold">Account</p>
						<p className="text-xs text-muted-foreground">Manage your profile</p>
					</div>
					<Badge variant="outline">Demo</Badge>
				</div>

				<Separator className="my-4" />

				<nav className="space-y-2">
					<SidebarNavItem
						href="/dashboard"
						label="Overview"
						desc="Orders, status, summary"
						active={pathname === "/dashboard"}
					/>
					<SidebarNavItem
						href="/dashboard/orders"
						label="Orders"
						desc="Track purchases"
						active={pathname === "/dashboard/orders"}
					/>
					<SidebarNavItem
						href="/dashboard/settings"
						label="Settings"
						desc="Profile & preferences"
						active={pathname === "/dashboard/settings"}
					/>
					<SidebarNavItem
						href="/dashboard/addresses"
						label="Addresses"
						desc="Saved shipping"
						active={pathname === "/dashboard/addresses"}
					/>
				</nav>

				<Separator className="my-4" />
				<p className="text-xs text-muted-foreground">
					This repo doesn’t include a backend—data is demo-only.
				</p>
			</Card>
		</aside>
	);
};

export default DashboardSidebar;
