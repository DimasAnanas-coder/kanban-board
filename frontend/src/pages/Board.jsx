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

import Column from '../components/Column';
import Task from '../components/Task';
import AddTask from '../components/modals/taskModals/AddTask';
import Button from '../components/Button';

import { COLUMNS, INITIAL_TASKS } from '../config';


export default function Board() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [activeId, setActiveId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
    );

    const handler = new dragHandler(setTasks, setActiveId);
    const activeTask = findTask(tasks, activeId);

    const dndContextProps = {
        sensors,
        collisionDetection: closestCorners,
        onDragStart: handler.start.bind(handler),
        onDragOver: handler.over.bind(handler),
        onDragEnd: handler.end.bind(handler),
    };

    return (
        <>
            <DndContext {...dndContextProps}>
                <div className='justify-self-end mt-4 mb-4'>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                    >
                        Добавить задачу
                    </Button>
                </div>
                <div className="min-h-screen flex justify-between gap-6">
                    { COLUMNS.map((column) => (
                        <Column
                            key={column.title}
                            column={column}
                            tasks={tasks.filter(task => task.column === column.title)}
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

            <AddTask
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTask={handleAddTask}
            />
        </>
    );
}
