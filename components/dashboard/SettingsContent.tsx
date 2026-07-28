"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChangePassword, useUpdateProfile } from "@/hooks/user";
import { ChangePasswordInput, UpdateProfileInput, User } from "@/types/user";
import { Loader } from "lucide-react";

type Props = {
	user: User;
};

const SettingsContent = ({ user }: Props) => {
	const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
		useUpdateProfile();
	const { mutateAsync: changePassword, isPending: isUpdatingPassword } =
		useChangePassword();

	const [error, setError] = useState("");

	const [profileData, setProfileData] = useState<UpdateProfileInput>({
		name: user.name || "",
		email: user.email || "",
		phone: user.phone || "",
	});

	const [profileErrors, setProfileErrors] = useState<Partial<
		Record<keyof UpdateProfileInput, string>
	> | null>(null);

	const [passwordData, setPasswordData] = useState<ChangePasswordInput>({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [passwordErrors, setPasswordErrors] = useState<Partial<
		Record<keyof ChangePasswordInput, string>
	> | null>(null);

	const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPasswordData((prev) => ({ ...prev, [name]: value }));
	};

	const handleProfileSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isUpdatingPassword || isUpdatingProfile) return;

		setError("");
		setProfileErrors(null);

		if (
			profileData.email === user.email &&
			profileData.name === user.name &&
			profileData.phone === user.phone
		) {
			setError(
				"Nothing has been changed. all fields are the same whith previous",
			);
			return;
		}

		const payload: UpdateProfileInput = { name: "", phone: "", email: "" };

		if (profileData.name) payload.name = profileData.name;
		else payload.name = user.name;

		if (profileData.email) payload.email = profileData.email;
		else payload.email = user.email;

		if (profileData.phone) payload.phone = profileData.phone;
		else payload.phone = user.phone;

		const res = await updateProfile(payload);

		if (res.success) {
			toast.success("Profile updated successfully!");
		} else {
			if (res.errors) setProfileErrors(res.errors);
			else if (res.status === 500) setError("Internal server error");
			else setError(res.message);
		}
	};

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isUpdatingPassword || isUpdatingProfile) return;

		setError("");
		setPasswordErrors(null);

		if (passwordData.newPassword !== passwordData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (passwordData.newPassword.length < 6) {
			setPasswordErrors((prev) => ({
				...prev,
				newPassword: "New password must be at least 6 characters",
			}));
			return;
		}

		const res = await changePassword(passwordData);

		if (res.success) toast.success("Password changed successfully!");
		else {
			if (res.errors) setPasswordErrors(res.errors);
			else if (res.status === 500) setError("Internal server error");
			else setError(res.message);
		}
	};

	return (
		<Tabs defaultValue="profile" className="w-full flex flex-col">
			<TabsList className="grid grid-cols-2 border border-primary/30">
				<TabsTrigger
					onClick={() => {
						setError("");
						setPasswordErrors(null);
						setProfileErrors(null);
					}}
					value="profile"
					className="cursor-pointer"
				>
					Edit Profile
				</TabsTrigger>
				<TabsTrigger
					onClick={() => {
						setError("");
						setPasswordErrors(null);
						setProfileErrors(null);
					}}
					value="password"
					className="cursor-pointer"
				>
					Change Password
				</TabsTrigger>
			</TabsList>

			<TabsContent value="profile" className="mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Profile Information</CardTitle>
						<p className="text-sm text-muted-foreground">
							Update your name, email, and contact details.
						</p>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleProfileSubmit} className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="name">Full name</Label>
									<Input
										id="name"
										name="name"
										value={profileData.name}
										onChange={handleProfileChange}
										required
									/>
									{profileErrors?.name && (
										<p className="text-red-500">{profileErrors.name}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={profileData.email}
										onChange={handleProfileChange}
										required
									/>
									{profileErrors?.email && (
										<p className="text-red-500">{profileErrors.email}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Phone</Label>
									<Input
										id="phone"
										name="phone"
										type="tel"
										value={profileData.phone}
										onChange={handleProfileChange}
										placeholder="+1 (555) 000-0000"
									/>
									<p className="text-xs text-muted-foreground">
										Optional. Used for order updates.
									</p>
									{profileErrors?.phone && (
										<p className="text-red-500">{profileErrors.phone}</p>
									)}
								</div>
							</div>

							<Separator />

							{error && <p className="text-red-500">{error}</p>}

							<div className="flex items-center justify-end gap-3">
								<Button
									type="button"
									className="cursor-pointer"
									variant="outline"
									disabled={isUpdatingPassword || isUpdatingProfile}
									onClick={() => {
										setProfileData({
											name: user.name || "",
											email: user.email || "",
											phone: user.phone || "",
										});
										setError("");
									}}
								>
									Reset
								</Button>
								<Button
									type="submit"
									className="cursor-pointer"
									disabled={isUpdatingPassword || isUpdatingProfile}
								>
									{isUpdatingProfile ? (
										<>
											<Loader className="w-4 h-4 animate-spin" />
											Saving...
										</>
									) : (
										<>Save Changes</>
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="password" className="mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
						<p className="text-sm text-muted-foreground">
							Update your password. You&apos;ll need to enter your current
							password to make changes.
						</p>
					</CardHeader>
					<CardContent>
						<form onSubmit={handlePasswordSubmit} className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="currentPassword">Current password</Label>
									<Input
										id="currentPassword"
										name="currentPassword"
										type="password"
										value={passwordData.currentPassword}
										onChange={handlePasswordChange}
										required
									/>
									{passwordErrors?.currentPassword && (
										<p className="text-red-500">
											{passwordErrors.currentPassword}
										</p>
									)}
								</div>
							</div>

							<Separator />

							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="newPassword">New password</Label>
									<Input
										id="newPassword"
										name="newPassword"
										type="password"
										value={passwordData.newPassword}
										onChange={handlePasswordChange}
										required
										minLength={6}
									/>
									<p className="text-xs text-muted-foreground">
										At least 6 characters.
									</p>
									{passwordErrors?.newPassword && (
										<p className="text-red-500">{passwordErrors.newPassword}</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Confirm new password</Label>
									<Input
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										value={passwordData.confirmPassword}
										onChange={handlePasswordChange}
										required
										minLength={6}
									/>
									{passwordErrors?.confirmPassword && (
										<p className="text-red-500">
											{passwordErrors.confirmPassword}
										</p>
									)}
								</div>
							</div>

							<Separator />

							{error && <p className="text-red-500">{error}</p>}

							<div className="flex items-center justify-end gap-3">
								<Button
									type="button"
									className="cursor-pointer"
									variant="outline"
									disabled={isUpdatingPassword || isUpdatingProfile}
									onClick={() => {
										setPasswordData({
											currentPassword: "",
											newPassword: "",
											confirmPassword: "",
										});
										setError("");
									}}
								>
									Reset
								</Button>
								<Button
									className="cursor-pointer"
									type="submit"
									disabled={isUpdatingPassword || isUpdatingProfile}
								>
									{isUpdatingPassword ? (
										<>
											<Loader className="w-4 h-4 animate-spin" />
											Changing...
										</>
									) : (
										<>Change Password</>
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default SettingsContent;
