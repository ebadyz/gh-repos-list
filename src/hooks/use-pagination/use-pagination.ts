import { useCallback } from "react";
import type { UsePaginationResult } from "./use-pagination.types";

import { Route } from "@/routes/__root";
import { useNavigate, useSearch } from "@tanstack/react-router";

const usePagination = (): UsePaginationResult => {
	const search = useSearch({ from: Route.fullPath });
	const navigate = useNavigate({ from: Route.fullPath });

	const page = search.page ?? 1;

	const setPage = useCallback(
		(page: number) => {
			const newSearch = { ...search };
			if (page === 1) {
				newSearch.page = undefined;
			} else {
				newSearch.page = page;
			}
			navigate({ search: newSearch });
		},
		[navigate, search],
	);

	return [page, setPage];
};

export default usePagination;
