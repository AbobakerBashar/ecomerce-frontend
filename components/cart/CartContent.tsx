"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

import { products } from "@/lib/data";
import CartList from "./CartList";
import { CartItem } from "@/types/cart";
import Summary from "./Summary";

const STORAGE_KEY = "demo_cart_items";

function safeParseCartItems(raw: string | null): CartItem[] {
	console.log("ROW", raw);
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw) as CartItem[];
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((x) => x && typeof x.id === "string" && typeof x.qty === "number")
			.map((x) => ({
				id: x.id,
				qty: Math.max(1, Math.floor(x.qty)),
			}));
	} catch {
		return [];
	}
}

const CartContent = () => {
	const [items, setItems] = useState(() => {
		if (typeof window === "undefined") return [];

		return safeParseCartItems(window.localStorage.getItem(STORAGE_KEY));
	});
	// localStorage.setItem(
	// 	STORAGE_KEY,
	// 	JSON.stringify(
	// 		products.map((p) => ({
	// 			id: p.id,
	// 			qty: 1,
	// 		})),
	// 	),
	// );

	const productById = useMemo(() => {
		const map = new Map<string, (typeof products)[number]>();
		for (const p of products) map.set(p.id, p);
		return map;
	}, []);

	const lineItems = useMemo(() => {
		if (items.length === 0) return [];
		return items
			.map((it) => {
				const product = productById.get(it.id);
				if (!product) return null;
				return {
					product,
					qty: it.qty,
					subtotal: product.salePrice * it.qty,
				};
			})
			.filter(Boolean) as Array<{
			product: (typeof products)[number];
			qty: number;
			subtotal: number;
		}>;
	}, [items, productById]);

	const totals = useMemo(() => {
		const subtotal = lineItems.reduce((acc, li) => acc + li.subtotal, 0);
		const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99;
		const tax = subtotal * 0.07;
		const total = subtotal + shipping + tax;
		return { subtotal, shipping, tax, total };
	}, [lineItems]);

	return (
		<>
			{lineItems.length === 0 ? (
				<Card className="p-8 text-center">
					<p className="text-muted-foreground">Your cart is empty.</p>
				</Card>
			) : (
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
					{/* Left: items */}
					<CartList
						items={items}
						STORAGE_KEY={STORAGE_KEY}
						setItems={setItems}
						lineItems={lineItems}
					/>

					{/* Right: summary */}
					<Summary totals={totals} />
				</div>
			)}
		</>
	);
};

export default CartContent;
