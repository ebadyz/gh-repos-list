import { Alert, Box, Card, Heading, List, Text } from "@chakra-ui/react";

import { Link, createFileRoute, useSearch } from "@tanstack/react-router";

import { ErrorCard } from "@/components/error-card";
import { Pagination, RepositoryOptions } from "@/components/pages";
import { DEFAULT_SORT } from "@/components/pages/home/options";
import { SkeletonCard } from "@/components/skeleton-card";

import { useRepositoryList } from "@/api/repository/repository.query";
import type { RepositoryListParams } from "@/api/repository/repository.types";

import { compactObject } from "@/utils/compact-object";

export const Route = createFileRoute("/")({
	component: Repositories,
	validateSearch: (search: RepositoryListParams) => ({
		page: search.page && search.page > 0 ? search.page : undefined,
		q: search.q ? search.q : undefined,
		sort:
			search.sort && VALID_SORT_VALUES.includes(search.sort)
				? search.sort
				: undefined,
	}),
});

const DEFAULT_QUERY = "stars:>0 in:name,description";
const DEFAULT_PAGE = 1;
const REPOSITORIES_PER_PAGE = 10;
const VALID_SORT_VALUES = ["updated", "stars", "forks"];

function Repositories() {
	const searchParams = useSearch({ from: Route.fullPath });

	const {
		repositoryList,
		repositoryListIsLoading,
		repositoryListError,
		repositoryListRefetch,
	} = useRepositoryList(
		compactObject({
			q: searchParams.q
				? `${searchParams.q} in:name,description`
				: DEFAULT_QUERY,
			sort: searchParams.sort || DEFAULT_SORT,
			order: "desc",
			per_page: REPOSITORIES_PER_PAGE,
			page: searchParams.page ?? DEFAULT_PAGE,
		}),
	);

	const hasRepositories =
		repositoryList?.items && repositoryList?.items.length > 0;

	if (repositoryListIsLoading) {
		return (
			<Box width={{ base: "full", md: "1/2" }} px="4" mx="auto" minH="100vh">
				<RepositoryOptions />
				<List.Root as="ul" spaceY={4} width="full">
					<SkeletonCard size={10} />
				</List.Root>
			</Box>
		);
	}

	if (repositoryListError) {
		const errorMessage = `${repositoryListError.message}, please try again.`;
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
				{hasRepositories ? (
					<>
						{repositoryList?.items.map((repo) => (
							<Card.Root as="li" key={repo.id}>
								<Card.Header>
									<Link
										from={Route.fullPath}
										to={`/${encodeURIComponent(repo.full_name)}`}
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
					</>
				) : (
					<Alert.Root status="info">
						<Alert.Indicator />
						<Alert.Title>No repositories found</Alert.Title>
					</Alert.Root>
				)}
			</List.Root>
			{hasRepositories && (
				<Pagination
					pageSize={REPOSITORIES_PER_PAGE}
					page={searchParams.page ?? 1}
					count={repositoryList?.total_count}
				/>
			)}
		</Box>
	);
}
