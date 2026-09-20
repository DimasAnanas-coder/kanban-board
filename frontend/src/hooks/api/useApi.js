import { useState, useEffect, useCallback, useRef } from 'react';


export function useApi(
    apiFunction,
    options = {},
    ...args
) {
    const {
        immediate = true,
        dependencies = [],
        onSuccess = null,
        onError = null,
        initialData = null,
    } = options;
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiFunctionRef = useRef(apiFunction);
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);

    useEffect(() => {
        apiFunctionRef.current = apiFunction;
        onSuccessRef.current = onSuccess;
        onErrorRef.current = onError;
    }, [apiFunction, onSuccess, onError]);

    const execute = useCallback(async(...apiArgs) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunctionRef.current(...apiArgs);
            setData(result);
            if (onSuccessRef.current) {
                onSuccessRef.current(result);
            }
            return result;
        } catch (error) {
            setError(error);
            if (onErrorRef.current) {
                onErrorRef.current(error);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (immediate) {
            execute(...args);
        }
    }, [immediate, execute, ...dependencies, ...args]);

    return {
        data,
        setData,
        error,
        loading,
        execute,
        reset:() => {
            setData(null);
            setError(null);
            setLoading(false);
        },
    };
}
