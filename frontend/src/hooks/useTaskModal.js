import { useState } from 'react';

export function useTaskModal() {
    const [modal, setModal] = useState(null);

    const openAddModal = () => {
        setModal({ type: 'add' });
    };

    const openEditModal = (task) => {
        setModal({
            type: 'edit',
            task,
        });
    };

    const closeModal = () => {
        setModal(null);
    };

    return {
        modal,
        openAddModal,
        openEditModal,
        closeModal,
    };
}
