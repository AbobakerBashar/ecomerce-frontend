import { CartItemInput, CartResponse } from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export const useGetCart = () => {
	return useQuery<CartResponse>({
		queryKey: ["cart"],
		queryFn: async () => {
			const res = await axios.get(`${API_URL}/cart`, {
				withCredentials: true,
			});
			return res.data?.cart;
		},
	});
};

export const useGetCartItemCount = () => {
	return useQuery({
		queryKey: ["cart-count"],
		queryFn: async () => {
			const res = await axios.get(`${API_URL}/cart/count`, {
				withCredentials: true,
			});
			return res.data?.count;
		},
	});
};

export const useAddToCart = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (item: CartItemInput) => {
			const res = await axios.post(`${API_URL}/cart`, item, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["cart"] });
			queryClient.refetchQueries({ queryKey: ["cart-count"] });
		},
	});
};

export const useUpdateQtn = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			quantity,
			itemId,
		}: {
			quantity: number;
			itemId: string;
		}) => {
			const res = await axios.patch(
				`${API_URL}/cart/${itemId}`,
				{ quantity },
				{ withCredentials: true },
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["cart"] });
			queryClient.refetchQueries({ queryKey: ["cart-count"] });
		},
	});
};
export const useDeleteCartItem = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (itemId: string) => {
			const res = await axios.delete(`${API_URL}/cart/${itemId}`, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["cart"] });
			queryClient.refetchQueries({ queryKey: ["cart-count"] });
		},
	});
};

export const useClearCart = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const res = await axios.delete(`${API_URL}/cart`, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.setQueryData(["cart"], {
				cart: {
					items: [],
				},
			});
			queryClient.setQueryData(["cart-count"], 0);
		},
	});
};
