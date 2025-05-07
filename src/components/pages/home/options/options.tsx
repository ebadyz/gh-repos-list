import { useCallback, useMemo, useState } from "react";

import { HStack, Input, Portal, Select } from "@chakra-ui/react";

import { Route } from "@/routes/__root";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { DEFAULT_SORT, SORT_OPTIONS } from "@/components/pages/home/options";

import { debounce } from "@/utils/debounce";

const RepositoryOptions = () => {
	const search = useSearch({ from: Route.fullPath });
	const navigate = useNavigate({ from: Route.fullPath });
	const [searchValue, setSearchValue] = useState(search.q ?? "");

	const updateSearchParams = useCallback(
		(updates: Partial<typeof search>) => {
			navigate({
				search: {
					...search,
					...updates,
					page: undefined,
				},
			});
		},
		[navigate, search],
	);

	const debouncedSearch = useMemo(
		() =>
			debounce((query: string) => {
				updateSearchParams({ q: query || undefined });
			}, 500),
		[updateSearchParams],
	);

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setSearchValue(value);
			debouncedSearch(value);
		},
		[debouncedSearch],
	);

	const handleSortChange = useCallback(
		(details: { value: string[] }) => {
			const sortValue = details.value[0];
			updateSearchParams({
				sort: sortValue === DEFAULT_SORT ? undefined : sortValue,
			});
		},
		[updateSearchParams],
	);

	return (
		<HStack gap={4} mb={4} bg="bg.secondary" py={4} rounded="lg">
			<Input
				name="search"
				type="search"
				placeholder="Find a repository…"
				aria-label="Find a repository"
				autoComplete="off"
				value={searchValue}
				onChange={handleSearch}
			/>

			<Select.Root
				collection={SORT_OPTIONS}
				width="1/2"
				multiple={false}
				value={[search.sort || DEFAULT_SORT]}
				onValueChange={handleSortChange}
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
		</HStack>
	);
};

export { RepositoryOptions };
