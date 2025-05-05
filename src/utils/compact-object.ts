export const compactObject = <T extends Record<string, unknown>>(
	obj: T,
): Partial<T> => {
	const result: Partial<T> = {};
	for (const key in obj) {
		if (obj[key]) {
			result[key] = obj[key];
		}
	}
	return result;
};
