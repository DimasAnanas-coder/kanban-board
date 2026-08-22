import BaseModal from './BaseModal';
import { FormActions } from './forms';

export default function DeleteModal({
    isOpen,
    onClose,
    title='Подтверждение удаления',
    handleDelete,
    children,
}) {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <div className="m-4 text-text">
                <h3 className="flex font-bold justify-center mb-4">
                    {title}
                </h3>

                {children}

                <FormActions
                    onCancel={onClose}
                    submitText="Удалить"
                    onSubmit={handleDelete}

                />
            </div>
        </BaseModal>
    );
}
