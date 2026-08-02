"use server";

import { cookies } from "next/headers";
import axios from "axios";
import {
	ChangePasswordInput,
	LoginInput,
	RegisterInput,
	UpdateProfileInput,
} from "@/types/user";

const baseEndpoint = process.env.NEXT_PUBLIC_BASE_ENDPOINT || "";

export async function loginAction(data: LoginInput) {
	try {
		const res = await axios.post(`${baseEndpoint}/users/login`, data);
		const token = res.data.token;

		const cookieStore = await cookies();
		cookieStore.set("jwt", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 3 * 24 * 60 * 60,
		});

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500)
				return {
					success: false,
					message: "Internal server error. Please try again later",
				};
			if (error.response?.data?.errors)
				return {
					success: false,
					errors: error.response.data.errors,
				};
			return {
				success: false,
				message:
					error.response?.data?.message ||
					"Somthig went wrong. Please try agin later",
			};
		} else {
			return {
				success: false,
				message: "Somthig went wrong. Please try agin later",
			};
		}
	}
}

export async function registerAction(data: RegisterInput) {
	try {
		const res = await axios.post(`${baseEndpoint}/users/register`, data);
		const token = res.data.token;

		const cookieStore = await cookies();
		cookieStore.set("jwt", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 3 * 24 * 60 * 60,
		});
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500)
				return {
					success: false,
					message: "Internal server error. Please try again later",
				};
			if (error.response?.data?.errors)
				return {
					success: false,
					errors: error.response.data.errors,
				};
			return {
				success: false,
				message:
					error.response?.data?.message ||
					"Somthig went wrong. Please try agin later",
			};
		} else {
			return {
				success: false,
				message: "Somthig went wrong. Please try agin later",
			};
		}
	}
}

export async function logoutAction() {
	const cookieStore = await cookies();
	cookieStore.delete("jwt");

	return { success: true };
}

export async function getUserAction() {
	const cookieStore = await cookies();
	const token = cookieStore.get("jwt")?.value;

	if (!token) throw new Error("Not authenticated");
	const res = await axios.get(`${baseEndpoint}/users/me`, {
		headers: {
			Cookie: `jwt=${token}`,
		},
	});

	return res.data;
}

export async function updateProfileAction(payload: UpdateProfileInput) {
	const cookieStore = await cookies();
	const token = cookieStore.get("jwt")?.value;

	if (!token) throw new Error("Not authenticated");

	try {
		const res = await axios.patch(`${baseEndpoint}/users/me`, payload, {
			headers: {
				Cookie: `jwt=${token}`,
			},
		});

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				status: error.response?.status,
				message: error.response?.data?.message,
				errors: error.response?.data?.errors,
			};
		}

		return {
			success: false,
			message: "Something went wrong",
		};
	}
}

export async function changePasswordAction(payload: ChangePasswordInput) {
	const cookieStore = await cookies();
	const token = cookieStore.get("jwt")?.value;

	if (!token) throw new Error("Not authenticated");

	try {
		const res = await axios.patch(
			`${baseEndpoint}/users/reset-password`,
			payload,
			{
				headers: {
					Cookie: `jwt=${token}`,
				},
			},
		);

		cookieStore.delete("jwt");
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				status: error.response?.status,
				message: error.response?.data?.message,
				errors: error.response?.data?.errors,
			};
		}

		return {
			success: false,
			message: "Something went wrong",
		};
	}
}
