import { useImageUpload } from "../../hooks"
import Button from "../Button";

export default function PhotoInput({taskId}) {
    const {
        images,
        inputRef,
        handleClickForm,
        handleUploadImage,
        handleRemoveImage,
        // handleClearImages,
    } = useImageUpload(taskId);

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
            <Button
                onClick={handleClickForm}
            > Добавить фото </Button>

            {images.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                    {images.map((img) => (
                        <div key={img.id} className="relative">
                            <img
                                src={img.previewUrl}
                                alt={img.file.name}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <Button
                                onClick={() => handleRemoveImage(img.id)}
                                className="absolute top-0 right-0 px-1.5 py-0 bg-black/80 hover:bg-primary/70 rounded-xl text-white"
                            > × </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
