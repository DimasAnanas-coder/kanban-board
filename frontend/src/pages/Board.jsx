import {
    DndContext,
    DragOverlay,
} from '@dnd-kit/core';

import { useTaskModal, useBoardDnd, useTasks, useColumns, useTaskActions } from '../hooks';

import Column from '../components/Column';
import Task from '../components/Task';
import Button from '../components/Button';

import TaskModals from '../components/TaskModals';

export default function Board() {
    const {
        tasks,
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

    const { handleAddTask, handleEditTask, handleDeleteTask, handleMoveTask } = useTaskActions({
        createTask,
        updateTask,
        deleteTask,
        moveTask
    });

    const { activeTask, dndContextProps } = useBoardDnd(tasks, handleMoveTask, setTasks);

    const { 
        columns,
    } = useColumns();

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
            
            <TaskModals
                modal={modal}
                columns={columns}
                onClose={closeModal}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
            />
        </>
    );
}
