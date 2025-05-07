import { HStack, Heading } from "@chakra-ui/react";

import { Link } from "@tanstack/react-router";

import { ColorModeButton } from "@/components/ui/color-mode";

const DEFAULT_SEARCH_PARAMS = {
	page: undefined,
	q: undefined,
	sort: undefined,
};

const Header = () => {
	return (
		<HStack
			justifyContent="space-between"
			alignItems="center"
			px="4"
			py="2"
			shadow="md"
			bg="bg.secondary"
			mb="4"
		>
			<Heading as="h1" size="2xl">
				<Link to="/" search={DEFAULT_SEARCH_PARAMS}>
					GitHub Repos
				</Link>
			</Heading>
			<ColorModeButton />
		</HStack>
	);
};

export { Header };
