import { SpinnerContainer } from "@/components/ui/spinner";

export default function AdminLoading() {
	return (
		<SpinnerContainer
			isLoading
			size="lg"
			label="Loading admin dashboard..."
			variant="default"
		/>
	);
}
