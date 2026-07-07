import Image from "next/image";

const AuthImage = () => {
	return (
		<div className="h-screen hidden md:block">
			<Image
				src="/images/hero-3.jpg"
				width={1920}
				height={1080}
				sizes="fill"
				quality={100}
				alt="Image"
				className="object-cover w-full h-full"
			/>
		</div>
	);
};

export default AuthImage;
