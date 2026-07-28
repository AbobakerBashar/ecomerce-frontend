import SettingsContent from "@/components/dashboard/SettingsContent";
import { getUserAction } from "@/lib/auth";
import axios from "axios";

const loadUser = async () => {
	try {
		const res = await getUserAction();
		if (res.success) return res.user;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.status === 500) throw new Error("Internal server error");
			throw new Error(error.response?.data?.message || "Faild to load user");
		}
	}
};

export const revalidate = 0;

export default async function SettingsPage() {
	const user = await loadUser();

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Manage your profile and account security.
				</p>
			</div>

			<SettingsContent user={user} />
		</div>
	);
}
