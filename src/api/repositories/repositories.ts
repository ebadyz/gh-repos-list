import request from "@/service/request";
import type { RepositoryListResponse } from "./repositories.types";

const getRepositoryList = () =>
	request.get<RepositoryListResponse>("/repositories");

export { getRepositoryList };
