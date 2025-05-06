import {
	RepositoryBasicInfo,
	RepositoryCommits,
	RepositoryLanguages,
	RepositoryReadme,
} from "@/components/pages/repo-details";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$owner/$repo")({
	component: RepositoryDetail,
});

function RepositoryDetail() {
	return (
		<>
			<RepositoryBasicInfo />
			<RepositoryLanguages />
			<RepositoryCommits />
			<RepositoryReadme />
		</>
	);
}
