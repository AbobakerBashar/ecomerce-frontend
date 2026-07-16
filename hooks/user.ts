import {
	LoginInput,
	LogoutResponse,
	RegisterInput,
	UserResponse,
} from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseEndpoint = process.env.NEXT_PUBLIC_BASE_ENDPOINT || "";

export const useSignup = () => {
	const queryClient = useQueryClient();

	return useMutation<UserResponse, Error, RegisterInput>({
		mutationKey: ["register"],
		mutationFn: async (data: RegisterInput) => {
			const res = await axios.post(`${baseEndpoint}/users/register`, data, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};

export const useGetUser = () => {
	return useQuery<UserResponse, Error>({
		queryKey: ["user"],

		queryFn: async () => {
			const res = await axios.get(`${baseEndpoint}/users/me`, {
				withCredentials: true,
			});
			return res.data;
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation<LogoutResponse, Error>({
		mutationKey: ["logout"],
		mutationFn: async () => {
			const res = await axios.post(
				`${baseEndpoint}/users/logout`,
				{},
				{
					withCredentials: true,
				},
			);
			return res.data;
		},
		onSuccess: () => queryClient.setQueryData(["user"], null),
	});
};

export const useSignin = () => {
	const queryClient = useQueryClient();

	return useMutation<UserResponse, Error, LoginInput>({
		mutationKey: ["login"],
		mutationFn: async (data: LoginInput) => {
			const res = await axios.post(`${baseEndpoint}/users/login`, data, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};
