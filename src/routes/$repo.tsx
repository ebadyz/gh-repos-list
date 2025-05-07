import {
	RepositoryBasicInfo,
	RepositoryCommits,
	RepositoryLanguages,
	RepositoryReadme,
} from "@/components/pages";

import { GridItem, SimpleGrid } from "@chakra-ui/react";

import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$repo")({
	component: RepositoryDetail,
});

function RepositoryDetail() {
	const params = useParams({ from: Route.fullPath });
	const repositoryName = decodeURIComponent(params.repo);

	return (
		<SimpleGrid columns={{ base: 1, md: 6 }} gap={{ base: 3, md: 6 }} p={4}>
			<GridItem colSpan={{ base: 1, md: 2 }} spaceY={3}>
				<RepositoryBasicInfo repositoryName={repositoryName} />
				<RepositoryLanguages repositoryName={repositoryName} />
				<RepositoryCommits repositoryName={repositoryName} />
			</GridItem>
			<GridItem colSpan={{ base: 1, md: 4 }}>
				<RepositoryReadme repositoryName={repositoryName} />
			</GridItem>
		</SimpleGrid>
	);
}
