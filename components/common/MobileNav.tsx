"use client";

import {
	ClipboardList,
	Home,
	Info,
	MapPin,
	Menu,
	MessageCircle,
	ShoppingBag,
	User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "../ui/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from "../ui/sheet";
import LogoOutBtn from "./LogoOutBtn";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
	ssr: false,
});

const routes = [
	{ label: "Home", route: "/", icon: <Home className="w-4 h-4" /> },
	{
		label: "Collections",
		route: "/collections",
		icon: <ShoppingBag className="w-4 h-4" />,
	},
	{ label: "About", route: "/about", icon: <Info className="w-4 h-4" /> },
	{
		label: "Contact",
		route: "/contact",
		icon: <MessageCircle className="w-4 h-4" />,
	},
	{
		label: "Dashboard",
		route: "/dashboard",
		icon: <ClipboardList className="w-4 h-4" />,
	},
];

const isActive = (pathname: string, route: string) => route === pathname;

interface MobileNavProps {
	isAuthenticated: boolean;
}

export default function MobileNav({ isAuthenticated }: MobileNavProps) {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className="cursor-pointer w-8.5 h-8.5 rounded-full hover:bg-primary/20 flex items-center justify-center lg:hidden">
				<Menu className="h-4 w-4" />
				<span className="sr-only">Toggle menu</span>
			</SheetTrigger>
			<SheetContent side="left" className="overflow-auto">
				<nav className="flex flex-col gap-4 pt-10 pb-6 px-4">
					{routes.map((route) => {
						const Icon = route.icon;
						return (
							<SheetClose key={route.label}>
								<Link
									href={route.route}
									className={`px-4 py-2 w-full text-sm font-medium rounded-md transition-colors inline-flex items-center gap-2 ${
										isActive(pathname, route.route)
											? "bg-primary text-primary-foreground"
											: "text-text-mid hover:bg-secondary hover:text-primary"
									}`}
									onClick={() => setIsOpen(false)}
								>
									{Icon && Icon}
									<span>{route.label}</span>
								</Link>
							</SheetClose>
						);
					})}
				</nav>
				<SheetFooter className="flex flex-col gap-2">
					{/* Divider */}
					<Separator className="h-0.5 bg-border -ml-4 mb-4" />
					{/* Account Links */}
					{isAuthenticated && (
						<>
							<SheetClose>
								<Link
									href="/dashboard/account"
									className="px-4 py-2 text-sm font-medium rounded-md text-text-mid hover:bg-secondary hover:text-primary transition-colors w-full inline-flex items-center gap-2"
									onClick={() => setIsOpen(false)}
								>
									<User className="h-4 w-4" />
									<span>My Account</span>
								</Link>
							</SheetClose>
							<SheetClose>
								<Link
									href="/dashboard/orders"
									className="px-4 py-2 text-sm font-medium rounded-md text-text-mid hover:bg-secondary hover:text-primary transition-colors inline-flex w-full items-center gap-2"
									onClick={() => setIsOpen(false)}
								>
									<ClipboardList className="h-4 w-4" />
									<span>Orders</span>
								</Link>
							</SheetClose>
							<SheetClose>
								<Link
									href="/dashboard/addresses"
									className="px-4 py-2 text-sm font-medium rounded-md text-text-mid hover:bg-secondary hover:text-primary transition-colors inline-flex w-full items-center gap-2"
									onClick={() => setIsOpen(false)}
								>
									<MapPin className="h-4 w-4" />
									<span>Addresses</span>
								</Link>
							</SheetClose>
							<ThemeToggle
								className="px-4 py-2 text-sm font-medium rounded-md text-text-mid hover:bg-secondary bg-background hover:text-primary transition-colors inline-flex w-full justify-start items-center gap-2"
								size="lg"
								label="Toggle theme"
							/>
							<LogoOutBtn className="w-full" size="lg" ariaLabel="Logout" />
						</>
					)}

					{/* Auth Links for non-authenticated users */}
					{!isAuthenticated && (
						<>
							<SheetClose>
								<Link
									href="/auth/signin"
									className="px-4 py-2 text-sm font-medium rounded-md text-text-mid hover:bg-secondary hover:text-primary transition-colors inline-flex w-full items-center gap-2"
									onClick={() => setIsOpen(false)}
								>
									Sign In
								</Link>
							</SheetClose>
							<SheetClose>
								<Link
									href="/auth/signup"
									className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex w-full items-center gap-2"
									onClick={() => setIsOpen(false)}
								>
									Sign Up
								</Link>
							</SheetClose>
						</>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
