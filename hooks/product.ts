import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["products"],
		mutationFn: async (product: FormData) => {
			const res = axios.post(`${api_url}/products`, product, {
				withCredentials: true,
			});
			return res;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};
