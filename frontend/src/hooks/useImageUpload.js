import { useCallback, useRef, useState } from 'react';
import { useImages } from './api';

export function useImageUpload(
    taskId,
    maxFilesCount = 3
) {
    const [images, setImages] = useImages(taskId);
    const inputRef = useRef(null);

    const handleClickForm = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef])

    const handleUploadImage = useCallback((event) => {
        const files = Array.from(event.target.files ?? []);
        if (!files.length) return;

        setImages((prevImages) => {
            const available = maxFilesCount - prevImages.length;
            const toAdd = files.splice(0, available).map((file) => ({
                file,
                id: `${file.name}-${file.lastModified}-${Math.random()}`,
                previewUrl: URL.createObjectURL(file),
            }));

            return [...prevImages, ...toAdd];
        })

        event.target.value = '';
    }, [maxFilesCount]); 

    const handleRemoveImage = useCallback((id) => {
        setImages((prevImages) => {
            const targetImage = prevImages.find((file) => file.id === id);
            URL.revokeObjectURL(targetImage.previewUrl);
            return prevImages.filter((file) => file.id !== id);
        });
    }, [])

    const handleClearImages = useCallback(() => {
        setImages((prevImages) => {
            prevImages.forEach((file) => {
                URL.revokeObjectURL(file.previewUrl);
            });
            return [];
        });
    }, [])


    return {
        images,
        inputRef,
        handleClickForm,
        handleUploadImage,
        handleRemoveImage,
        handleClearImages,
    }
}
