import { debounce, DebounceSettings } from "lodash";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

export function useDebouncedState<S>(
  initialState: S | (() => S),
  delay?: number,
  options?: DebounceSettings
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(initialState);
  const debouncer = useMemo(() => debounce(setValue, delay, options), [delay, options]);
  const setDebouncedValue = useRef(debouncer).current;
  useEffect(() => {
    return setDebouncedValue.cancel();
  }, [setDebouncedValue]);
  return [value, setDebouncedValue];
}
