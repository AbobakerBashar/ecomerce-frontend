// "use client";

// import { useMemo, useState } from "react";

// import { products } from "@/lib/data";
// import { CartItem } from "@/types/cart";
// import Summary from "./Summary";
// import CheckoutForm from "./CheckoutForm";
// import { Card } from "../ui/card";

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

// export default function CheckoutUI() {
// 	const [items] = useState<CartItem[]>(() => {
// 		if (typeof window === "undefined") return [];
// 		return safeParseCartItems(window.localStorage.getItem(STORAGE_KEY));
// 	});

// 	const productById = useMemo(() => {
// 		const map = new Map<string, (typeof products)[number]>();
// 		for (const p of products) map.set(p.id, p);
// 		return map;
// 	}, []);

// 	const lineItems = useMemo(() => {
// 		return items
// 			.map((it) => {
// 				const product = productById.get(it.id);
// 				if (!product) return null;
// 				return {
// 					product,
// 					qty: it.qty,
// 					subtotal: product.salePrice * it.qty,
// 				};
// 			})
// 			.filter(Boolean) as Array<{
// 			product: (typeof products)[number];
// 			qty: number;
// 			subtotal: number;
// 		}>;
// 	}, [items, productById]);

// 	const totals = useMemo(() => {
// 		const subtotal = lineItems.reduce((acc, li) => acc + li.subtotal, 0);
// 		const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99;
// 		const tax = subtotal * 0.07;
// 		const total = subtotal + shipping + tax;
// 		return { subtotal, shipping, tax, total };
// 	}, [lineItems]);

// 	if (lineItems.length === 0) {
// 		return (
// 			<Card className="p-8 text-center">
// 				<p className="text-muted-foreground">Your cart is empty.</p>
// 			</Card>
// 		);
// 	}

// 	return (
// 		<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
// 			<CheckoutForm />

// 			{/* Summary */}
// 			<Summary lineItems={lineItems} totals={totals} />
// 		</div>
// 	);
// }

const CheckoutUI = () => {
	return <div>CheckoutUI</div>;
};

export default CheckoutUI;
