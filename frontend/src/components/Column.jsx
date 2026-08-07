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
            className="container bg-secondary rounded-md pb-4 h-fit min-w-[200px] max-w-[600px]"
        >
            <div className='m-4 text-text'>
                <div className="flex justify-between mb-4">
                    <h2 className="font-bold">
                        {title}
                    </h2>
                    
                    <p className="text-xs rounded-full bg-thirdary px-2 py-1">
                        {tasks.length} 
                    </p>
                </div>
                

                <SortableContext 
                    items={tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <Task 
                            key={task.id}
                            task={task}
                        />
                    ))}
                </SortableContext>
                
            </div>
        </div>
    );
}