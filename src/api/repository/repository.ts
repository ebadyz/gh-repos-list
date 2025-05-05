import request from "@/service/request";
import type {
	ReadmeResponse,
	Repository,
	RepositoryCommitResponse,
	RepositoryLanguagesResponse,
	RepositoryListParams,
	RepositoryListResponse,
	RepositoryParams,
} from "./repository.types";

const getRepositoryList = (params: RepositoryListParams) =>
	request.get<RepositoryListResponse>("search/repositories", {
		params,
	});

const getRepository = (params: RepositoryParams) =>
	request.get<Repository>(`/repos/${params.full_name}`);

const getRepositoryLanguages = (params: RepositoryParams) =>
	request.get<RepositoryLanguagesResponse>(
		`/repos/${params.full_name}/languages`,
	);

const getRepositoryCommits = (
	params: RepositoryParams & { per_page: number },
) =>
	request.get<RepositoryCommitResponse>(`/repos/${params.full_name}/commits`, {
		params: {
			per_page: params.per_page,
		},
	});

const getRepositoryReadme = (params: RepositoryParams) =>
	request.get<ReadmeResponse>(`/repos/${params.full_name}/readme`);

export {
	getRepository,
	getRepositoryList,
	getRepositoryLanguages,
	getRepositoryCommits,
	getRepositoryReadme,
};
