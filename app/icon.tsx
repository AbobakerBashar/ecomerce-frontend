import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/svg+xml";

export default function Icon() {
	return new ImageResponse(
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
			<defs>
				<linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#8B5CF6" />
					<stop offset="100%" stopColor="#EC4899" />
				</linearGradient>
			</defs>
			<rect
				x="2"
				y="2"
				width="60"
				height="60"
				rx="14"
				fill="url(#brandGradient)"
			/>
			<path
				d="M22 28 L22 22 C22 18 26 18 26 22 L26 28"
				stroke="white"
				strokeWidth="2.5"
				fill="none"
				strokeLinecap="round"
			/>
			<path
				d="M19 28 L19 46 C19 50 29 50 29 46 L29 28 Z"
				fill="white"
				opacity="0.92"
			/>
			<polygon
				points="24,35 22,42 26,42 23,49 29,41 25,41 27,35"
				fill="#8B5CF6"
				opacity="0.85"
			/>
		</svg>,
		{ ...size },
	);
}
