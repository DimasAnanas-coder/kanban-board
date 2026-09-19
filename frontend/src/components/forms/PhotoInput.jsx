import ImagePreview from "../ImagePreview";
import { useImageUpload } from "../../hooks"


export default function PhotoInput({
    taskId,
    maxImagesCount = 3
}) {
    const {
        images,
        inputRef,
        handleClickForm,
        handleUploadImage,
        handleRemoveImage,
        // handleClearImages,
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

            <div className={`grid gap-2 mt-2 mb-2 grid-cols-${maxImagesCount}`}>
                {images.length > 0 && images.map((img) => (
                    <ImagePreview
                        key={img.id} 
                        img={img}
                        onRemove={handleRemoveImage}
                    />
                ))}
                { images.length < maxImagesCount && (
                    <button
                        className="aspect-square bg-thirdary rounded-xl border-2 border-dashed border-accent px-2 w-full h-full"
                        onClick={handleClickForm}
                        title="Добавьте изображение к задаче"
                    > + </button>
                )}
            </div>
        </div>
    );
}
