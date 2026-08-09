import {
    DndContext,
    DragOverlay,
} from '@dnd-kit/core';

import { useState } from 'react';
import { useTaskModal } from '../hooks/useTaskModal';

import Column from '../components/Column';
import Task from '../components/Task';
import Button from '../components/Button';

import AddTask from '../components/modals/taskModals/AddTask';
import EditTask from '../components/modals/taskModals/EditTask';

import { COLUMNS, INITIAL_TASKS } from '../config';
import useBoardDnd from '../hooks/useBoardDnd';


export default function Board() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const {
        modal,
        openAddModal,
        openEditModal,
        closeModal,
    } = useTaskModal();

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleEditTask = (editedTask) => {
        setTasks((prevTasks) => (
            prevTasks.map((task) => (
                task.id === editedTask.id ? editedTask : task
            ))
        ));
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
                />
            )}

            {modal?.type === 'edit' && (
                <EditTask
                    key={modal.task.id}
                    isOpen
                    task={modal.task}
                    onClose={closeModal}
                    onEditTask={handleEditTask}
                />
            )}
        </>
    );
}
