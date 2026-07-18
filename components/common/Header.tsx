"use client";

import { motion } from "motion/react";

import { Search, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "./Logo";
import LogoOutBtn from "./LogoOutBtn";
import MobileNav from "./MobileNav";
import dynamic from "next/dynamic";
import { useGetUser } from "@/hooks/user";
import { useGetCartItemCount } from "@/hooks/cart";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
	ssr: false,
});

const isActive = (pathname: string, route: string) => route === pathname;

const routes = [
	{ label: "Home", route: "/" },
	{ label: "Collections", route: "/collections" },
	{ label: "About", route: "/about" },
	{ label: "Contact", route: "/contact" },
	{ label: "Dashboard", route: "/dashboard" },
];

const Header = () => {
	const pathname = usePathname();

	const { data: count } = useGetCartItemCount();
	const { data: user, isLoading } = useGetUser();

	const cartCount = count ?? 0;

	const isAuthenticated = !isLoading && !!user;
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<motion.header
			initial={{ y: -40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
			className="fixed top-0 inset-x-0 z-50"
		>
			<div className="border-b border-border bg-primary px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white sm:px-8">
				Free shipping on orders over $50 · 30-day hassle-free returns
			</div>
			<div className="bg-background nav-glass border-b border-border h-16 items-center">
				<div className="flex justify-between items-center h-full p-4 md:px-8">
					<Link href="/" className="hover:text-primary">
						<Logo />
					</Link>
					{isSearchOpen ? (
						<div className="flex flex-1 items-center gap-3 md:gap-4">
							<div className="flex-1 min-w-0">
								<Input
									type="search"
									placeholder="Search products, brands, categories..."
									autoFocus
									className="h-10 border-border bg-background px-3 py-2 text-sm"
								/>
							</div>
						</div>
					) : (
						<nav className="hidden lg:flex items-center gap-9 text-sm text-text-mid">
							{routes.map((route) => (
								<Link
									key={route.label}
									href={route.route}
									className={`hover:text-primary ${isActive(pathname, route.route) ? "text-primary" : "text-text-mid"}`}
								>
									{route.label}
								</Link>
							))}
						</nav>
					)}

					{isAuthenticated ? (
						<div className="flex items-center gap-3">
							{isSearchOpen ? (
								<Button
									size="sm"
									variant="outline"
									onClick={() => setIsSearchOpen(false)}
									className="inline-flex items-center justify-center border border-border bg-secondary p-2 text-muted-foreground transition w-8.5 h-8.5 rounded-full mr-2 cursor-pointer ml-2"
								>
									<X className="h-4 w-4" />
								</Button>
							) : (
								<Button
									onClick={() => setIsSearchOpen(true)}
									size="sm"
									variant="ghost"
									className="inline-flex items-center justify-center border border-border bg-secondary p-2 text-muted-foreground transition w-8.5 h-8.5 rounded-full"
								>
									<Search className="h-4 w-4" />
								</Button>
							)}
							<Link
								href="/account"
								className="hidden sm:inline-flex items-center justify-center border border-border bg-secondary p-2 text-muted-foreground transition w-8.5 h-8.5 rounded-full"
							>
								<User className="h-4 w-4" />
							</Link>
							<ThemeToggle className="hidden sm:inline-flex items-center justify-center border border-border bg-secondary p-2 text-muted-foreground transition w-8.5 h-8.5 rounded-full cursor-pointer hover:text-primary hover:border-primary hover:bg-secondary" />
							<Link
								href="/cart"
								className={`hidden sm:inline-flex relative items-center justify-center border border-border bg-secondary p-2 text-muted-foreground transition w-8.5 h-8.5 rounded-full hover:text-primary hover:border-primary ${isActive(pathname, "/cart") ? "text-primary border-primary" : "text-text-mid"}`}
							>
								<ShoppingBag className="h-4 w-4" />
								<span className="text-primary absolute -top-5 right-0 px-2 py-1 bg-secondary rounded-full shadow-md font-semibold text-xs">
									{cartCount}
								</span>
							</Link>
							<LogoOutBtn className="hidden sm:flex h-8.5 w-8.5 rounded-full items-center justify-center" />
							<MobileNav
								isAuthenticated={isAuthenticated}
								cartCount={cartCount}
							/>
						</div>
					) : (
						<div className="flex items-center gap-3">
							<Button
								onClick={() => setIsSearchOpen(true)}
								size="sm"
								variant="outline"
								className="inline-flex items-center justify-center border border-border bg-secondary p-2 text-muted-foreground transition w-8.5 h-8.5 rounded-full cursor-pointer"
							>
								<Search className="h-4 w-4" />
							</Button>
							<ThemeToggle className="hidden sm:inline-flex items-center justify-center border border-border bg-secondary p-2 text-muted-foreground transition w-8.5 h-8.5 rounded-full cursor-pointer hover:text-primary hover:border-primary hover:bg-secondary" />
							<Link href="/auth/signin" className="hidden sm:inline-block">
								<Button
									size="sm"
									className="bg-secondary-foreground dark:bg-secondary dark:hover:bg-secondary/80 hover:bg-secondary-foreground/80 cursor-pointer"
								>
									Sign in
								</Button>
							</Link>
							<Link href="/auth/signup" className="hidden sm:inline-block">
								<Button size="sm" className="bg-primary cursor-pointer">
									Sign up
								</Button>
							</Link>
							<MobileNav
								isAuthenticated={isAuthenticated}
								cartCount={cartCount}
							/>
						</div>
					)}
				</div>
			</div>
		</motion.header>
	);
};

export default Header;
