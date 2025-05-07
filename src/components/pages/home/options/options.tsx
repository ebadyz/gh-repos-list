import { DEFAULT_SORT, SORT_OPTIONS } from "@/components/pages/home/options";
import { Route } from "@/routes/__root";
import { HStack, Input, Portal, Select } from "@chakra-ui/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";

const RepositoryOptions = () => {
	const search = useSearch({ from: Route.fullPath });
	const navigate = useNavigate({ from: Route.fullPath });

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newSearch = { ...search };
			if (e.target.value) {
				newSearch.q = e.target.value;
			} else {
				newSearch.q = undefined;
			}
			newSearch.page = undefined;
			navigate({ search: newSearch });
		},
		[navigate, search],
	);

	const handleSortChange = useCallback(
		(details: { value: string[] }) => {
			const sortValue = details.value[0];
			const newSearch = { ...search };
			if (sortValue === DEFAULT_SORT) {
				newSearch.sort = undefined;
			} else {
				newSearch.sort = sortValue;
			}
			newSearch.page = undefined;
			navigate({ search: newSearch });
		},
		[navigate, search],
	);

	const currentSortValue = search.sort || DEFAULT_SORT;

	return (
		<HStack as="form" gap={4} mb={4} bg="bg.secondary" py={4} rounded="lg">
			<Input
				name="search"
				type="search"
				placeholder="Find a repository…"
				aria-label="Find a repository"
				autoComplete="off"
				value={search.q || ""}
				onChange={handleSearch}
			/>

			<Select.Root
				collection={SORT_OPTIONS}
				width="1/2"
				multiple={false}
				value={[currentSortValue]}
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
