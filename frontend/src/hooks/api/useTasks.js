import TaskService from '../../api/services/TaskServise';
import { useApi } from './useApi';


const taskService = new TaskService();


export function useTasks() {
    const {
        data: tasks,
        setData: setTasks,
        loading: tasksLoading,
        error: tasksError,
        execute: fetchTasks,
    } = useApi(
        () => taskService.getAll(),
        {
            immediate: true,
            initialData: [],
        },
    );

    const {
        execute: createTaskRequest,
        loading: createLoading,
        error: createError,
    } = useApi(
        (taskData) => taskService.create(taskData),
        { immediate: false },
    );

    const {
        execute: updateTaskRequest,
        loading: updateLoading,
        error: updateError,
    } = useApi(
        ({ id, taskData }) => taskService.update(id, taskData),
        { immediate: false },
    );

    const {
        execute: deleteTaskRequest,
        loading: deleteLoading,
        error: deleteError,
    } = useApi(
        (id) => taskService.delete(id),
        { immediate: false },
    );

    const {
        execute: moveTaskRequest,
        loading: moveLoading,
        error: moveError,
    } = useApi(
        ({ taskId, targetColumnId, beforeTaskId, afterTaskId }) =>
            taskService.move(taskId, targetColumnId, beforeTaskId, afterTaskId),
        { immediate: false },
    );


    const createTask = async(taskData) => {
        const createdTask = await createTaskRequest(taskData);
        setTasks(prevTasks => [...prevTasks, createdTask]);
        return createdTask;
    };

    const updateTask = async({ id, taskData }) => {
        const updatedTask = await updateTaskRequest({ id, taskData });
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
        return updatedTask;
    };

    const deleteTask = async(id) => {
        await deleteTaskRequest(id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const moveTask = async({ taskId, targetColumnId, beforeTaskId, afterTaskId }) => {
        const movedTask = await moveTaskRequest({ taskId, targetColumnId, beforeTaskId, afterTaskId });
        setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? movedTask : task));
        return movedTask;
    };

    return {
        // Данные
        tasks,
        loading: tasksLoading,
        error: tasksError,

        // Базовые мутации
        createTask,
        updateTask,
        deleteTask,
        moveTask,

        // Статусы загрузки
        createLoading,
        updateLoading,
        deleteLoading,
        moveLoading,

        // Ошибки мутаций
        createError,
        updateError,
        deleteError,
        moveError,

        // Утилиты
        fetchTasks,
        setTasks,
    };
}
