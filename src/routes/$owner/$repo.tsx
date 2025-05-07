import {
	RepositoryBasicInfo,
	RepositoryCommits,
	RepositoryLanguages,
	RepositoryReadme,
} from "@/components/pages";

import { GridItem, SimpleGrid } from "@chakra-ui/react";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$owner/$repo")({
	component: RepositoryDetail,
});

function RepositoryDetail() {
	return (
		<SimpleGrid columns={{ base: 1, md: 6 }} gap={{ base: 3, md: 6 }} p={4}>
			<GridItem colSpan={{ base: 1, md: 2 }} spaceY={3}>
				<RepositoryBasicInfo />
				<RepositoryLanguages />
				<RepositoryCommits />
			</GridItem>
			<GridItem colSpan={{ base: 1, md: 4 }}>
				<RepositoryReadme />
			</GridItem>
		</SimpleGrid>
	);
}
