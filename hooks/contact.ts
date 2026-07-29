import { sendMessage } from "@/lib/contact";
import type { ContactInput } from "@/types/contact";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
	return useMutation({
		mutationFn: async (constact: ContactInput) => await sendMessage(constact),
	});
};
