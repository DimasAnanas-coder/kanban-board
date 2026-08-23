import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { COLUMNS } from '../config';

import editIcon from '../assets/editWhite.svg';
import trashIcon from '../assets/trash.svg';

export default function Task({
    task,
    onEditClick,
    onDeleteClick,
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
    const color = isMoving ? taskColumnObj.color : null;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.2 : 1, // Скрываем оригинал, когда перетаскиваем
        borderColor: color,
    };

    const borderStyle = isMoving ? '' : 'border-thirdary';
    const cursorRuleStyle =  isMoving ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing';
    const shadowRuleStyle = 'shadow-md hover:shadow-lg transition-shadow';

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-thirdary border-2 flex rounded-md p-4 mb-4 ${shadowRuleStyle} ${cursorRuleStyle} ${borderStyle} gap-2`}
        >
            <div className='b-2 flex text-text flex-1 flex-col'>
                <h3 className="font-bold">
                    { task.title }
                </h3>
                <div className='mb-2'>
                    <p className="text-text ">
                        { task.description }
                    </p>
                </div>
            </div>

            <div className='flex flex-col justify-between min-w-18 w-18'>
                <div className='flex justify-end'>
                    <p className='text-xs'>
                        { task.date }
                    </p>
                </div>


                {!isMoving && (
                    <div className='flex justify-between h-8 w-full'>
                        <button
                            onClick={() => onEditClick(task)}
                            title="Изменить задачу"
                        >
                            <img src={editIcon} alt="Edit" className="w-8 h-8" />
                        </button>

                        <button
                            onClick={() => onDeleteClick(task)}
                            title="Удалить задачу"
                        >
                            <img src={trashIcon} alt="Delete" className="w-8 h-8" />
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}
