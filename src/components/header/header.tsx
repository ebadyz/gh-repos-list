import { HStack, Heading } from "@chakra-ui/react";

import { ColorModeButton } from "@/components/ui/color-mode";

const Header = () => {
	return (
		<HStack
			justifyContent="space-between"
			alignItems="center"
			px="4"
			py="2"
			shadow="md"
			bg="bg.secondary"
			mb="6"
		>
			<Heading as="h1" size="2xl">
				GitHub Repos
			</Heading>
			<ColorModeButton />
		</HStack>
	);
};

export default Header;
