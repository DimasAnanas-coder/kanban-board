import ImagePreview from '../ImagePreview';
import { useImageUpload } from '../../hooks';

function getGridClassName(maxImagesCount) {
    const gridClass = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
    }
    
    return gridClass[maxImagesCount] ?? "grid-cols-3";
}

export default function PhotoInput({
    taskId,
    maxImagesCount = 3,
}) {
    const {
        images,
        inputRef,
        handleClickForm,
        handleUploadImage,
        handleRemoveImage,
        loading,
    } = useImageUpload(taskId, maxImagesCount);

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleUploadImage}
                style={{ display: 'none' }}
            />

            <div className={`grid gap-2 mt-2 mb-2 ${getGridClassName(maxImagesCount)}`}>
                {images.length > 0 && images.map((img) => (
                    <ImagePreview
                        key={img.id}
                        imageUrl={img}
                        onRemove={handleRemoveImage}
                    />
                ))}
                { images.length < maxImagesCount && (
                    <button
                        className="aspect-square bg-thirdary hover:bg-thirdary/80 rounded-xl border-2 border-dashed border-accent px-2 w-full h-full"
                        onClick={handleClickForm}
                        disabled={loading}
                        title="Добавьте изображение к задаче"
                    > + </button>
                )}
            </div>
        </div>
    );
}
