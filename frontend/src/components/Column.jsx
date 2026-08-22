import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import Task from './Task';

export default function Column({
    column,
    tasks,
    onEditClick,
    onDeleteClick,
}) {
    const { setNodeRef } = useDroppable({
        id: column.title,
    });

    return (
        <div
            ref={setNodeRef}
            className="container bg-secondary rounded-md pb-4 h-fit min-w-[200px] max-w-[600px]"
        >
            <div className='text-text m-4'>
                <div className="flex justify-between mb-4">
                    <div className="rounded-full px-2 py-1" style={{ background: column.color }}>
                        <h2 className='font-bold'>
                            {column.title}
                        </h2>
                    </div>

                    <div>
                        <p className="text-xs rounded-full bg-thirdary px-2 py-1">
                            {tasks.length}
                        </p>
                    </div>

                </div>


                <SortableContext
                    items={tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            onEditClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                            task={task}
                        />
                    ))}
                </SortableContext>

            </div>
        </div>
    );
}
