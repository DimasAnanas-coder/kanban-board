import { useMemo } from 'react';
import { useAlertContext } from '../contexts/AlertContext';


function makeErrorMessage(config, err){
    let errMsg = ''
    if (typeof config.errorMessage == 'object'){
        if (err.response.data.code in config.errorMessage) {
            errMsg = config.errorMessage[err.response.data.code];
        } else{
            errMsg = config.errorMessage['default'];
        }
    } else{
        errMsg = config.errorMessage;
    }

    return errMsg
}

function createAction(showAlert, config) {
    return async (...args) => {
        try {
            const result = await config.action(...args);
            showAlert(config.successMessage, 'ok');
            return result;
        } catch (err) {
            showAlert(makeErrorMessage(config, err), 'error');
            console.error(err);
            throw err;
        }
    };
}

export function useTaskActions({
    createTask,
    updateTask,
    deleteTask,
    moveTask
}) {
    const { showAlert } = useAlertContext();
    
    return useMemo(() => ({
        handleAddTask: createAction(showAlert, {
            action: (newTask) => createTask(newTask),
            successMessage: 'Задача успешно добавлена',
            errorMessage: {
                'COLUMN_CAPACITY_EXCEEDED': 'В колонке уже слишком много задач. Новую сюда добавить нельзя',
                'default': 'Ошибка при создании задачи'
            }
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
            errorMessage: {
                'COLUMN_CAPACITY_EXCEEDED': 'В колонке уже слишком много задач. Перемещать в эту колонку нельзя',
                'default': 'Ошибка при перемещении задачи'
            }
        }),
    }), [createTask, updateTask, deleteTask, moveTask]);
}