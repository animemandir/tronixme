import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function useRefCallback<T>(callback: (el: T) => void, cleanup: () => void = () => {}) {
    const ref = useRef<T | null>(null);

    const refCallback = useCallback(node => {
        if (ref.current) cleanup();
        if (node) callback(node as any as T);

        ref.current = node;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [refCallback, ref] as [typeof refCallback, typeof ref];
}
