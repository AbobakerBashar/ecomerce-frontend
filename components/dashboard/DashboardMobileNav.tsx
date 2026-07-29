"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNavLinks = [
	{ href: "/dashboard", label: "Overview" },
	{ href: "/dashboard/orders", label: "Orders" },
	{ href: "/dashboard/settings", label: "Settings" },
	{ href: "/dashboard/addresses", label: "Addresses" },
];

export default function DashboardMobileNav() {
	const pathname = usePathname();

	return (
		<nav className="lg:hidden overflow-x-auto -mx-4 px-4 mb-6 scrollbar-hide">
			<div className="flex gap-1 min-w-max rounded-lg bg-secondary/50 p-1">
				{mobileNavLinks.map((link) => {
					const isActive = pathname === link.href;
					return (
						<Link
							key={link.href}
							href={link.href}
							className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
								isActive
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{link.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
