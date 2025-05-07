import { createListCollection } from "@chakra-ui/react";

export const DEFAULT_SORT = "updated";

export const SORT_OPTIONS = createListCollection({
	items: [
		{ label: "Updated", value: "updated" },
		{ label: "Stars", value: "stars" },
		{ label: "Forks", value: "forks" },
	],
});
