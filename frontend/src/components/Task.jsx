import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { COLUMNS } from '../config';

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

    const taskColumnObj = COLUMNS.find((column) => task.column === column.title);
    const color = taskColumnObj.color;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1, // Скрываем оригинал, когда перетаскиваем
        borderColor: color
    };

    const movingStyle = isMoving ? "border-2 opacity-90" : "";
    const cursorRuleStyle =  isMoving ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing";
    const shadowRuleStyle = "shadow-md hover:shadow-lg transition-shadow"

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            {...attributes} 
            {...listeners}
            className={`bg-thirdary rounded-md p-4 mb-4 ${shadowRuleStyle} ${cursorRuleStyle} ${movingStyle}`}
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