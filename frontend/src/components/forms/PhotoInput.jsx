import { useImageUpload } from "../../hooks"
import Button from "../Button";

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
                    <div key={img.id} className="relative aspect-square">
                        <a
                            href={img.previewUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <img
                                src={img.previewUrl}
                                alt={img.file.name}
                                className="object-cover rounded w-full h-full"
                            />
                        </a>
                        
                        <Button
                            onClick={() => handleRemoveImage(img.id)}
                            className="absolute top-0 right-0 px-1.5 py-0 bg-black/80 hover:bg-primary/70 rounded-xl text-white"
                        > × </Button>
                    </div>
                ))}
                { images.length < maxImagesCount && (
                    <div>
                        <button
                            className="aspect-square bg-thirdary rounded-xl border-2 border-dashed border-accent px-2 w-full h-full"
                            onClick={handleClickForm}
                            title="Добавьте изображение к задаче"
                        > + </button>
                    </div>
                )}
            </div>
        </div>
    );
}
