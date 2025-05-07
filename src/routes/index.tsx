import { Box, Card, Heading, List, Text } from "@chakra-ui/react";

import { Link, createFileRoute, useSearch } from "@tanstack/react-router";

import { ErrorCard } from "@/components/error-card";
import { Pagination, RepositoryOptions } from "@/components/pages";
import { SkeletonCard } from "@/components/skeleton-card";

import { DEFAULT_SORT } from "@/components/pages/home/options";
import usePagination from "@/hooks/use-pagination";

import { useRepositoryList } from "@/api/repository/repository.query";

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
const REPOSITORIES_PER_PAGE = 10;

function Repositories() {
	const searchParams = useSearch({ from: Route.fullPath });

	const isUserSearch = searchParams.q
		? searchParams.q.trim().length > 0
		: false;
	const query = isUserSearch
		? `${searchParams.q} in:name,description`
		: DEFAULT_QUERY;

	const [page, setPage] = usePagination();

	const {
		repositoryList,
		repositoryListIsLoading,
		repositoryListError,
		repositoryListRefetch,
	} = useRepositoryList(
		compactObject({
			q: query,
			sort: searchParams.sort || DEFAULT_SORT,
			order: "desc",
			per_page: REPOSITORIES_PER_PAGE,
			page,
		}),
	);

	// const navigate = useNavigate({ from: Route.fullPath });

	// const updateQueryParams = useCallback(
	// 	(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	// 		const { name: inputName, value: inputValue } = e.target;
	// 		navigate({
	// 			search: (prev) => ({
	// 				...prev,
	// 				[inputName === "search" ? "q" : inputName]: inputValue,
	// 				page,
	// 			}),
	// 		});
	// 	},
	// 	[navigate, page],
	// );

	if (repositoryListIsLoading) {
		return (
			<Box width={{ base: "full", md: "1/2" }} px="4" mx="auto" minH="100vh">
				<List.Root as="ul" spaceY={4} width="full">
					<SkeletonCard size={10} />
				</List.Root>
			</Box>
		);
	}

	if (repositoryListError) {
		const errorMessage = `${repositoryListError.message}, Please try again.`;
		const retryRepositoryList = () => repositoryListRefetch();
		return (
			<ErrorCard
				errorMessage={errorMessage}
				onRetry={retryRepositoryList}
				cardProps={{ p: 4, rounded: "lg", w: { base: "full", md: "1/3" } }}
				as="output"
				width={{ base: "full" }}
				justifyContent="center"
				alignItems="center"
				minH="calc(100vh - 60px)"
				px={4}
			/>
		);
	}

	return (
		<Box width={{ base: "full", md: "1/2" }} px="4" mx="auto">
			<RepositoryOptions />
			<List.Root spaceY={4}>
				{repositoryList?.items.map((repo) => (
					<Card.Root as="li" key={repo.id}>
						<Card.Header>
							<Link
								from={Route.fullPath}
								to={`/${repo.full_name}`}
								aria-label={`Open ${repo.full_name} on GitHub`}
							>
								<Heading
									size="xl"
									color="cornflowerblue"
									_hover={{ textDecoration: "underline" }}
								>
									{repo.full_name}
								</Heading>
							</Link>
						</Card.Header>
						<Card.Body>
							<Text color="colorPalette.400">{repo.description}</Text>
						</Card.Body>
					</Card.Root>
				))}
			</List.Root>
			<Pagination
				pageSize={REPOSITORIES_PER_PAGE}
				page={page}
				count={repositoryList?.total_count}
				onPageChange={(details) => setPage(details.page)}
			/>
		</Box>
	);
}
