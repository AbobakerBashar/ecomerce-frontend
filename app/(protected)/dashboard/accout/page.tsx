import { redirect } from "next/navigation";

export default function AccountLegacyPage() {
	// Legacy route: `accout` (typo). Redirect to the correct dashboard account overview.
	redirect("/dashboard");
}
