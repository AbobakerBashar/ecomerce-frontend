"use client";

import { useMemo } from "react";

import { useGetCart } from "@/hooks/cart";
import { Card } from "../ui/card";
import CheckoutForm from "./CheckoutForm";
import Summary from "./Summary";
import { Spinner } from "../ui/spinner";

// const STORAGE_KEY = "demo_cart_items";

// function safeParseCartItems(raw: string | null): CartItem[] {
// 	if (!raw) return [];
// 	try {
// 		const parsed = JSON.parse(raw) as CartItem[];
// 		if (!Array.isArray(parsed)) return [];
// 		return parsed
// 			.filter((x) => x && typeof x.id === "string" && typeof x.qty === "number")
// 			.map((x) => ({ id: x.id, qty: Math.max(1, Math.floor(x.qty)) }));
// 	} catch {
// 		return [];
// 	}
// }

export default function CheckoutUI() {
	const { data: cart, isLoading } = useGetCart();

	const items = cart?.items || [];

	const totals = useMemo(() => {
		const subtotal = (cart?.items || []).reduce(
			(acc, item) => acc + item.quantity * item.price,
			0,
		);
		const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99;
		const tax = subtotal * 0.07;
		const total = subtotal + shipping + tax;
		return { subtotal, shipping, tax, total };
	}, [cart]);

	if (isLoading)
		return <Spinner label="Loading items..." size="2xl" variant="gradient" />;

	if (items.length === 0) {
		return (
			<Card className="p-8 text-center">
				<p className="text-muted-foreground">Your cart is empty.</p>
			</Card>
		);
	}

	return (
		<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
			<CheckoutForm />

			{/* Summary */}
			<Summary items={items} totals={totals} />
		</div>
	);
}
