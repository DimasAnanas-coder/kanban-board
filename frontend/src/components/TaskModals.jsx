// components/TaskModals.tsx
import { AddTask, EditTask, DeleteTask } from './modals/taskModals';

export default function TaskModals({
    modal,
    columns,
    onClose,
    onAddTask,
    onEditTask,
    onDeleteTask,
}) {
    if (!modal) {
        return null;
    }

    if (modal.type === 'add') {
        return (
            <AddTask
                columns={columns}
                isOpen
                onClose={onClose}
                onAddTask={onAddTask}
            />
        );
    }

    if (modal.type === 'edit') {
        return (
            <EditTask
                key={modal.task.id}
                columns={columns}
                isOpen
                task={modal.task}
                onClose={onClose}
                onEditTask={onEditTask}
            />
        );
    }

    if (modal.type === 'delete') {
        return (
            <DeleteTask
                key={modal.task.id}
                isOpen
                task={modal.task}
                onClose={onClose}
                onDeleteTask={onDeleteTask}
            />
        );
    }

    return null;
}
