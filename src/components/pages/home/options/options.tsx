import {
	HStack,
	Input,
	Portal,
	Select,
	createListCollection,
} from "@chakra-ui/react";

const SORT_OPTIONS = createListCollection({
	items: [
		{ label: "Updated", value: "updated" },
		{ label: "Stars", value: "stars" },
		{ label: "Forks", value: "forks" },
	],
});

const RepositoryOptions = () => {
	return (
		<HStack as="form" gap={4} mb={4} bg="bg.secondary" py={4} rounded="lg">
			<Input
				name="search"
				type="search"
				placeholder="Find a repository…"
				aria-label="Find a repository"
				autoComplete="off"
			/>

			<Select.Root collection={SORT_OPTIONS} width="1/2" multiple={false}>
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
