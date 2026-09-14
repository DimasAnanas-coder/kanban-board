import { useCallback, useRef, useState } from 'react';
import {
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import findTask from '../utils/findTask';

export function useBoardDnd(tasks, handleMoveTask, setTasks) {
    const [activeId, setActiveId] = useState(null);
    const tasksRef = useRef(tasks);
    tasksRef.current = tasks;

    const tasksSnapshot = useRef(null);

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
        tasksSnapshot.current = tasksRef.current;
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

            const overTaskId = over.data.current?.taskId || null;
            const overTask = overTaskId ? findTask(prevTasks, overTaskId) : null;

            const targetColumnId = overTask?.columnId
                ?? over.data.current?.columnId
                ?? activeTask.columnId;

            if (targetColumnId !== activeTask.columnId) {
                return prevTasks.map((task) => (
                    task.id === activeTaskId
                        ? { ...task, columnId: targetColumnId }
                        : task
                ));
            }

            if (!overTask || overTask.id === activeTaskId) {
                return prevTasks;
            }

            const oldIndex = prevTasks.findIndex((t) => t.id === activeTaskId);
            const newIndex = prevTasks.findIndex((t) => t.id === overTask.id);
            if (oldIndex === -1 || newIndex === -1) {
                return prevTasks;
            }

            const reordered = [...prevTasks];
            reordered.splice(oldIndex, 1);
            reordered.splice(newIndex, 0, activeTask);

            return reordered;
        });
    }, [setTasks]);

    const handleDragEnd = useCallback(async (event) => {
        const { active, over } = event;

        setActiveId(null);

        if (!over) {
            return;
        }

        const activeTaskId = active.data.current?.taskId;
        if (activeTaskId == null) {
            return;
        }

        const overTaskId = over.data.current?.taskId || null;

        const currentTasks = tasksRef.current;

        const overTask = overTaskId ? findTask(currentTasks, overTaskId) : null;
        const targetColumnId = overTask?.columnId
            ?? over.data.current?.columnId
            ?? null;

        if (targetColumnId == null) {
            return;
        }

        const { beforeTaskId, afterTaskId } = resolveNeighbors(
            currentTasks,
            activeTaskId,
            targetColumnId,
            overTaskId,
        );
        try {
            await handleMoveTask(activeTaskId, targetColumnId, beforeTaskId, afterTaskId);
        } catch(err) {
            console.log(tasksSnapshot.current);
            setTasks(tasksSnapshot.current);
        }
        
    }, [handleMoveTask]);

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

function resolveNeighbors(tasks, activeTaskId, targetColumnId, overTaskId) {
    const columnTasks = tasks.filter((t) => t.columnId === targetColumnId);

    if (overTaskId == null) {
        const others = columnTasks.filter((t) => t.id !== activeTaskId);
        const last = others.length > 0 ? others[others.length - 1] : null;

        return {
            beforeTaskId: last?.id ?? null,
            afterTaskId: null,
        };
    }

    const activeIndex = columnTasks.findIndex((t) => t.id === activeTaskId);
    if (activeIndex === -1) {
        return { beforeTaskId: null, afterTaskId: null };
    }

    const beforeTask = activeIndex > 0 ? columnTasks[activeIndex - 1] : null;
    const afterTask = activeIndex < columnTasks.length - 1
        ? columnTasks[activeIndex + 1]
        : null;

    return {
        beforeTaskId: beforeTask?.id ?? null,
        afterTaskId: afterTask?.id ?? null,
    };
}