import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	loginAction,
	registerAction,
	logoutAction,
	getUserAction,
	updateProfileAction,
	changePasswordAction,
} from "@/lib/auth";
import {
	ChangePasswordInput,
	LoginInput,
	RegisterInput,
	UpdateProfileInput,
} from "@/types/user";

export const useSignup = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["register"],
		mutationFn: async (data: RegisterInput) => await registerAction(data),
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
		mutationFn: async (data: LoginInput) => await loginAction(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["updateProfile"],
		mutationFn: async (data: UpdateProfileInput) =>
			await updateProfileAction(data),
		onSuccess: (data) => {
			if (data?.user) queryClient.setQueryData(["user"], data.user);
		},
	});
};

export const useChangePassword = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["changePassword"],
		mutationFn: async (data: ChangePasswordInput) =>
			await changePasswordAction(data),
		onSuccess: () => queryClient.setQueryData(["user"], null),
	});
};
