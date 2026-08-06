import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Task({ 
    id, 
    title, 
    description,
    isMoving = false,
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1, // Скрываем оригинал, когда перетаскиваем
    };

    const movingStyle = isMoving ? "border-2 border-blue-500 opacity-90" : "";
    const cursorRuleStyle =  isMoving ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing";

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            {...attributes} 
            {...listeners}
            className={`bg-thirdary rounded-md p-4 mb-4 shadow-md ${cursorRuleStyle} hover:shadow-lg transition-shadow ${movingStyle}`}
        >
            <h3 className="font-bold text-text mb-2">{title}</h3>
            <p className="text-text mb-2">{description}</p>
        </div>
    );
}