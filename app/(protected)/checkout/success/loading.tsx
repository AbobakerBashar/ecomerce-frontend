import { SpinnerContainer } from "@/components/ui/spinner";

export default function CheckoutLoading() {
	return (
		<div className="mx-auto max-w-6xl py-6">
			<SpinnerContainer isLoading size="xl" label="Loading order..." />
		</div>
	);
}
