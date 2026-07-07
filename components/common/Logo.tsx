import Image from "next/image";

const Logo = () => {
	return (
		<>
			<Image
				src="/logos/light.svg"
				alt="ShopEase"
				width={180}
				height={50}
				className="h-14 w-auto dark:hidden"
			/>

			<Image
				src="/logos/dark.svg"
				alt="ShopEase"
				width={180}
				height={45}
				className="h-14 w-auto hidden dark:block"
			/>
		</>
	);
};

export default Logo;
