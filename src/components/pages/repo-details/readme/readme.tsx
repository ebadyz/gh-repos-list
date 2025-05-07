import { Box, Card } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { useRepositoryReadme } from "@/api/repository";

import { ErrorCard } from "@/components/error-card";
import { SkeletonCard } from "@/components/skeleton-card";

import { Route } from "@/routes/$owner/$repo";
import { useParams } from "@tanstack/react-router";

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
		return <SkeletonCard size={1} />;
	}

	if (repositoryReadmeError) {
		const retryRepositoryReadme = () => {
			repositoryReadmeRefetch();
		};
		return (
			<ErrorCard
				errorMessage={repositoryReadmeError.message}
				onRetry={retryRepositoryReadme}
				justifyContent="center"
				cardProps={{
					w: "full",
				}}
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
						remarkPlugins={[remarkGfm, remarkBreaks]}
						rehypePlugins={[rehypeRaw, rehypeHighlight]}
					>
						{atob(repositoryReadme?.content ?? "")}
					</ReactMarkdown>
				</Box>
			</Card.Body>
		</Card.Root>
	);
};

export { RepositoryReadme };
