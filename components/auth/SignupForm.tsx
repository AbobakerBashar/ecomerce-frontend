"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useSignup } from "@/hooks/user";
import { Loader } from "lucide-react";
import { Label } from "../ui/label";
import axios from "axios";
import { AuthApiError } from "@/types/user";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const SignupForm = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const redirect = searchParams.get("redirect") || "/";

	const [error, setError] = useState<Record<string, string> | null>(null);

	const { mutateAsync: signup, isPending: isCreating } = useSignup();

	const onSubmit = async (data: FormData): Promise<void> => {
		if (isCreating) return;

		if (!data.get("name") || !data.get("email") || !data.get("password")) {
			toast.error("Please fill all fields");

			return;
		}

		setError(null);

		try {
			const res = await signup(data);
			if (res.success) toast.success(`Welcome ${res.user?.name}!`);

			router.replace(redirect);
		} catch (error) {
			if (axios.isAxiosError<AuthApiError>(error)) {
				setError(error.response?.data.errors ?? {});
			} else if (error instanceof Error)
				setError({ internalErr: error.message });
			else setError({ internalErr: "Unknown error" });
		}
	};

	return (
		<form className="mt-6 space-y-4" action={onSubmit}>
			<div className="space-y-2">
				<Label className="text-sm font-medium" htmlFor="name">
					Name
				</Label>
				<Input
					id="name"
					type="text"
					placeholder="John Doe"
					name="name"
					required
				/>
				{error?.name && (
					<p className="text-sm text-destructive">{error.name}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label className="text-sm font-medium" htmlFor="email">
					Email
				</Label>
				<Input
					id="email"
					type="email"
					placeholder="you@example.com"
					name="email"
					required
				/>
				{error?.email && (
					<p className="text-sm text-destructive">{error.email}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label className="text-sm font-medium" htmlFor="password">
					Password
				</Label>
				<Input
					id="password"
					type="password"
					placeholder="••••••••"
					name="password"
					required
				/>
				{error?.password && (
					<p className="text-sm text-destructive">{error.password}</p>
				)}
			</div>

			{error?.internalErr || error?.message ? (
				<p className="text-sm text-destructive">
					Internal server error: {error.internalErr || error.message}
				</p>
			) : null}

			<Button
				type="submit"
				className={`w-full inline-flex items-center justify-center gap-1 ${isCreating ? "cursor-not-allowed" : "cursor-pointer"}`}
				disabled={isCreating}
			>
				{isCreating ? (
					<>
						<Loader className="w-4 h-4 animate-spin" />
						Creating...
					</>
				) : (
					"Create account"
				)}
			</Button>

			<p className="text-center text-sm text-muted-foreground">
				Already have an account?
				<Link href="/auth/signin" className="text-primary hover:underline ml-1">
					Sign in
				</Link>
			</p>
		</form>
	);
};

export default SignupForm;
