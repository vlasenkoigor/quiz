import {mapError} from "./firebase-error-mapping.ts";

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const shuffleArray = <T>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

export const catchAsync = async <T>(fn: () => Promise<T>, onError: (e: any) => void) => {
    try {
        return await fn();
    } catch (e) {
        onError(mapError(e));
    }
}

export function mutateAction<F extends (...args: any[]) => Promise<any>, R extends Awaited<ReturnType<F>>>(fn: F, setError: (error: string | null) => void, setMutating: (mutating: boolean) => void) {
    return async (...a: Parameters<F>) => {
        setMutating(true);
        setError(null);
        const result = await catchAsync(() => fn(...a), setError);
        setMutating(false);
        return result as R;
    }
}