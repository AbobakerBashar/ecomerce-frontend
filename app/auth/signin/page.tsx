import SigninForm from "@/components/auth/SigninForm";

export default function SignInPage() {
	return (
		<section className="space-y-8 px-4 lg:px-8 max-w-md mx-auto lg:max-w-full">
			<div className="space-y-3 text-center mt-8">
				<h1 className="text-2xl font-semibold">Welcome Back 👋</h1>
				<p className="text-muted-foreground">
					We&apos;re happy to see you again. Sign in to access your personalized
					shopping experience.
				</p>
			</div>

			<SigninForm />
		</section>
	);
}
