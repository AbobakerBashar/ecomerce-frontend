import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/cart";
import { products } from "@/lib/data";

interface CartListProps {
	items: CartItem[];
	STORAGE_KEY: string;
	setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
	lineItems: {
		product: (typeof products)[number];
		qty: number;
		subtotal: number;
	}[];
}

export default function CartList({
	items,
	STORAGE_KEY,
	setItems,
	lineItems,
}: CartListProps) {
	function persist(next: CartItem[]) {
		setItems(next);
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	}
	function updateQty(productId: string, nextQty: number) {
		const qty = Math.max(1, Math.floor(nextQty));
		persist(items.map((it) => (it.id === productId ? { ...it, qty } : it)));
	}

	function remove(productId: string) {
		persist(items.filter((it) => it.id !== productId));
	}

	function clearCart() {
		persist([]);
	}

	return (
		<div className="space-y-4">
			{lineItems.map((li) => (
				<Card key={li.product.id} className="p-4">
					<div className="flex gap-4">
						<div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border bg-muted/30">
							<Image
								src={li.product.thumbnail}
								alt={li.product.name}
								fill
								unoptimized
								className="object-cover"
							/>
						</div>

						<div className="flex flex-1 flex-col gap-3">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="font-semibold text-foreground">
										{li.product.name}
									</p>
									<p className="text-sm text-muted-foreground">
										{li.product.brand}
									</p>
								</div>
								<Button
									variant="destructive"
									size="sm"
									className="cursor-pointer"
									onClick={() => remove(li.product.id)}
								>
									Remove
								</Button>
							</div>

							<Separator />

							<div className="flex flex-wrap items-center justify-between gap-4">
								<div className="flex items-center gap-3">
									<Button
										size="sm"
										variant="ghost"
										className="cursor-pointer border border-border hover:text-primary"
										onClick={() => updateQty(li.product.id, li.qty - 1)}
									>
										-
									</Button>
									<Input
										value={String(li.qty)}
										type="number"
										min={1}
										onChange={(e) =>
											updateQty(li.product.id, Number(e.target.value || 1))
										}
										className="h-9 w-20"
									/>
									<Button
										size="sm"
										variant="ghost"
										className="cursor-pointer border border-border hover:text-primary"
										onClick={() => updateQty(li.product.id, li.qty + 1)}
									>
										+
									</Button>
								</div>

								<div className="text-right">
									<p className="text-sm text-muted-foreground">
										${li.product.salePrice.toFixed(2)} each
									</p>
									<p className="text-lg font-semibold text-foreground">
										${li.subtotal.toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</Card>
			))}

			<div className="flex items-center justify-between">
				<Button
					variant="destructive"
					className="cursor-pointer"
					onClick={clearCart}
				>
					Clear cart
				</Button>
				<Button className="cursor-pointer">Proceed to checkout</Button>
			</div>
		</div>
	);
}
