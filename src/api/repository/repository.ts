import request from "@/service/request";
import type { Repository, RepositoryListResponse } from "./repository.types";

const getRepositoryList = () =>
	request.get<RepositoryListResponse>("/repositories");

const getRepository = (params: Pick<Repository, "full_name">) =>
	request.get<Repository>(`/repos/${params.full_name}`);

export { getRepository, getRepositoryList };
