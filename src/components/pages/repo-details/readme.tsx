import { useRepositoryReadme } from "@/api/repository";
import ErrorCard from "@/components/error-card";
import CardSkeleton from "@/components/skeleton-card";
import { Route } from "@/routes/$owner/$repo";
import { Box, Card } from "@chakra-ui/react";
import { useParams } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";

const RepositoryReadme = () => {
	const params = useParams({ from: Route.fullPath });
	const full_name = `${params.owner}/${params.repo}`;

	const {
		repositoryReadme,
		repositoryReadmeIsLoading,
		repositoryReadmeError,
		repositoryReadmeRefetch,
	} = useRepositoryReadme({
		full_name,
	});

	if (repositoryReadmeIsLoading) {
		return <CardSkeleton size={1} />;
	}

	if (repositoryReadmeError) {
		const retryRepositoryReadme = () => {
			repositoryReadmeRefetch();
		};
		return (
			<ErrorCard
				errorMessage={repositoryReadmeError.message}
				onRetry={retryRepositoryReadme}
				cardProps={{ w: "full" }}
			/>
		);
	}

	return (
		<Card.Root h="full" display="flex" flexDirection="column">
			<Card.Header>
				<Card.Title>README</Card.Title>
			</Card.Header>
			<Card.Body overflow="auto" flexGrow={1}>
				<Box className="markdown-content">
					<ReactMarkdown
						components={{
							code: ({ className, children, ...props }) => {
								return (
									<code className={className} {...props}>
										{children}
									</code>
								);
							},
						}}
					>
						{atob(repositoryReadme?.content ?? "")}
					</ReactMarkdown>
				</Box>
			</Card.Body>
		</Card.Root>
	);
};

export default RepositoryReadme;
