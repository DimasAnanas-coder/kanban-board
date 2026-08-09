import { useCallback, useState } from 'react';
import {
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import findTask from '../utils/findTask';

export default function useBoardDnd(tasks, setTasks) {
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    const handleDragStart = useCallback((event) => {
        setActiveId(event.active.id);
    }, []);

    const handleDragOver = useCallback((event) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        setTasks((prevTasks) => {
            const activeTask = findTask(prevTasks, active.id);

            if (!activeTask) {
                return prevTasks;
            }

            const overTask = findTask(prevTasks, over.id);
            const overColumn = overTask
                ? overTask.column
                : over.id;

            if (activeTask.column === overColumn) {
                return prevTasks;
            }

            return prevTasks.map((task) => (
                task.id === active.id
                    ? { ...task, column: overColumn }
                    : task
            ));
        });
    }, [setTasks]);

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;

        setActiveId(null);

        if (!over) {
            return;
        }

        setTasks((prevTasks) => {
            const activeTask = findTask(prevTasks, active.id);
            const overTask = findTask(prevTasks, over.id);

            if (
                !activeTask
                || !overTask
                || activeTask.column !== overTask.column
            ) {
                return prevTasks;
            }

            const columnTasks = prevTasks.filter(
                (task) => task.column === activeTask.column,
            );

            const oldIndex = columnTasks.findIndex(
                (task) => task.id === active.id,
            );
            const newIndex = columnTasks.findIndex(
                (task) => task.id === over.id,
            );

            if (
                oldIndex === -1
                || newIndex === -1
                || oldIndex === newIndex
            ) {
                return prevTasks;
            }

            const reorderedTasks = arrayMove(
                columnTasks,
                oldIndex,
                newIndex,
            );

            let reorderedIndex = 0;

            return prevTasks.map((task) => (
                task.column === activeTask.column
                    ? reorderedTasks[reorderedIndex++]
                    : task
            ));
        });
    }, [setTasks]);

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