import request from "@/service/request";
import type {
	Repository,
	RepositoryListParams,
	RepositoryListResponse,
	RepositoryParams,
} from "./repository.types";

const getRepositoryList = (params: RepositoryListParams) =>
	request.get<RepositoryListResponse>("search/repositories", {
		params,
		headers: {
			Accept: "application/vnd.github.v3+json",
		},
	});

const getRepository = (params: RepositoryParams) =>
	request.get<Repository>(`/repos/${params.full_name}`);

export { getRepository, getRepositoryList };
