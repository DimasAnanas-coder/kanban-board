import { useState, useEffect, useCallback } from 'react';


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

    const dependeciesForCallback = [...dependencies, onSuccess, onError];

    const execute = useCallback(async (...apiArgs) => {
        setLoading(true);
        setError(null);
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
            throw error;
        } finally {
            setLoading(false);
        }
    }, dependeciesForCallback);

    useEffect(() => {
        if (immediate) {
            execute(...args);
        }
    }, dependeciesForCallback);

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