/**
 * Filters an object to include only properties with truthy values.
 *
 * @template T - The type of the input object
 * @param {T} obj - The object to filter
 * @returns {Partial<T>} A new object containing only the properties with truthy values
 *
 * @example
 * // Returns { name: "John", age: 30 }
 * withTruthyValues({ name: "John", age: 30, email: "", isAdmin: false });
 */
export const withTruthyValues = <T extends Record<string, unknown>>(
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
