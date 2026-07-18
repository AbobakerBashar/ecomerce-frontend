import { useAddToCart } from "@/hooks/cart";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useGetUser } from "@/hooks/user";
import { usePathname, useRouter } from "next/navigation";

type Props = {
	className?: string;
	productId: string;
	variants?: {
		color?: string;
		size?: string;
	};
	quantity: number;
};

const AddToCartBtn = ({ className, productId, quantity, variants }: Props) => {
	const { data } = useGetUser();
	const isAuthenticated = !!data?.user;

	const router = useRouter();
	const pathname = usePathname();

	const { mutateAsync: addToCart, isPending: isAddingToCart } = useAddToCart();

	const handleAddToCart = async () => {
		if (!isAuthenticated)
			return router.push(`/auth/signin?redirect=${pathname}`);

		try {
			if (!productId || isAddingToCart) return;

			const res = await addToCart({
				productId,
				quantity,
				variants,
			});

			if (res.success) toast.success("Item added to cart");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data.message)
					return toast.error(error.response?.data.message);
				else if (error.response?.data.errors) {
					const errMsg: string = Object.values(
						error.response?.data.errors,
					).reduce((acc: string, msg) => `${acc}\n${msg}`, "");
					return toast.error(errMsg);
				} else return toast.error("Something went wrong");
			} else toast.error("Something went wrong");
		}
	};

	return (
		<Button
			variant="default"
			size="sm"
			disabled={isAddingToCart}
			onClick={handleAddToCart}
			className={`${className} ${
				isAddingToCart ? "cursor-not-allowed" : "cursor-pointer"
			}`}
		>
			{isAddingToCart ? (
				<>
					<Loader className="w-4 h-4 animate-spin" />
					Adding..
				</>
			) : (
				<>Add to cart</>
			)}
		</Button>
	);
};

export default AddToCartBtn;
