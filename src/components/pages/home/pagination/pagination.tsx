import {
	Button,
	ButtonGroup,
	Pagination as ChakraPagination,
	Icon,
	type PaginationRootProps,
} from "@chakra-ui/react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

const Pagination = (props: PaginationRootProps) => {
	return (
		<ChakraPagination.Root as="footer" my="10" {...props}>
			<ButtonGroup
				variant="ghost"
				size="sm"
				width="full"
				justifyContent="center"
			>
				<ChakraPagination.PrevTrigger asChild>
					<Button variant="outline">
						<Icon as={RxChevronLeft} />
						Previous
					</Button>
				</ChakraPagination.PrevTrigger>
				<ChakraPagination.NextTrigger asChild>
					<Button variant="outline">
						Next
						<Icon as={RxChevronRight} />
					</Button>
				</ChakraPagination.NextTrigger>
			</ButtonGroup>
		</ChakraPagination.Root>
	);
};

export { Pagination };
