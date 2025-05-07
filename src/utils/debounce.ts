/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export const debounce = <T extends unknown[], R>(
	func: (...args: T) => R,
	wait: number,
): ((...args: T) => void) => {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: T) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			func(...args);
			timeoutId = null;
		}, wait);
	};
};
