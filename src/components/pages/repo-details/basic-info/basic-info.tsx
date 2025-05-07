import { Button, Card, HStack, Icon, Text, useToggle } from "@chakra-ui/react";

import { Route } from "@/routes/$owner/$repo";
import { useParams } from "@tanstack/react-router";

import { ErrorCard } from "@/components/error-card";
import { SkeletonCard } from "@/components/skeleton-card";

import { useRepositoryDetails } from "@/api/repository";
import { RxStar } from "react-icons/rx";

const RepositoryBasicInfo = () => {
	const params = useParams({ from: Route.fullPath });
	const full_name = `${params.owner}/${params.repo}`;

	const starToggle = useToggle({ defaultPressed: false });

	const {
		repositoryDetails,
		repositoryDetailsIsLoading,
		repositoryDetailsError,
		repositoryDetailsRefetch,
	} = useRepositoryDetails({
		full_name,
	});

	const toggleStar = () => {
		starToggle.setPressed(!starToggle.pressed);
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
					<>
						<HStack justifyContent="space-between">
							<Text textStyle="2xl" fontWeight="bold">
								{repositoryDetails?.name}
							</Text>
							<Button variant="outline" size="sm" onClick={toggleStar}>
								<Icon
									as={RxStar}
									color={starToggle.pressed ? "yellow.solid" : "gray.400"}
								/>
								{repositoryDetails.stargazers_count}
							</Button>
						</HStack>
						<Text textStyle="sm" color="gray.500" mb="1">
							by {repositoryDetails?.owner.login}
						</Text>
						<Text textStyle="md" color="gray.500">
							{repositoryDetails?.description}
						</Text>
					</>
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
