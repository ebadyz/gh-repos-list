import {
	Box,
	Card,
	Flex,
	HStack,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";

import { ErrorCard } from "@/components/error-card";
import { SkeletonCard } from "@/components/skeleton-card";

import { Route } from "@/routes/$owner/$repo";

import { useParams } from "@tanstack/react-router";

import { useRepositoryLanguages } from "@/api/repository";

const languageColors = [
	"blue",
	"green",
	"teal",
	"purple",
	"cyan",
	"pink",
	"orange",
	"red",
	"yellow",
];

const RepositoryLanguages = () => {
	const params = useParams({ from: Route.fullPath });
	const full_name = `${params.owner}/${params.repo}`;

	const {
		repositoryLanguages,
		repositoryLanguagesIsLoading,
		repositoryLanguagesError,
		repositoryLanguagesRefetch,
	} = useRepositoryLanguages({
		full_name,
	});

	if (repositoryLanguagesIsLoading) {
		return <SkeletonCard size={1} />;
	}

	if (repositoryLanguagesError) {
		const retryRepositoryLanguages = () => {
			repositoryLanguagesRefetch();
		};
		return (
			<ErrorCard
				errorMessage={repositoryLanguagesError.message}
				onRetry={retryRepositoryLanguages}
				cardProps={{ w: "full" }}
			/>
		);
	}

	const totalBytes = Object.values(repositoryLanguages || {}).reduce(
		(a, b) => a + b,
		0,
	);

	const sortedLanguages = Object.entries(repositoryLanguages || {})
		.sort(([, a], [, b]) => b - a)
		.map(([language, bytes], index) => ({
			language,
			bytes,
			percentage: (bytes / totalBytes) * 100,
			color: languageColors[index % languageColors.length],
		}));

	return (
		<Card.Root>
			<Card.Header>
				<Card.Title>Languages</Card.Title>
			</Card.Header>
			<Card.Body>
				{sortedLanguages.length === 0 ? (
					<Text textStyle="sm" color="gray.500">
						No languages found
					</Text>
				) : (
					<Stack spaceY={4}>
						<Box position="relative" h="2" overflow="hidden" borderRadius="md">
							<Flex w="full">
								{sortedLanguages.map((item) => (
									<Box
										key={item.language}
										bg={`${item.color}.500`}
										w={`${item.percentage}%`}
										h="2"
									/>
								))}
							</Flex>
						</Box>

						<SimpleGrid columns={{ base: 1, md: 2 }} columnGap={8} rowGap={2}>
							{sortedLanguages.map((item) => (
								<HStack key={item.language} justify="space-between">
									<HStack>
										<Box
											bg={`${item.color}.500`}
											w="3"
											h="3"
											borderRadius="full"
										/>
										<Text textStyle="sm" fontWeight="medium">
											{item.language}
										</Text>
									</HStack>
									<HStack>
										<Text textStyle="sm" fontWeight="medium">
											{item.percentage.toFixed(1)}%
										</Text>
									</HStack>
								</HStack>
							))}
						</SimpleGrid>
					</Stack>
				)}
			</Card.Body>
		</Card.Root>
	);
};

export { RepositoryLanguages };
