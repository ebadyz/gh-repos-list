import { useCallback, useState } from "react";
import type { UseBooleanReturn } from "./use-boolean.types";

const useBoolean = (initialValue = false): UseBooleanReturn => {
	const [value, setValue] = useState(initialValue);

	const setTrue = useCallback(() => setValue(true), []);
	const setFalse = useCallback(() => setValue(false), []);
	const toggle = useCallback(() => setValue((value) => !value), []);

	return { value, setTrue, setFalse, toggle, setValue };
};

export default useBoolean;
