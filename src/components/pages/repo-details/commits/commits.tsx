import { Avatar, Box, Card, HStack, Stack, Text } from "@chakra-ui/react";

import { ErrorCard } from "@/components/error-card";
import { SkeletonCard } from "@/components/skeleton-card";

import { useRepositoryCommits } from "@/api/repository";
import type { RepositoryParams } from "@/api/repository";

const DETAULT_RECENT_COMMITS_COUNT = 5;

type RepositoryCommitsProps = {
	repositoryName: RepositoryParams["repositoryName"];
};

const RepositoryCommits = ({ repositoryName }: RepositoryCommitsProps) => {
	const {
		repositoryCommits,
		repositoryCommitsIsLoading,
		repositoryCommitsError,
		repositoryCommitsRefetch,
	} = useRepositoryCommits({
		repositoryName,
		per_page: DETAULT_RECENT_COMMITS_COUNT,
	});

	if (repositoryCommitsIsLoading) {
		return <SkeletonCard size={1} />;
	}

	if (repositoryCommitsError) {
		const retryRepositoryCommits = () => {
			repositoryCommitsRefetch();
		};
		return (
			<ErrorCard
				errorMessage={repositoryCommitsError.message}
				onRetry={retryRepositoryCommits}
				cardProps={{ w: "full" }}
			/>
		);
	}

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<Card.Root>
			<Card.Header>
				<Card.Title>Recent Commits</Card.Title>
			</Card.Header>
			<Card.Body overflow="auto" flexGrow={1}>
				{repositoryCommits?.length === 0 ? (
					<Text textStyle="sm" color="gray.500">
						No commits found
					</Text>
				) : (
					<Stack spaceY={4}>
						{repositoryCommits?.map((commit) => (
							<HStack key={commit.sha} align="start">
								<Avatar.Root>
									<Avatar.Image src={commit.author?.avatar_url} />
									<Avatar.Fallback>{commit.author?.login}</Avatar.Fallback>
								</Avatar.Root>
								<Box flex={1}>
									<Text fontWeight="medium">{commit.commit.message}</Text>
									<HStack fontSize="sm" color="gray.500">
										<Text>{commit.author?.login} committed on</Text>
										<Text>{formatDate(commit.commit.author.date)}</Text>
									</HStack>
								</Box>
							</HStack>
						))}
					</Stack>
				)}
			</Card.Body>
		</Card.Root>
	);
};

export { RepositoryCommits };
