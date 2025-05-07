import { useCallback } from "react";

import {
	Button,
	ButtonGroup,
	Pagination as ChakraPagination,
	Icon,
} from "@chakra-ui/react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

import { Route } from "@/routes/__root";
import { useNavigate, useSearch } from "@tanstack/react-router";

import type { PaginationProps } from "./pagination.types";

const Pagination = ({
	pageSize = 10,
	onPageChange,
	...props
}: PaginationProps) => {
	const search = useSearch({ from: Route.fullPath });
	const navigate = useNavigate({ from: Route.fullPath });

	const handlePageChange = useCallback(
		(details: { page: number }) => {
			if (onPageChange) {
				onPageChange(details);
			} else {
				const newSearch = { ...search };
				if (details.page === 1) {
					newSearch.page = undefined;
				} else {
					newSearch.page = details.page;
				}
				navigate({ search: newSearch });
			}
		},
		[navigate, onPageChange, search],
	);

	return (
		<ChakraPagination.Root
			as="footer"
			my="10"
			pageSize={pageSize}
			onPageChange={handlePageChange}
			{...props}
		>
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
				<ChakraPagination.PageText />
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
