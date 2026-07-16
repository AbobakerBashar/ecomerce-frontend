import { Spinner } from "@/components/ui/spinner";
import React from "react";

const loading = () => {
	return (
		<Spinner variant="gradient" size="2xl" label="Loading Collectoons..." />
	);
};

export default loading;
