import BaseModal from '../BaseModal';
import { TitleDescriptionForm } from '../forms/combinations';
import { FormActions } from '../forms';
import { useTaskForm } from '../../../hooks/useTaskForm';

export default function AddTask({ isOpen, onClose, onAddTask }) {
    const { title, setTitle, description, setDescription, handleSubmit } = useTaskForm(
        null,
        onAddTask,
        onClose,
    );

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <div className="m-4 text-text">
                <h3 className="flex justify-center mb-4">
                    Добавление задачи
                </h3>

                <TitleDescriptionForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    onSubmit={handleSubmit}
                />

                <FormActions
                    onCancel={onClose}
                    onSubmit={handleSubmit}
                />
            </div>
        </BaseModal>
    );
}
