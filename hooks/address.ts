import { AddressInput } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export const useGetAddresses = () => {
	return useQuery({
		queryKey: ["addresses"],
		queryFn: async () => {
			const res = await axios.get(`${API_URL}/user/addresses`, {
				withCredentials: true,
			});
			return res.data?.addresses;
		},
	});
};

export const useAddAddress = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (address: AddressInput) => {
			const res = await axios.post(`${API_URL}/user/addresses`, address, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: (data) => {
			if (data?.addresses)
				queryClient.setQueryData(["addresses"], data?.addresses);
		},
	});
};

export const useEditAddress = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			address,
			id,
		}: {
			address: AddressInput;
			id: string;
		}) => {
			const res = await axios.put(`${API_URL}/user/addresses/${id}`, address, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: (data) => {
			if (data?.addresses)
				queryClient.setQueryData(["addresses"], data.addresses);
		},
	});
};
