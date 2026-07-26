import { SpinnerContainer } from "@/components/ui/spinner";

export default function AdminProductsLoading() {
	return (
		<SpinnerContainer
			isLoading
			size="lg"
			label="Loading product form..."
			variant="default"
		/>
	);
}
