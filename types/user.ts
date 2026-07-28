export interface Address {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}
export interface AddressInput {
	label: "Home" | "Work" | "Other";
	phone: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	isDefault: boolean;
}
export interface AddressRes {
	label: "Home" | "Work" | "Other";
	phone: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	isDefault: boolean;
	id?: string;
}

export interface RegisterInput {
	name: string;
	email: string;
	password: string;
}

export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
	phone?: string;
	isAdmin: boolean;
	createdAt: string;
	updatedAt: string;
	addresses: Address[];
};
export interface UserResponse {
	success: boolean;
	message?: string;
	user?: User;
	errors?: object;
}

export interface AuthApiError {
	success: boolean;
	errors?: Record<string, string>;
	message?: string;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface LogoutResponse {
	success: boolean;
	message?: string;
}

export interface UpdateProfileInput {
	name: string;
	email: string;
	phone?: string;
}

export interface ChangePasswordInput {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface ProfileUpdateResponse {
	success: boolean;
	message?: string;
	user?: User;
	errors?: Record<string, string>;
}

export interface PasswordChangeResponse {
	success: boolean;
	message?: string;
	errors?: Record<string, string>;
}
