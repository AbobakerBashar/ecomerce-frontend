import { SpinnerContainer } from "@/components/ui/spinner";

export default function OrdersLoading() {
	return (
		<SpinnerContainer
			isLoading
			size="lg"
			label="Loading orders..."
			variant="default"
		/>
	);
}
