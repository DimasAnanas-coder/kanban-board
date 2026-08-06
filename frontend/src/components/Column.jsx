import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import Task from './Task';

export default function Column({ title, tasks }) {
    const { setNodeRef } = useDroppable({ 
        id: title, 
    });

    return (
        <div 
            ref={setNodeRef}
            className="container bg-secondary rounded-md pb-4 h-fit ml-10 mr-10 min-w-[200px] max-w-[600px]"
        >
            <div className='m-4'>
                <h2 className="font-bold text-text mb-4">{title}</h2>

                <SortableContext 
                    items={tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <Task 
                            key={task.id}
                            id={task.id}
                            title={task.title} 
                            description={task.description} 
                        />
                    ))}
                </SortableContext>
                
            </div>
        </div>
    );
}