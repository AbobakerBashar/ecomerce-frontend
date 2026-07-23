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

export interface RegisterInput {
	name: string;
	email: string;
	password: string;
}

export interface UserResponse {
	success: boolean;
	message?: string;
	user?: {
		id: string;
		name: string;
		email: string;
		password: string;
		isAdmin: boolean;
		createdAt: string;
		updatedAt: string;
	};
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
