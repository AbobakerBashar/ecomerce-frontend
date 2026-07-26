import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	loginAction,
	registerAction,
	logoutAction,
	getUserAction,
} from "@/lib/auth";

export const useSignup = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["register"],
		mutationFn: async (data: FormData) => await registerAction(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};

export const useGetUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => await getUserAction(),
		retry: false,
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["logout"],
		mutationFn: async () => {
			return await logoutAction();
		},
		onSuccess: () => {
			queryClient.setQueryData(["user"], null);
		},
	});
};

export const useSignin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: FormData) => await loginAction(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};
