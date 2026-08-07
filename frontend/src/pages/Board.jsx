import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';

import { useState } from 'react';

import dragHandler from '../utils/dragHandler';
import findTask from '../utils/findTask';
import Column from "../components/Column";
import Task from '../components/Task';

import { COLUMN_TITLES, INITIAL_TASKS } from '../config';


export default function Board() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [activeId, setActiveId] = useState(null);
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }, 
        })
    );

    const handler = new dragHandler(setTasks, setActiveId);
    const activeTask = findTask(tasks, activeId);

    const dndContextProps = {
        sensors,
        collisionDetection: closestCorners,
        onDragStart: handler.start.bind(handler),
        onDragOver: handler.over.bind(handler),
        onDragEnd: handler.end.bind(handler),
    }

    return (
        <DndContext {...dndContextProps}>
            <div className="min-h-screen flex justify-center">
                { COLUMN_TITLES.map((title) => (
                    <Column
                        key={title}
                        title={title} 
                        tasks={tasks.filter(task => task.column === title)} 
                    />
                ))}
            </div>
            <DragOverlay>
                { activeTask 
                    ? <Task 
                        task={activeTask} 
                        isMoving={true} 
                    /> 
                    : null 
                }
            </DragOverlay>
        </DndContext>  
    );
}