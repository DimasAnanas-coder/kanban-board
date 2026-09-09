import {
    DndContext,
    DragOverlay,
} from '@dnd-kit/core';

import { useTaskModal, useBoardDnd, useAlert, useTasks, useColumns } from '../hooks';

import Column from '../components/Column';
import Task from '../components/Task';
import Button from '../components/Button';

import { AddTask, EditTask, DeleteTask } from '../components/modals/taskModals';

export default function Board() {
    const {
        tasks,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
        moveTask,
        setTasks,
    } = useTasks();

    console.log(error);

    const {
        modal,
        openAddModal,
        openEditModal,
        openDeleteModal,
        closeModal,
    } = useTaskModal();

    const { showAlert, AlertComponent } = useAlert();

    const handleAddTask = async(newTask) => {
        try {
            await createTask(newTask);
            showAlert('Задача успешно добавлена', 'ok');
        } catch (err) {
            showAlert('Ошибка при добавлении задачи', 'error');
            console.error(err);
        }
    };

    const handleEditTask = async({ id, title, description }) => {
        try {
            await updateTask({ id, taskData: { title, description } });
            showAlert('Задача успешно обновлена', 'ok');
        } catch (err) {
            showAlert('Ошибка при обновлении задачи', 'error');
            console.error(err);
        }
    };

    const handleDeleteTask = async(id) => {
        try {
            await deleteTask(id);
            showAlert('Задача успешно удалена', 'ok');
        } catch (err) {
            showAlert('Ошибка при удалении задачи', 'error');
            console.error(err);
        }
    };

    const handleMoveTask = async(taskId, targetColumnId) => {
        try {
            await moveTask({ taskId, targetColumnId });
            showAlert('Задача успешно перемещена', 'ok');
        } catch (err) {
            showAlert('Ошибка при перемещении задачи', 'error');
            console.error(err);
        }
    };


    const { activeTask, dndContextProps } = useBoardDnd(tasks, handleMoveTask, setTasks);

    const { columns } = useColumns();

    return (
        <>
            <DndContext {...dndContextProps}>
                <div className='justify-self-end mt-4 mb-4'>
                    <Button
                        onClick={openAddModal}
                    >
                        Добавить задачу
                    </Button>
                </div>
                <div className="min-h-screen flex justify-between gap-6">
                    { columns.map((column) => (
                        <Column
                            columns={columns}
                            key={`column-${column.id}`}
                            column={column}
                            tasks={tasks.filter(task => task.columnId === column.id)}
                            onEditClick={openEditModal}
                            onDeleteClick={openDeleteModal}
                        />
                    ))}
                </div>
                <DragOverlay>
                    { activeTask && (
                        <Task
                            columns={columns}
                            task={activeTask}
                            isMoving={true}
                        />
                    )}
                </DragOverlay>
            </DndContext>

            {modal?.type === 'add' && (
                <AddTask
                    columns={columns}
                    isOpen
                    onClose={closeModal}
                    onAddTask={handleAddTask}
                    showAlert={showAlert}
                />
            )}

            {modal?.type === 'edit' && (
                <EditTask
                    key={modal.task.id}
                    columns={columns}
                    isOpen
                    task={modal.task}
                    onClose={closeModal}
                    onEditTask={handleEditTask}
                    showAlert={showAlert}
                />
            )}

            {modal?.type === 'delete' && (
                <DeleteTask
                    key={modal.task.id}
                    isOpen
                    task={modal.task}
                    onClose={closeModal}
                    onDeleteTask={handleDeleteTask}
                />
            )}

            { AlertComponent }
        </>
    );
}
