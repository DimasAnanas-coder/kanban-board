import DeleteModal from '../DeleteModal';


export default function DeleteTask({
    isOpen,
    onClose,
    onDeleteTask,
    task,
}) {
    const handleDelete = async () => {
        await onDeleteTask(task.id);
        onClose();
    };

    return (
        <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            handleDelete={handleDelete}
        >
            <div className="mb-4">
                <p>
                    Вы действительно хотите удалить задачу "{task.title}"?
                </p>
            </div>
        </DeleteModal>
    );
}
