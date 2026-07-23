import { Address } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export const useCheckout = () => {
	return useMutation({
		mutationFn: async (address: Address) => {
			const res = await axios.post(`${API_URL}/checkout`, address, {
				withCredentials: true,
			});
			return res.data;
		},
	});
};
