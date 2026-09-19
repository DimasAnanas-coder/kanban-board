import Button from "./Button";

export default function ImagePreview({
    img,
    onRemove,
}) {
    return (
        <div className="relative aspect-square">
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
                onClick={() => onRemove(img.id)}
                className="absolute top-0 right-0 px-1.5 py-0 bg-black/80 hover:bg-primary/70 rounded-xl text-white"
            > × </Button>
        </div>
    );
}
