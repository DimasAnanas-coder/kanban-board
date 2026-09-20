import Button from './Button';

export default function ImagePreview({
    imageUrl,
    onRemove,
}) {
    return (
        <div className="relative aspect-square">
            <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={imageUrl}
                    alt="Task"
                    className="object-cover rounded w-full h-full"
                />
            </a>

            <Button
                onClick={() => onRemove(imageUrl)}
                className="absolute top-0 right-0 px-1.5 py-0 bg-black/80 hover:bg-black/70 rounded-xl text-white"
            > × </Button>
        </div>
    );
}
