import TaskService from "../../api/services/TaskServise";
import { useApi } from "./useApi";


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
        { immediate: true }
    );
    
    const {
        execute: createTask,
        loading: createLoading,
        error: createError,
    } = useApi(
        (taskData) => taskService.create(taskData),
        { immediate: false } 
    );

    const {
        execute: updateTask,
        loading: updateLoading,
        error: updateError,
    } = useApi(
        ({ id, taskData }) => taskService.update(id, taskData),
        { immediate: false }
    );

    const {
        execute: deleteTask,
        loading: deleteLoading,
        error: deleteError,
    } = useApi(
        (id) => taskService.delete(id),
        { immediate: false }
    );

    const {
        execute: moveTask,
        loading: moveLoading,
        error: moveError,
    } = useApi(
        ({ taskId, targetColumnId }) =>
            taskService.move(taskId, targetColumnId),
        { immediate: false }
    );

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
        setTasks
    };
}
