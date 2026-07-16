import type { Pagination as PaginationType } from "@/types/product";
import { Button } from "../ui/button";

const getPageNumbers = (current: number, total: number) => {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	if (current <= 4) {
		return [1, 2, 3, 4, 5, "...", total];
	}

	if (current >= total - 3) {
		return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
	}

	return [1, "...", current - 1, current, current + 1, "...", total];
};

type Props = {
	updateQuery: (key: string, values: string | string[] | null) => void;
	pagination: PaginationType;
};

const Pagination = ({ pagination, updateQuery }: Props) => {
	return (
		<div className="mt-10 flex items-center justify-center gap-2">
			<Button
				variant="outline"
				disabled={pagination.currentPage === 1}
				className={`${pagination.currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
				onClick={() => updateQuery("page", String(pagination.currentPage - 1))}
			>
				Previous
			</Button>

			{getPageNumbers(pagination.currentPage, pagination.totalPages).map(
				(page, index) =>
					page === "..." ? (
						<span key={index} className="px-2">
							...
						</span>
					) : (
						<Button
							key={page}
							variant={pagination.currentPage === page ? "default" : "outline"}
							onClick={() =>
								pagination.currentPage !== page &&
								updateQuery("page", String(page))
							}
							className={`px-3 ${pagination.currentPage === page ? "cursor-not-allowed" : "cursor-pointer"}`}
						>
							{page}
						</Button>
					),
			)}

			<Button
				variant="outline"
				disabled={pagination.currentPage === pagination.totalPages}
				onClick={() =>
					updateQuery("page", String(Number(pagination.currentPage) + 1))
				}
				className={`px-3 ${pagination.currentPage === pagination.totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
