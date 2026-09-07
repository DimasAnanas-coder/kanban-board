import { useState, useEffect, useCallback } from 'react';


export function useApi(
    apiFunction,
    options = {
        immediate: true,
        dependencies: [],
        onSuccess: null,
        onError: null,
    },
    ...args
) {
    const { immediate, dependencies, onSuccess, onError } = options;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const execute = useCallback(async (...apiArgs) => {
        setLoading(true);
        try {
            const result = await apiFunction(...apiArgs);
            setData(result);
            if (onSuccess) {
                onSuccess(result);
            }
            return result;
        } catch (error) {
            setError(error);
            if (onError) {
                onError(error);
            }
        } finally {
            setLoading(false);
        }
    });

    useEffect(() => {
        if (immediate) {
            execute(...args);
        }
    }, dependencies);

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
        }
    };
}