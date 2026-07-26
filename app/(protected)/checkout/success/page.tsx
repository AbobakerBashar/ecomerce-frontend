import CheckoutSuccess from "@/components/checkout/CheckoutSuccess";
import { getOrder } from "@/lib/order"; // assuming this is where you put the server action
import type { OrderResponse } from "@/types/order";
import axios from "axios";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Order Confirmed",
	description: "Your order has been placed successfully.",
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchOrder = async (
	session_id: string,
): Promise<OrderResponse | null> => {
	if (!session_id) notFound();

	let attempts = 0;
	const maxAttempts = 5;

	while (attempts < maxAttempts) {
		try {
			const res = await getOrder(session_id);
			return res;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 404) {
					attempts++;
					if (attempts >= maxAttempts) {
						notFound();
					}
					await delay(2000);
					continue;
				}

				throw new Error(
					error.response?.data?.message || "Failed to load order.",
				);
			} else {
				throw error;
			}
		}
	}

	return null;
};

export default async function CheckoutSuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ session_id: string }>;
}) {
	const orderData = await fetchOrder((await searchParams).session_id);
	if (!orderData || !orderData.order) return notFound();

	const order = orderData.order;

	return (
		<div className="mx-auto max-w-3xl space-y-8 py-6">
			<CheckoutSuccess order={order} />
		</div>
	);
}
