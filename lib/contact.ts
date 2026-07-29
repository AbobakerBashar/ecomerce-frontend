import { ContactInput } from "@/types/contact";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export const sendMessage = async (contact: ContactInput) => {
	const payload = {
		...contact,
		type: contact.type.split(" ")[0].toLowerCase(),
	};

	const res = await axios.post(`${API_URL}/contact`, payload);
	return res.data;
};
