import { useRepositoryDetails } from "@/api/repository";
import CardSkeleton from "@/components/card-skeleton";
import ErrorCard from "@/components/error-card";
import { Route } from "@/routes/$owner/$repo";
import { Box, Card, Text } from "@chakra-ui/react";
import { useParams } from "@tanstack/react-router";

const RepositoryBasicInfo = () => {
	const params = useParams({ from: Route.fullPath });
	const full_name = `${params.owner}/${params.repo}`;

	const {
		repositoryDetails,
		repositoryDetailsIsLoading,
		repositoryDetailsError,
		repositoryDetailsRefetch,
	} = useRepositoryDetails({
		full_name,
	});

	if (repositoryDetailsIsLoading) {
		return <CardSkeleton size={1} />;
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
				<Text textStyle="2xl" fontWeight="bold">
					{repositoryDetails?.name}
				</Text>
				<Text textStyle="sm" color="colorPalette.700" mb="1">
					by {repositoryDetails?.owner.login}
				</Text>
				<Text textStyle="md" color="colorPalette.600">
					{repositoryDetails?.description}
				</Text>
			</Card.Body>
		</Card.Root>
	);
};

export default RepositoryBasicInfo;
