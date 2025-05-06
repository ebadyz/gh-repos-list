import { Route } from "@/routes/__root";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import type { UsePaginationResult } from "./use-pagination.types";

const usePagination = (): UsePaginationResult => {
	const search = useSearch({ from: Route.fullPath });
	const navigate = useNavigate({ from: Route.fullPath });

	const page = search.page ?? 1;

	const setPage = useCallback(
		(page: number) => {
			navigate({ search: { page, q: search.q, sort: search.sort } });
		},
		[navigate, search.q, search.sort],
	);

	return [page, setPage];
};

export default usePagination;
