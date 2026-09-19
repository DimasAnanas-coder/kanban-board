import { useState } from 'react';

export function useImages(taskId) {
    const [images, setImages] = useState({});
    const setTaskImages = (callback) => setImages((prevImages) => {
        const newImages = callback(prevImages[taskId] ?? []);
        return {...prevImages, [taskId]: newImages};
    });

    const taskImages = images[taskId] ?? [];
    
    return [taskImages, setTaskImages];
}