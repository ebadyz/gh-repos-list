import { Route } from "@/routes/__root";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import type { UsePaginationResult } from "./use-pagination.types";

const usePagination = (): UsePaginationResult => {
	const search = useSearch({ from: Route.fullPath });
	const navigate = useNavigate({ from: Route.fullPath });

	const page = search.page ?? 1;

	const nextPage = useCallback(() => {
		if (!page) return;
		navigate({ search: { page: page + 1, q: search.q, sort: search.sort } });
	}, [page, navigate, search.q, search.sort]);

	const prevPage = useCallback(() => {
		if (page === 1) return;
		navigate({ search: { page: page - 1, q: search.q, sort: search.sort } });
	}, [page, navigate, search.q, search.sort]);

	return { nextPage, prevPage, page };
};

export default usePagination;
