import { SpinnerContainer } from "@/components/ui/spinner";

export default function AuthLoading() {
	return (
		<SpinnerContainer
			isLoading
			size="2xl"
			label="Loading..."
			variant="gradient"
		/>
	);
}
