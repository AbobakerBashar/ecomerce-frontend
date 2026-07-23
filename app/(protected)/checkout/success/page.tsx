import CheckoutSuccess from "@/components/checkout/CheckoutSuccess";
import { getOrder } from "@/lib/order";
import { OrderResponse } from "@/types/order";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Order Confirmed",
	description: "Your order has been placed successfully.",
};

const fetchOrder = async (
	session_id: string,
): Promise<OrderResponse | null> => {
	try {
		const res = await getOrder(session_id);
		return res;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default async function CheckoutSuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ session_id: string }>;
}) {
	const { session_id } = await searchParams;

	const orderData = await fetchOrder(session_id);
	if (!orderData || !orderData.order) return notFound();

	const order = orderData?.order;

	return (
		<div className="mx-auto max-w-3xl space-y-8 py-6">
			<CheckoutSuccess order={order} />
		</div>
	);
}
