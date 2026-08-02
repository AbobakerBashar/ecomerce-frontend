"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useSignup } from "@/hooks/user";
import { Loader } from "lucide-react";
import { Label } from "../ui/label";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const SignupForm = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const redirect = searchParams.get("redirect") || "/";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [errors, setErrors] = useState<Record<string, string> | null>(null);

	const { mutateAsync: signup, isPending: isCreating } = useSignup();

	const onSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();

		if (isCreating) return;

		if (!name || !password || !email) {
			toast.error("Please fill all fields");

			return;
		}

		setErrors(null);

		const res = await signup({
			email,
			name,
			password,
		});
		if (res.success) {
			toast.success(`Welcome ${res.user?.name}!`);
			router.replace(redirect);
		} else {
			if (res.errors) setErrors(res.errors);
			else setErrors({ general: res.message });
		}
	};

	return (
		<form className="mt-6 space-y-4" onSubmit={onSubmit}>
			<div className="space-y-2">
				<Label className="text-sm font-medium" htmlFor="name">
					Name
				</Label>
				<Input
					id="name"
					type="text"
					placeholder="John Doe"
					onChange={(e) => setName(e.target.value)}
					required
				/>
				{errors?.name && (
					<p className="text-sm text-destructive">{errors.name}</p>
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
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				{errors?.email && (
					<p className="text-sm text-destructive">{errors.email}</p>
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
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{errors?.password && (
					<p className="text-sm text-destructive">{errors.password}</p>
				)}
			</div>

			{errors?.general && (
				<p className="text-sm text-destructive">
					Internal server error: {errors.general}
				</p>
			)}

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
