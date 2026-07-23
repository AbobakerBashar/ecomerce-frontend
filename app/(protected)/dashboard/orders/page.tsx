import { getAllOrders } from "@/lib/order";
import type { OrdersResponse } from "@/types/order";
import OrdersContent from "@/components/dashboard/OrdersContent";

const fetchOrders = async (status: string, q: string) => {
	const params = new URLSearchParams();

	if (status) params.set("status", status);
	if (q) params.set("q", q);

	try {
		const res: OrdersResponse = await getAllOrders(params.toString());
		if (res.success) return res.orders;
		return [];
	} catch (error) {
		console.error("Failed to fetch orders:", error);
		return [];
	}
};

type Props = {
	searchParams: Promise<{ status: string; q: string }>;
};

export default async function OrdersPage({ searchParams }: Props) {
	const { status, q } = await searchParams;
	const orders = await fetchOrders(status, q);

	return <OrdersContent orders={orders} />;
}
