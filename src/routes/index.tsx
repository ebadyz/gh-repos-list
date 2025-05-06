import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import {
	Box,
	Button,
	ButtonGroup,
	Card,
	Heading,
	Icon,
	Input,
	List,
	Pagination,
	Portal,
	Select,
	Stack,
	Text,
	VStack,
	createListCollection,
} from "@chakra-ui/react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

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

import CardSkeleton from "@/components/card-skeleton";

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
const DEFAULT_PAGE_SIZE = 10;

const SORT_OPTIONS = createListCollection({
	items: [
		{ label: "Updated", value: "updated" },
		{ label: "Stars", value: "stars" },
		{ label: "Forks", value: "forks" },
	],
});

function Repositories() {
	const searchParams = useSearch({ from: Route.fullPath });
	const [repositories, setRepositories] = useState<RepositoryListResponse>({
		items: [],
		total_count: 0,
		incomplete_results: false,
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const loading = useBoolean(true);
	const [page, setPage] = usePagination();
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
				per_page: DEFAULT_PAGE_SIZE,
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
			<Box width={{ base: "full", md: "1/2" }} px="4" mx="auto" minH="100vh">
				<List.Root as="ul" spaceY={4} width="full">
					<CardSkeleton size={10} />
				</List.Root>
			</Box>
		);

	if (errorMessage)
		return (
			<VStack
				as="output"
				width={{ base: "full" }}
				justifyContent="center"
				alignItems="center"
				minH="calc(100vh - 60px)"
			>
				<Text fontSize="lg" fontWeight="semibold">
					{errorMessage}
				</Text>
			</VStack>
		);

	return (
		<Box width={{ base: "full", md: "1/2" }} px="4" mx="auto">
			<Stack
				as="form"
				direction="row"
				gap={4}
				mb={8}
				bg="bg.secondary"
				p={2}
				rounded="lg"
			>
				<Input
					name="search"
					type="search"
					value={searchParams.q}
					onChange={updateQueryParams}
					placeholder="Find a repository…"
					aria-label="Find a repository"
					autoComplete="off"
				/>

				<Select.Root
					collection={SORT_OPTIONS}
					width="1/2"
					// value={searchParams.sort ? [searchParams.sort] : undefined}
					// onValueChange={(e) => {
					// 	navigate({
					// 		search: (prev) => ({
					// 			...prev,
					// 			sort: e.value,
					// 		}),
					// 	});
					// }}
					multiple={false}
				>
					<Select.HiddenSelect />
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Sort" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{SORT_OPTIONS.items.map((option) => (
									<Select.Item item={option} key={option.value}>
										{option.label}
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>
			</Stack>
			<List.Root spaceY={4}>
				{repositories.items.map((repo) => (
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
			<Pagination.Root
				as="footer"
				pageSize={DEFAULT_PAGE_SIZE}
				page={page}
				count={repositories.total_count}
				onPageChange={(details) => setPage(details.page)}
				my="10"
			>
				<ButtonGroup
					variant="ghost"
					size="sm"
					width="full"
					justifyContent="center"
				>
					<Pagination.PrevTrigger asChild>
						<Button variant="outline">
							<Icon as={RxChevronLeft} />
							Previous
						</Button>
					</Pagination.PrevTrigger>
					<Pagination.NextTrigger asChild>
						<Button variant="outline">
							Next
							<Icon as={RxChevronRight} />
						</Button>
					</Pagination.NextTrigger>
				</ButtonGroup>
			</Pagination.Root>
		</Box>
	);
}
