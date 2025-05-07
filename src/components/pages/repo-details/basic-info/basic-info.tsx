import { useState } from "react";

import {
	Box,
	Button,
	Card,
	HStack,
	Icon,
	Link,
	Text,
	useToggle,
} from "@chakra-ui/react";
import { RxStar } from "react-icons/rx";

import { ErrorCard } from "@/components/error-card";
import { SkeletonCard } from "@/components/skeleton-card";

import { type RepositoryParams, useRepositoryDetails } from "@/api/repository";

type RepositoryBasicInfoProps = {
	repositoryName: RepositoryParams["repositoryName"];
};

const RepositoryBasicInfo = ({ repositoryName }: RepositoryBasicInfoProps) => {
	const starToggle = useToggle({ defaultPressed: false });

	const {
		repositoryDetails,
		repositoryDetailsIsLoading,
		repositoryDetailsError,
		repositoryDetailsRefetch,
	} = useRepositoryDetails({
		repositoryName,
	});

	const [starCount, setStarCount] = useState(
		repositoryDetails?.stargazers_count ?? 0,
	);

	const toggleStar = () => {
		const nextStarCount = starToggle.pressed ? starCount - 1 : starCount + 1;

		setTimeout(() => {
			starToggle.setPressed(!starToggle.pressed);
			setStarCount(nextStarCount);
		}, 1000);
	};

	if (repositoryDetailsIsLoading) {
		return <SkeletonCard size={1} />;
	}

	if (repositoryDetailsError) {
		const retryRepositoryDetails = () => {
			repositoryDetailsRefetch();
		};
		return (
			<ErrorCard
				errorMessage={repositoryDetailsError.message}
				onRetry={retryRepositoryDetails}
				cardProps={{ w: "full" }}
			/>
		);
	}

	return (
		<Card.Root>
			<Card.Body>
				{repositoryDetails ? (
					<Box spaceY={4}>
						<Text textStyle="2xl" fontWeight="bold">
							{repositoryDetails?.name}
						</Text>
						<Text textStyle="sm" color="gray.500" mb="1">
							by {repositoryDetails?.owner.login}
						</Text>
						<Text textStyle="md" color="gray.500">
							{repositoryDetails?.description || "No description provided"}
						</Text>
						<HStack justifyContent="space-between">
							<Button variant="outline" size="sm" asChild>
								<Link href={repositoryDetails?.html_url} target="_blank">
									Open in GitHub
								</Link>
							</Button>
							<Button variant="outline" size="sm" onClick={toggleStar}>
								<Icon
									as={RxStar}
									color={starToggle.pressed ? "yellow.solid" : "gray.400"}
								/>
								{starCount}
							</Button>
						</HStack>
					</Box>
				) : (
					<Text textStyle="2xl" fontWeight="bold">
						No repository details found
					</Text>
				)}
			</Card.Body>
		</Card.Root>
	);
};

export { RepositoryBasicInfo };
