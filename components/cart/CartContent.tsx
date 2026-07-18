"use client";

import { Card } from "@/components/ui/card";
import { useGetCart } from "@/hooks/cart";
import CartList from "./CartList";
import Summary from "./Summary";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

// function safeParseCartItems(raw: string | null): CartItem[] {
// 	console.log("ROW", raw);
// 	if (!raw) return [];
// 	try {
// 		const parsed = JSON.parse(raw) as CartItem[];
// 		if (!Array.isArray(parsed)) return [];
// 		return parsed
// 			.filter((x) => x && typeof x.id === "string" && typeof x.qty === "number")
// 			.map((x) => ({
// 				id: x.id,
// 				qty: Math.max(1, Math.floor(x.qty)),
// 			}));
// 	} catch {
// 		return [];
// 	}
// }

const CartContent = () => {
	const { data: cart, isLoading } = useGetCart();
	const items = cart?.cart.items ?? [];
	// const [items, setItems] = useState(() => {
	// 	if (typeof window === "undefined") return [];

	// 	return safeParseCartItems(window.localStorage.getItem(STORAGE_KEY));
	// });
	// localStorage.setItem(
	// 	STORAGE_KEY,
	// 	JSON.stringify(
	// 		products.map((p) => ({
	// 			id: p.id,
	// 			qty: 1,
	// 		})),
	// 	),
	// );

	// const productById = useMemo(() => {
	// 	const map = new Map<string, (typeof products)[number]>();
	// 	for (const p of products) map.set(p.id, p);
	// 	return map;
	// }, []);

	// const totals = useMemo(() => {
	// 	const subtotal = items.reduce((acc, li) => acc + li.subtotal, 0);
	// 	const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99;
	// 	const tax = subtotal * 0.07;
	// 	const total = subtotal + shipping + tax;
	// 	return { subtotal, shipping, tax, total };
	// }, [items]);

	if (isLoading) return <Spinner label="Loading cart..." size="2xl" />;

	return (
		<>
			{items.length === 0 ? (
				<Card className="p-8 text-center w-full max-w-md mx-auto">
					<p className="text-muted-foreground">Your cart is empty.</p>
					<Button variant="default" size="lg">
						<Link href="/collections" className="flex items-center gap-2">
							Collections
							<ShoppingBag className="w-4 h-4" />
						</Link>
					</Button>{" "}
				</Card>
			) : (
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
					{/* Left: items */}
					<CartList items={items} />

					{/* Right: summary */}
					<Summary
						totals={{
							subtotal: 0,
							shipping: 0,
							tax: 0,
							total: 0,
						}}
					/>
				</div>
			)}
		</>
	);
};

export default CartContent;
