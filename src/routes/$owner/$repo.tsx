import { useRepositoryCommits, useRepositoryReadme } from "@/api/repository";
import {
	RepositoryBasicInfo,
	RepositoryLanguages,
} from "@/components/pages/repo-details";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$owner/$repo")({
	component: RepositoryDetail,
});

const DETAULT_RECENT_COMMITS_COUNT = 10;

function RepositoryDetail() {
	const params = useParams({ from: Route.fullPath });
	const full_name = `${params.owner}/${params.repo}`;

	// const {
	// 	repositoryCommits,
	// 	repositoryCommitsIsLoading,
	// 	repositoryCommitsError,
	// } = useRepositoryCommits({
	// 	full_name,
	// 	per_page: 10,
	// });

	// const { repositoryReadme, repositoryReadmeIsLoading, repositoryReadmeError } =
	// 	useRepositoryReadme({
	// 		full_name,
	// 	});

	return (
		<>
			<RepositoryBasicInfo />
			<RepositoryLanguages />
		</>
	);
}
