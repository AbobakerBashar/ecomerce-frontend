import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export const getOrder = async (session_id: string) => {
	const cookieStore = await cookies();

	const res = await axios.get(`${API_URL}/orders/${session_id}`, {
		headers: {
			cookie: cookieStore.toString(),
		},
	});
	return res.data;
};

export const getAllOrders = async (params: string = "", limit: number = 15) => {
	const cookieStore = await cookies();
	const res = await axios.get(
		params
			? `${API_URL}/orders?${params}&limit=${limit}`
			: `${API_URL}/orders?limit=${limit}`,
		{
			headers: {
				cookie: cookieStore.toString(),
			},
		},
	);
	return res.data;
};

export const getOrdersStats = async () => {
	const cookieStore = await cookies();
	const res = await axios.get(`${API_URL}/orders/status`, {
		headers: {
			cookie: cookieStore.toString(),
		},
	});
	return res.data;
};
