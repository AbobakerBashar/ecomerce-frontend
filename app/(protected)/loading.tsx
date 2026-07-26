import { SpinnerContainer } from "@/components/ui/spinner";

export default function ProtectedLoading() {
	return (
		<SpinnerContainer
			isLoading
			size="lg"
			label="Loading..."
			variant="default"
		/>
	);
}
