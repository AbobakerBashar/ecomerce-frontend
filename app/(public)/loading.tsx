import { SpinnerContainer } from "@/components/ui/spinner";

export default function PublicLoading() {
	return (
		<SpinnerContainer
			isLoading
			size="2xl"
			label="Loading page..."
			variant="gradient"
		/>
	);
}
