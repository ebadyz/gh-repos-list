import type { CardRootProps, StackProps } from "@chakra-ui/react";

export type ErrorCardProps = {
	errorMessage: string;
	onRetry: () => void;
	cardProps?: CardRootProps;
} & StackProps;
