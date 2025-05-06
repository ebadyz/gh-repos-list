import type { KeyFactory } from "@/types";
import type { RepositoryQueryKey } from "./repository.types";

const REPOSITORY_QUERY_KEYS: KeyFactory<RepositoryQueryKey> = {
	all: () => ["repository"],
	repositories: () => [...REPOSITORY_QUERY_KEYS.all(), "repositories"],
	getDetails: () => [...REPOSITORY_QUERY_KEYS.all(), "getDetails"],
	getCommits: () => [...REPOSITORY_QUERY_KEYS.all(), "getCommits"],
	getLanguages: () => [...REPOSITORY_QUERY_KEYS.all(), "getLanguages"],
	getReadme: () => [...REPOSITORY_QUERY_KEYS.all(), "getReadme"],
};

export default REPOSITORY_QUERY_KEYS;
