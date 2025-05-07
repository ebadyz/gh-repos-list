import { useQuery } from "@tanstack/react-query";

import {
	getRepositoryCommits,
	getRepositoryDetails,
	getRepositoryLanguages,
	getRepositoryList,
	getRepositoryReadme,
} from "./repository.api";
import REPOSITORY_QUERY_KEYS from "./repository.keys";
import type {
	RepositoryCommitsParams,
	RepositoryListParams,
	RepositoryParams,
} from "./repository.types";

const useRepositoryList = (params: RepositoryListParams) => {
	const queryResult = useQuery({
		queryKey: [...REPOSITORY_QUERY_KEYS.repositories(), params],
		queryFn: () => getRepositoryList(params),
		select: (response) => response.data,
	});

	return {
		repositoryList: queryResult.data,
		repositoryListIsLoading: queryResult.isLoading,
		repositoryListError: queryResult.error,
		repositoryListRefetch: queryResult.refetch,
	};
};

const useRepositoryDetails = (params: RepositoryParams) => {
	const queryResult = useQuery({
		queryKey: [...REPOSITORY_QUERY_KEYS.getDetails(), params],
		queryFn: () => getRepositoryDetails(params),
		select: (response) => response.data,
	});

	return {
		repositoryDetails: queryResult.data,
		repositoryDetailsIsLoading: queryResult.isLoading,
		repositoryDetailsError: queryResult.error,
		repositoryDetailsRefetch: queryResult.refetch,
	};
};

const useRepositoryCommits = (params: RepositoryCommitsParams) => {
	const queryResult = useQuery({
		queryKey: [...REPOSITORY_QUERY_KEYS.getCommits(), params],
		queryFn: () => getRepositoryCommits(params),
		select: (response) => response.data,
	});

	return {
		repositoryCommits: queryResult.data,
		repositoryCommitsIsLoading: queryResult.isLoading,
		repositoryCommitsError: queryResult.error,
		repositoryCommitsRefetch: queryResult.refetch,
	};
};

const useRepositoryLanguages = (params: RepositoryParams) => {
	const queryResult = useQuery({
		queryKey: [...REPOSITORY_QUERY_KEYS.getLanguages(), params],
		queryFn: () => getRepositoryLanguages(params),
		select: (response) => response.data,
	});

	return {
		repositoryLanguages: queryResult.data,
		repositoryLanguagesIsLoading: queryResult.isLoading,
		repositoryLanguagesError: queryResult.error,
		repositoryLanguagesRefetch: queryResult.refetch,
	};
};

const useRepositoryReadme = (params: RepositoryParams) => {
	const queryResult = useQuery({
		queryKey: [...REPOSITORY_QUERY_KEYS.getReadme(), params],
		queryFn: () => getRepositoryReadme(params),
		select: (response) => response.data,
	});

	return {
		repositoryReadme: queryResult.data,
		repositoryReadmeIsLoading: queryResult.isLoading,
		repositoryReadmeError: queryResult.error,
		repositoryReadmeRefetch: queryResult.refetch,
	};
};

export {
	useRepositoryList,
	useRepositoryDetails,
	useRepositoryCommits,
	useRepositoryLanguages,
	useRepositoryReadme,
};
