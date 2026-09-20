import ImageService from '../../api/services/ImageService';
import { useApi } from './useApi';

const imageService = new ImageService();

export function useImages(taskId) {
    const {
        data: images,
        setData: setImages,
        loading: imagesLoading,
        error: imagesError,
        execute: fetchImages,
    } = useApi(
        () => imageService.getAll(taskId),
        {
            immediate: Boolean(taskId),
            dependencies: [taskId],
            initialData: [],
        },
    );

    const {
        execute: createImageRequest,
        loading: createLoading,
        error: createError,
    } = useApi(
        (file) => imageService.create(taskId, file),
        { immediate: false },
    );

    const {
        execute: deleteImageRequest,
        loading: deleteLoading,
        error: deleteError,
    } = useApi(
        (imageId) => imageService.delete(taskId, imageId),
        { immediate: false },
    );

    const createImage = async(file) => {
        const createdImage = await createImageRequest(file);
        setImages(prevImages => [...prevImages, createdImage]);
        return createdImage;
    };

    const deleteImage = async(image) => {
        await deleteImageRequest(image.id);
        setImages(prevImages => prevImages.filter(prevImage => prevImage.id !== image.id));
    };

    return {
        images,
        loading: imagesLoading,
        error: imagesError,
        createImage,
        deleteImage,
        createLoading,
        deleteLoading,
        createError,
        deleteError,
        fetchImages,
        setImages,
    };
}
