import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCheckout } from "@/hooks/checkout";
import { Address } from "@/types/user";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";

const CheckoutForm = () => {
	const { mutateAsync: checkout, isPending: isProcessing } = useCheckout();

	const [error, setError] = useState<string | null>(null);
	const [address, setAddress] = useState<Address>({
		fullName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		country: "US",
	});

	function update<K extends keyof Address>(key: K, value: Address[K]) {
		setAddress((a) => ({ ...a, [key]: value }));
	}

	function validate() {
		if (!address.fullName) return "Full name is required.";
		if (!address.email) return "Email is required.";
		if (!address.phone) return "Phone number is required.";
		if (!address.address) return "Address is required.";
		if (!address.city) return "City is required.";
		if (!address.state) return "State is required.";
		if (!address.zip) return "ZIP / Postal code is required.";
		return null;
	}

	async function onConfirm() {
		if (isProcessing) return;
		setError(null);
		const v = validate();
		if (v) {
			setError(v);
			return;
		}
		try {
			const res = await checkout(address);
			if (res.success) {
				window.location.href = res.url;
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return setError(
					error.response?.data?.message || "Something went wrong",
				);
			}
			setError("Faild");
		}
	}

	return (
		<div className="space-y-4">
			<Card className="p-5">
				<h2 className="text-base font-semibold text-foreground">
					Shipping details
				</h2>
				<Separator className="my-2.5" />

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="sm:col-span-2 space-y-2">
						<Label htmlFor="fullName">Full name</Label>
						<Input
							id="fullName"
							value={address.fullName}
							onChange={(e) => update("fullName", e.target.value)}
							placeholder="John Doe"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={address.email}
							onChange={(e) => update("email", e.target.value)}
							placeholder="you@example.com"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="phone">Phone</Label>
						<Input
							id="phone"
							type="tel"
							value={address.phone}
							onChange={(e) => update("phone", e.target.value)}
							placeholder="+1 555 123 4567"
						/>
					</div>

					<div className="sm:col-span-2 space-y-2">
						<Label htmlFor="address1">Address</Label>
						<Input
							id="address1"
							value={address.address}
							onChange={(e) => update("address", e.target.value)}
							placeholder="Street address"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="city">City</Label>
						<Input
							id="city"
							value={address.city}
							onChange={(e) => update("city", e.target.value)}
							placeholder="New York"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="state">State</Label>
						<Input
							id="state"
							value={address.state}
							onChange={(e) => update("state", e.target.value)}
							placeholder="NY"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="zip">ZIP / Postal</Label>
						<Input
							id="zip"
							value={address.zip}
							onChange={(e) => update("zip", e.target.value)}
							placeholder="10001"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="country">Country</Label>
						<Input
							id="country"
							value={address.country}
							onChange={(e) => update("country", e.target.value)}
							placeholder="US"
						/>
					</div>
				</div>
			</Card>

			<Card className="p-5">
				<h2 className="text-base font-semibold text-foreground">Payment</h2>
				<Separator className="my-2" />

				<div className="space-y-3">
					<p className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
						Stripe/Razorpay card fields will be mounted here later.
					</p>

					<div className="space-y-2">
						<Label htmlFor="note">Order note (optional)</Label>
						<Textarea
							id="note"
							placeholder="Add delivery instructions"
							rows={4}
						/>
					</div>
				</div>
			</Card>

			{error ? <p className="text-sm text-destructive">{error}</p> : null}
			<Button
				className={`w-full ${isProcessing ? "cursor-not-allowed" : "cursor-pointer"}`}
				onClick={onConfirm}
				disabled={isProcessing}
				type="button"
			>
				{isProcessing ? (
					<>
						<Loader className="w-4 h-4 animate-spin" />
						Processing...
					</>
				) : (
					"Confirm order"
				)}
			</Button>
		</div>
	);
};

export default CheckoutForm;
