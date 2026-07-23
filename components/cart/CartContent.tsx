"use client";

import { Card } from "@/components/ui/card";
import { useGetCart } from "@/hooks/cart";
import CartList from "./CartList";
import Summary from "./Summary";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useMemo } from "react";

const CartContent = () => {
	const { data: cart, isLoading } = useGetCart();
	const items = cart?.items ?? [];

	const totals = useMemo(() => {
		const subtotal = (cart?.items || []).reduce(
			(acc, li) => acc + li.price * li.quantity,
			0,
		);
		const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99;
		const tax = subtotal * 0.07;
		const total = subtotal + shipping + tax;
		return { subtotal, shipping, tax, total };
	}, [cart]);

	if (isLoading)
		return <Spinner label="Loading cart..." size="2xl" variant="gradient" />;

	return (
		<>
			{items.length === 0 ? (
				<Card className="p-8 text-center w-full max-w-md mx-auto">
					<p className="text-muted-foreground">Your cart is empty.</p>
					<Link href="/collections" className="flex items-center gap-1.5">
						<Button
							variant="default"
							size="lg"
							className="w-full cursor-pointer"
						>
							<ShoppingBag className="w-4 h-4" />
							View Collections
						</Button>
					</Link>
				</Card>
			) : (
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
					{/* Left: items */}
					<CartList items={items} />

					{/* Right: summary */}
					<Summary
						totals={{
							subtotal: totals.subtotal,
							shipping: totals.shipping,
							tax: totals.tax,
							total: totals.total,
						}}
					/>
				</div>
			)}
		</>
	);
};

export default CartContent;
