import { Loader, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/user";
import { toast } from "sonner";
import axios from "axios";

interface LogoOutBtnProps {
	className?: string;
	ariaLabel?: string;
	size?: "sm" | "lg";
}

const LogoOutBtn = ({ className, ariaLabel, size }: LogoOutBtnProps) => {
	const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

	const handleLogout = async () => {
		try {
			await logout();
			toast.success("Logged out successfully");
		} catch (error) {
			if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
			else toast.error("Something went wrong");
		}
	};

	return (
		<Button
			size={size || "sm"}
			variant="destructive"
			disabled={isLoggingOut}
			onClick={handleLogout}
			className={`cursor-pointer ${className}`}
		>
			{isLoggingOut ? (
				<Loader className="w-4 h-4 animate-spin" />
			) : (
				<>
					<LogOut className="h-4 w-4" />
					{ariaLabel && <span>{ariaLabel}</span>}
				</>
			)}
		</Button>
	);
};

export default LogoOutBtn;
