import type { PaginationRootProps } from "@chakra-ui/react";

export type PaginationProps = Omit<PaginationRootProps, "onPageChange"> & {
	onPageChange?: (details: { page: number }) => void;
	pageSize?: number;
};
