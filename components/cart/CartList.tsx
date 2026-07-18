import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useClearCart, useDeleteCartItem, useUpdateQtn } from "@/hooks/cart";
import { CartItem } from "@/types/cart";
import axios from "axios";
import { Loader, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CartListProps {
	items: CartItem[];
}

export default function CartList({ items }: CartListProps) {
	const [itemTochange, setItemToChange] = useState<{
		id: string;
		type: "rm" | "inc" | "dec" | "";
	}>({
		id: "",
		type: "",
	});
	const { mutateAsync: updateQty, isPending: isUpdating } = useUpdateQtn();
	const { mutateAsync: removeItem, isPending: isRemoving } =
		useDeleteCartItem();
	const { mutateAsync: clearCart, isPending: isClearing } = useClearCart();

	const hadleRemove = async (id: string) => {
		setItemToChange({
			id,
			type: "rm",
		});
		try {
			const res = await removeItem(id);
			if (res.success) {
				toast.success("Item remved from the cart successfully!");
			}
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(error.response?.data?.message || "Something went wrong");
			else toast.error("Faild to remove an item, Please try again latar");
		}
	};

	const handleUpdateQty = async (
		itemId: string,
		quantity: number,
		type: "dec" | "inc" | "rm",
	) => {
		if (quantity < 1) return hadleRemove(itemId);
		setItemToChange({
			id: itemId,
			type,
		});

		try {
			const res = await updateQty({ itemId, quantity });
			if (res.success) {
				toast.success("Item quantity updated successfully!");
			}
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(
					error.response?.data?.errors?.quantity ||
						error.response?.data?.message ||
						"Something went wrong",
				);
			else
				toast.error("Faild to update an item quantity, Please try again latar");
		}
	};

	const handleClear = async () => {
		if (isRemoving || isUpdating) return;
		try {
			const res = await clearCart();
			if (res.success) toast.success("Cart cleard successfully!");
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(
					error.response?.data?.errors?.quantity ||
						error.response?.data?.message ||
						"Something went wrong",
				);
			else toast.error("Faild to clear cart, Please try again latar");
		}
	};

	return (
		<div className="space-y-4">
			{items.map((li) => (
				<Card key={li.id} className="p-4">
					<div className="flex gap-4">
						<div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border bg-muted/30">
							<Image
								src={li.images[0]}
								alt={li.name}
								fill
								unoptimized
								className="object-cover"
							/>
						</div>

						<div className="flex flex-1 flex-col gap-3">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="font-semibold text-foreground">{li.name}</p>
									{li.brand && (
										<p className="text-sm text-muted-foreground">{li.brand}</p>
									)}
								</div>
								<Button
									variant="destructive"
									size="sm"
									disabled={isRemoving || isClearing}
									className={`${isRemoving ? "cursor-not-allowed" : "cursor-pointer"}`}
									onClick={() => hadleRemove(li.id)}
								>
									{isRemoving &&
									itemTochange.id === li.id &&
									itemTochange.type === "rm" ? (
										<>
											<Loader className="w-4 h-4 animate-spin" />
											Removing...
										</>
									) : (
										<>
											<Trash2 className="w-4 h-4" />
											Remove
										</>
									)}
								</Button>
							</div>

							<Separator />

							<div className="flex flex-wrap items-center justify-between gap-4">
								<div className="flex items-center gap-3">
									<Button
										size="sm"
										variant={li.quantity === 1 ? "destructive" : "ghost"}
										disabled={isUpdating || isClearing}
										className={`cursor-pointer h-8 border border-border ${li.quantity !== 1 ? "hover:text-primary" : ""}`}
										onClick={() =>
											handleUpdateQty(li.id, li.quantity - 1, "dec")
										}
									>
										{isUpdating &&
										itemTochange.id === li.id &&
										itemTochange.type === "dec" ? (
											<Loader className="w-4 h-4 animate-spin" />
										) : li.quantity === 1 ? (
											<Trash2 className="w-4 h-4" />
										) : (
											<Minus className="h-4 w-4" />
										)}
									</Button>
									<Input
										value={String(li.quantity)}
										type="number"
										disabled={isUpdating || isClearing}
										min={1}
										onChange={(e) =>
											handleUpdateQty(
												li.id,
												Number(e.target.value || 1),
												Number(e.target.value) > li.quantity ? "inc" : "dec",
											)
										}
										className="h-8 w-20"
									/>
									<Button
										size="sm"
										variant="ghost"
										disabled={isUpdating || isClearing}
										className={`border h-8 border-border hover:text-primary ${isUpdating ? "cursor-not-allowed" : "cursor-pointer"}`}
										onClick={() =>
											handleUpdateQty(li.id, li.quantity + 1, "inc")
										}
									>
										{isUpdating &&
										itemTochange.id === li.id &&
										itemTochange.type === "inc" ? (
											<Loader className="w-4 h-4 animate-spin" />
										) : (
											<Plus className="h-4 w-4" />
										)}
									</Button>
								</div>

								<div className="text-right">
									<p className="text-sm text-muted-foreground">
										${(li.salePrice || li.price).toFixed(2)} each
									</p>
									{/* <p className="text-lg font-semibold text-foreground">
										${li.subtotal.toFixed(2)}
									</p> */}
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
					onClick={handleClear}
					disabled={isClearing || isRemoving || isUpdating}
				>
					{isClearing ? (
						<>
							<Loader className="w-4 h-4 animate-spin" />
							Clearing
						</>
					) : (
						"Clear cart"
					)}
				</Button>
				<Button className="cursor-pointer">Proceed to checkout</Button>
			</div>
		</div>
	);
}
