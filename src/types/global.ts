import type { QueryKey } from "@tanstack/react-query";

export type KeyFactory<TKey extends string> = {
	[k in TKey]: (...args: unknown[]) => QueryKey;
} & {
	all: () => QueryKey;
};
