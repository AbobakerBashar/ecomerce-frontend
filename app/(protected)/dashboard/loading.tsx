import { SpinnerContainer } from "@/components/ui/spinner";

export default function DashboardLoading() {
	return (
		<SpinnerContainer
			isLoading
			size="lg"
			label="Loading dashboard..."
			variant="default"
		/>
	);
}
