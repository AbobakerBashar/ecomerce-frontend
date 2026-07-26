import { SpinnerContainer } from "@/components/ui/spinner";

export default function ProductDetailLoading() {
	return (
		<SpinnerContainer
			isLoading
			size="2xl"
			label="Loading product details..."
			variant="gradient"
		/>
	);
}
