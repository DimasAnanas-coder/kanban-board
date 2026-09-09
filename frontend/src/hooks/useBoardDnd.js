import { useCallback, useState } from 'react';
import {
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import findTask from '../utils/findTask';

export function useBoardDnd(tasks, handleMoveTask, setTasks) {
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    const handleDragStart = useCallback((event) => {
        const taskId = event.active.data.current?.taskId;
        setActiveId(
            Number.isInteger(taskId) ? taskId : null,
        );
    }, []);

    const handleDragOver = useCallback((event) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        setTasks((prevTasks) => {
            const activeTaskId = active.data.current?.taskId || null;
            const activeTask = activeTaskId ? findTask(prevTasks, activeTaskId) : null;
            if (!activeTask) {
                return prevTasks;
            }

            const overColumnId =  over.data.current?.columnId || null;

            if (overColumnId !== activeTask.columnId) {
                return prevTasks.map((task) => (
                    task.id === activeTaskId
                        ? { ...task, columnId: overColumnId }
                        : task
                ));
            }

            return prevTasks;
        });
    }, [setTasks]);

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;

        setActiveId(null);

        if (!over) {
            return;
        }

        handleMoveTask(active.data.current?.taskId, over.data.current?.columnId);
    }, [setTasks, handleMoveTask]);

    return {
        activeTask: findTask(tasks, activeId),
        dndContextProps: {
            sensors,
            collisionDetection: closestCorners,
            onDragStart: handleDragStart,
            onDragOver: handleDragOver,
            onDragEnd: handleDragEnd,
        },
    };
}
