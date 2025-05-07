import request from "@/service/request";
import type {
	ReadmeResponse,
	Repository,
	RepositoryCommitResponse,
	RepositoryCommitsParams,
	RepositoryLanguagesResponse,
	RepositoryListParams,
	RepositoryListResponse,
	RepositoryParams,
} from "./repository.types";

const getRepositoryList = (params: RepositoryListParams) =>
	request.get<RepositoryListResponse>("search/repositories", {
		params,
	});

const getRepositoryDetails = (params: RepositoryParams) =>
	request.get<Repository>(`/repos/${params.repositoryName}`);

const getRepositoryLanguages = (params: RepositoryParams) =>
	request.get<RepositoryLanguagesResponse>(
		`/repos/${params.repositoryName}/languages`,
	);

const getRepositoryCommits = (params: RepositoryCommitsParams) =>
	request.get<RepositoryCommitResponse>(
		`/repos/${params.repositoryName}/commits`,
		{
			params: {
				per_page: params.per_page,
			},
		},
	);

const getRepositoryReadme = (params: RepositoryParams) =>
	request.get<ReadmeResponse>(`/repos/${params.repositoryName}/readme`);

export {
	getRepositoryDetails,
	getRepositoryList,
	getRepositoryLanguages,
	getRepositoryCommits,
	getRepositoryReadme,
};
