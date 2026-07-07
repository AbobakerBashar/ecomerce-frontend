"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useSignin } from "@/hooks/user";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SigninForm = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const redirect = searchParams.get("redirect") || "/";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<Record<string, string> | null>(null);

	const { mutateAsync: signin, isPending: isLoggingIn } = useSignin();

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		if (isLoggingIn) return;

		if (!email || !password)
			return toast.error("Please enter email and password.");

		try {
			const res = await signin({
				email,
				password,
			});
			if (res.success) {
				toast.success(`Welcome back ${res.user?.name}!`);
				router.replace(redirect);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.errors ?? {});
			} else if (error instanceof Error)
				setError({ internalErr: error.message });
			else setError({ internalErr: "Unknown error" });
		}
	}

	return (
		<form className="mt-6 space-y-4" onSubmit={onSubmit}>
			<div className="space-y-2">
				<Label className="text-sm font-medium" htmlFor="email">
					Email
				</Label>
				<Input
					id="email"
					type="email"
					placeholder="you@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error?.password && (
					<p className="text-sm text-destructive">{error.password}</p>
				)}
			</div>

			{error?.internalErr ||
				(error?.message && (
					<p className="text-sm text-destructive">
						{error.internalErr || error.message}
					</p>
				))}

			<Button type="submit" className="w-full" disabled={isLoggingIn}>
				{isLoggingIn ? (
					<>
						<Loader className="w-4 h-4 animate-spin" />
						Signing in...
					</>
				) : (
					"Sign in"
				)}
			</Button>

			<p className="text-center text-sm text-muted-foreground">
				Don&apos;t have an account?
				<Link href="/auth/signup" className="text-primary hover:underline ml-1">
					Sign up
				</Link>
			</p>
		</form>
	);
};

export default SigninForm;
