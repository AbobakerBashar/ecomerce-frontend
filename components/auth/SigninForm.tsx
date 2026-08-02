"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useSignin } from "@/hooks/user";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SigninForm = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const redirect = searchParams.get("redirect") || "/";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errors, setErrors] = useState<Record<string, string> | null>(null);

	const { mutateAsync: signin, isPending: isLoggingIn } = useSignin();

	const onSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();

		setErrors(null);

		if (isLoggingIn) return;

		if (!email || !password) {
			toast.error("Please enter email and password.");
			return;
		}

		const res = await signin({
			password,
			email,
		});

		if (res.success) {
			toast.success(`Welcome back ${res.user?.name}!`);
			router.replace(redirect);
		} else {
			if (res.errors) setErrors(res.errors ?? {});
			else setErrors({ general: res.message });
		}
	};

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
				<p className="text-sm text-destructive">{errors.general}</p>
			)}

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
