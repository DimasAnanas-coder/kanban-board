import ImageService from '../../api/services/ImageServise';
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
        (imageUrl) => imageService.delete(taskId, imageUrl),
        { immediate: false },
    );

    const createImage = async(file) => {
        const createdImage = await createImageRequest(file);
        setImages(prevImages => [...prevImages, createdImage.url]);
        return createdImage;
    };

    const deleteImage = async(imageUrl) => {
        await deleteImageRequest(imageUrl);
        setImages(prevImages => prevImages.filter(image => image !== imageUrl));
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
