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

export const getAllOrders = async (params: string) => {
	const cookieStore = await cookies();
	const res = await axios.get(
		params ? `${API_URL}/orders?${params}` : `${API_URL}/orders`,
		{
			headers: {
				cookie: cookieStore.toString(),
			},
		},
	);
	return res.data;
};

export const getTotalOrders = async () => {
	const cookieStore = await cookies();
	const res = await axios.get(`${API_URL}/orders/total`, {
		headers: {
			cookie: cookieStore.toString(),
		},
	});
	console.log(res);
	return res.data;
};
