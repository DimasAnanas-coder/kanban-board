import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Task({ 
    task,
    isMoving = false,
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

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
            <div className='flex mb-2 justify-between text-text'>
                <h3 className="font-bold">
                    { task.title }
                </h3>

                <p className='text-xs'>
                    { task.date }
                </p>
            </div>
            
            <p className="text-text mb-2">
                { task.description }
            </p>
        </div>
    );
}