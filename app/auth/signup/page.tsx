import SignupForm from "@/components/auth/SignupForm";

export default function SignUpPage() {
	return (
		<section className="space-y-8 px-4 lg:px-8 max-w-md mx-auto lg:max-w-full">
			<div className="space-y-3 text-center mt-8">
				<h1 className="text-2xl font-semibold">Start Your Shopping Journey</h1>
				<p className="text-muted-foreground">
					Create an account to unlock exclusive offers, save your favorite
					products, track every order, and enjoy a faster, more personalized
					shopping experience.
				</p>
			</div>

			<SignupForm />
		</section>
	);
}
