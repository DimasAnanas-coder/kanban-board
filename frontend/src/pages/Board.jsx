import {
    DndContext,
    DragOverlay,
} from '@dnd-kit/core';

import { useState } from 'react';
import { useTaskModal, useBoardDnd, useAlert } from '../hooks';

import Column from '../components/Column';
import Task from '../components/Task';
import Button from '../components/Button';

import { AddTask, EditTask, DeleteTask } from '../components/modals/taskModals';

import { COLUMNS, INITIAL_TASKS } from '../config';


export default function Board() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const {
        modal,
        openAddModal,
        openEditModal,
        openDeleteModal,
        closeModal,
    } = useTaskModal();

    const { showAlert, AlertComponent } = useAlert();

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        showAlert('Задача успешно добавлена', 'ok');
    };

    const handleEditTask = (editedTask) => {
        setTasks((prevTasks) => (
            prevTasks.map((task) => (
                task.id === editedTask.id ? editedTask : task
            ))
        ));
        showAlert('Задача успешно обновлена', 'ok');
    };

    const handleDeleteTask = (deletedTask) => {
        setTasks((prevTasks) => (
            prevTasks.filter((task) => (
                task.id !== deletedTask.id
            ))
        ));
        showAlert('Задача успешно удалена', 'ok');
    };

    const { activeTask, dndContextProps } = useBoardDnd(tasks, setTasks);

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
                    { COLUMNS.map((column) => (
                        <Column
                            key={column.title}
                            column={column}
                            tasks={tasks.filter(task => task.column === column.title)}
                            onEditClick={openEditModal}
                            onDeleteClick={openDeleteModal}
                        />
                    ))}
                </div>
                <DragOverlay>
                    { activeTask && (
                        <Task
                            task={activeTask}
                            isMoving={true}
                        />
                    )}
                </DragOverlay>
            </DndContext>

            {modal?.type === 'add' && (
                <AddTask
                    isOpen
                    onClose={closeModal}
                    onAddTask={handleAddTask}
                    showAlert={showAlert}
                />
            )}

            {modal?.type === 'edit' && (
                <EditTask
                    key={modal.task.id}
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
