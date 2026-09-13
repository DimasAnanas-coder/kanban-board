import { useMemo } from 'react';


function createAction(showAlert, config) {
    return async (...args) => {
        try {
            const result = await config.action(...args);
            showAlert(config.successMessage, 'ok');
            return result;
        } catch (err) {
            showAlert(config.errorMessage, 'error');
            console.error(err);
            return undefined;
        }
    };
}

export function useTaskActions({
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    showAlert,
}) {
    return useMemo(() => ({
        handleAddTask: createAction(showAlert, {
            action: (newTask) => createTask(newTask),
            successMessage: 'Задача успешно добавлена',
            errorMessage: 'Ошибка при добавлении задачи',
        }),

        handleEditTask: createAction(showAlert, {
            action: ({ id, title, description }) =>
                updateTask({ id, taskData: { title, description } }),
            successMessage: 'Задача успешно обновлена',
            errorMessage: 'Ошибка при обновлении задачи',
        }),

        handleDeleteTask: createAction(showAlert, {
            action: (id) => deleteTask(id),
            successMessage: 'Задача успешно удалена',
            errorMessage: 'Ошибка при удалении задачи',
        }),

        handleMoveTask: createAction(showAlert, {
            action: (taskId, targetColumnId, beforeTaskId, afterTaskId) =>
                moveTask({ taskId, targetColumnId, beforeTaskId, afterTaskId }),
            successMessage: 'Задача успешно перемещена',
            errorMessage: 'Ошибка при перемещении задачи',
        }),
    }), [createTask, updateTask, deleteTask, moveTask, showAlert]);
}