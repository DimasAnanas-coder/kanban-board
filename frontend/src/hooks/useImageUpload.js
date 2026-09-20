import { useCallback, useRef } from 'react';
import { useImages } from './api';

export function useImageUpload(
    taskId,
    maxFilesCount = 3,
) {
    const {
        images,
        createImage,
        deleteImage,
        createLoading,
        deleteLoading,
        error,
    } = useImages(taskId);
    const inputRef = useRef(null);

    const handleClickForm = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    const handleUploadImage = useCallback(async(event) => {
        const files = Array.from(event.target.files ?? []);
        if (!files.length) {
            return;
        }

        const available = maxFilesCount - images.length;
        const toAdd = files.splice(0, available);
        await Promise.all(toAdd.map((file) => createImage(file)));

        event.target.value = '';
    }, [createImage, images.length, maxFilesCount]);

    const handleRemoveImage = useCallback(async(imageUrl) => {
        await deleteImage(imageUrl);
    }, [deleteImage]);

    return {
        images,
        inputRef,
        handleClickForm,
        handleUploadImage,
        handleRemoveImage,
        loading: createLoading || deleteLoading,
        error,
    };
}
