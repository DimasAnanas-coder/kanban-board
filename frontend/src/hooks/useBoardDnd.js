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

    // Актуальный массив tasks для чтения в handleDragEnd.
    // Обновляется на каждом рендере, поэтому handleDragEnd видит свежие данные,
    // даже если setTasks из handleDragOver ещё не применился.
    const tasksRef = useRef(tasks);
    tasksRef.current = tasks;

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

            const overTaskId = over.data.current?.taskId || null;
            const overTask = overTaskId ? findTask(prevTasks, overTaskId) : null;

            // Целевая колонка: из over-задачи или из over-колонки.
            const targetColumnId = overTask?.columnId
                ?? over.data.current?.columnId
                ?? activeTask.columnId;

            // 1. Переход в другую колонку — меняем columnId у активной задачи.
            if (targetColumnId !== activeTask.columnId) {
                return prevTasks.map((task) => (
                    task.id === activeTaskId
                        ? { ...task, columnId: targetColumnId }
                        : task
                ));
            }

            // 2. Перестановка внутри колонки.
            // Если over — не задача (пустая область колонки), не переставляем:
            // это обработает resolveNeighbors при dragEnd (вставка в конец).
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

    const handleDragEnd = useCallback((event) => {
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

        // Читаем актуальный массив из ref — он уже включает перестановку,
        // сделанную в handleDragOver.
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

        handleMoveTask(activeTaskId, targetColumnId, beforeTaskId, afterTaskId);
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

/**
 * Вычисляет beforeTaskId и afterTaskId для перемещаемой задачи.
 *
 * beforeTaskId — задача, которая стоит непосредственно перед перемещаемой
 *                в новом порядке (null, если перемещаемая — первая).
 * afterTaskId  — задача, которая стоит непосредственно после перемещаемой
 *                в новом порядке (null, если перемещаемая — последняя).
 *
 * Возвращаются именно task.id (id задачи), а не orderId.
 */
function resolveNeighbors(tasks, activeTaskId, targetColumnId, overTaskId) {
    // Все задачи целевой колонки в текущем порядке (включая перемещаемую).
    const columnTasks = tasks.filter((t) => t.columnId === targetColumnId);

    // Случай «over — колонка, не задача»: пользователь бросил задачу
    // на пустую область колонки → вставляем в конец.
    if (overTaskId == null) {
        const others = columnTasks.filter((t) => t.id !== activeTaskId);
        const last = others.length > 0 ? others[others.length - 1] : null;

        return {
            beforeTaskId: last?.id ?? null,
            afterTaskId: null,
        };
    }

    // Случай «over — задача»: находим перемещаемую задачу в новом порядке
    // и берём её соседей по индексу.
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