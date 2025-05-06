import { Button, Card, Text, VStack } from "@chakra-ui/react";
import type { ErrorCardProps } from "./error-card.types";

const ErrorCard = ({
	errorMessage,
	onRetry,
	cardProps,
	...containerProps
}: ErrorCardProps) => {
	return (
		<VStack {...containerProps}>
			<Card.Root
				p={4}
				rounded="lg"
				w={{ base: "full", md: "1/3" }}
				{...cardProps}
			>
				<Card.Body spaceY={4}>
					<Text textStyle="2xl" color="colorPalette.error">
						{errorMessage}
					</Text>
					<Button variant="outline" onClick={onRetry}>
						Try again
					</Button>
				</Card.Body>
			</Card.Root>
		</VStack>
	);
};

export default ErrorCard;
