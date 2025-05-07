import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";
import type { SkeletonCardProps } from "./skeleton-card.types";

const SkeletonCard = ({ size }: SkeletonCardProps) => (
	<>
		{Array.from({ length: size }).map((_, index) => (
			<Card.Root as="li" key={`skeleton-${index + 1}`}>
				<Card.Header>
					<Skeleton height="32px" w="60%" mb={2} />
				</Card.Header>
				<Card.Body>
					<SkeletonText noOfLines={2} height="16px" />
				</Card.Body>
			</Card.Root>
		))}
	</>
);

export default SkeletonCard;
