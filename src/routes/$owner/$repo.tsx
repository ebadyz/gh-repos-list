import {
	RepositoryBasicInfo,
	RepositoryCommits,
	RepositoryLanguages,
} from "@/components/pages/repo-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$owner/$repo")({
	component: RepositoryDetail,
});

function RepositoryDetail() {
	// const params = useParams({ from: Route.fullPath });
	// const full_name = `${params.owner}/${params.repo}`;

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
			<RepositoryCommits />
		</>
	);
}
