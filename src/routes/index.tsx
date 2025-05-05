import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import {
	Link,
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";

import type { RepositoryListResponse } from "@/api/repository";
import { getRepositoryList } from "@/api/repository";

import useBoolean from "@/hooks/use-boolean";
import usePagination from "@/hooks/use-pagination";

import { compactObject } from "@/utils/compact-object";

export const Route = createFileRoute("/")({
	component: Repositories,
	validateSearch: (search: Record<string, unknown>) => ({
		page: typeof search.page === "number" ? search.page : undefined,
		q: typeof search.q === "string" ? search.q : undefined,
		sort: typeof search.sort === "string" ? search.sort : undefined,
	}),
});

const DEFAULT_QUERY = "stars:>0";

function Repositories() {
	const searchParams = useSearch({ from: Route.fullPath });
	const [repositories, setRepositories] = useState<RepositoryListResponse>({
		items: [],
		total_count: 0,
		incomplete_results: false,
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const loading = useBoolean(true);
	const { nextPage, prevPage, page } = usePagination();
	const navigate = useNavigate({ from: Route.fullPath });
	const updateQueryParams = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			const { name: inputName, value: inputValue } = e.target;
			navigate({
				search: (prev) => ({
					...prev,
					[inputName === "search" ? "q" : inputName]: inputValue,
					page,
				}),
			});
		},
		[navigate, page],
	);

	const fetchRepositories = useCallback(async () => {
		try {
			const isUserSearch = searchParams.q
				? searchParams.q.trim().length > 0
				: false;
			const query = isUserSearch
				? `${searchParams.q} in:name,description`
				: DEFAULT_QUERY;
			const params = compactObject({
				q: query,
				sort: searchParams.sort,
				order: "desc",
				per_page: 10,
				page,
			});
			const response = await getRepositoryList(params);
			setRepositories(response.data);
		} catch (error) {
			const errorMessage = "An error occurred while fetching repositories.";
			setErrorMessage(errorMessage);
			console.error(error);
		} finally {
			loading.setFalse();
		}
	}, [loading.setFalse, page, searchParams.q, searchParams.sort]);

	useEffect(() => {
		fetchRepositories();
	}, [fetchRepositories]);

	if (loading.value)
		return (
			<output
				aria-live="polite"
				className="min-h-screen flex items-center justify-center bg-[#282c34] text-white"
			>
				<span className="text-lg animate-pulse">Loading repositories…</span>
			</output>
		);

	if (errorMessage)
		return (
			<output
				aria-live="assertive"
				className="min-h-screen flex items-center justify-center bg-[#282c34] text-red-400"
			>
				<span className="text-lg font-semibold">{errorMessage}</span>
			</output>
		);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white relative">
			<header className="w-full max-w-2xl mx-auto p-4">
				<form className="flex items-center gap-4 mb-8 bg-[#23272f] p-2 rounded-lg">
					<input
						name="search"
						type="search"
						value={searchParams.q}
						onChange={updateQueryParams}
						placeholder="Find a repository…"
						aria-label="Find a repository"
						className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#61dafb] border border-[#23272f]"
					/>
					<select
						name="sort"
						onChange={updateQueryParams}
						aria-label="Sort"
						value={searchParams.sort}
						className="bg-[#23272f] text-white px-4 py-2 rounded border border-[#23272f] focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
					>
						<option value="updated">Last Updated</option>
						<option value="stars">Stars</option>
						<option value="forks">Forks</option>
					</select>
				</form>
				<ul className="space-y-4">
					{repositories.items.map((repo) => (
						<li
							key={repo.id}
							aria-label={`Repository: ${repo.full_name}`}
							className="bg-[#23272f] rounded-lg p-4 shadow hover:bg-[#1a1d23] focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
						>
							<Link
								from={Route.fullPath}
								to={`/${repo.full_name}`}
								className="text-[#61dafb] text-xl font-semibold hover:underline"
								aria-label={`Open ${repo.full_name} on GitHub`}
							>
								{repo.full_name}
							</Link>
							<p className="mt-2 text-base text-gray-300">{repo.description}</p>
						</li>
					))}
				</ul>
				<div className="flex justify-center items-center mt-8 gap-4">
					<button type="button" onClick={prevPage} disabled={page === 1}>
						Previous
					</button>
					<button type="button" onClick={nextPage} disabled={page === 10}>
						Next
					</button>
				</div>
			</header>
		</div>
	);
}
