import { useState } from 'react';
import { useColumns } from './api';

/**
 * Хук для управления формой задачи (создание/редактирование)
 *
 * @param {Object} initialTask - Начальные данные задачи для формы
 * @param {string} initialTask.title - Название задачи
 * @param {string} initialTask.description - Описание задачи
 * @param {Function} onSubmit - Колбэк при успешной отправке формы
 * @param {Function} onClose - Колбэк для закрытия модалки
 * @returns {Object} Объект с состоянием формы и обработчиками
 * @returns {string} returns.title - Текущее значение названия
 * @returns {Function} returns.setTitle - Функция обновления названия
 * @returns {string} returns.description - Текущее значение описания
 * @returns {Function} returns.setDescription - Функция обновления описания
 * @returns {Function} returns.handleSubmit - Обработчик отправки формы
 */
export function useTaskForm(
    columns,
    initialTask = null,
    onSubmit,
    onClose,
    isEditing = false,
    showAlert,
) {
    const [title, setTitle] = useState(initialTask?.title || '');
    const [description, setDescription] = useState(initialTask?.description || '');

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (!title.trim()) {
            showAlert('Введите название задачи', 'error');
            return;
        }

        const firstColumnId = columns.length > 0 ? columns[0].id : null;

        if (isEditing) {
            await onSubmit({
                id: initialTask.id,
                title: title.trim(),
                description: description.trim(),
            });
        } else {
            await onSubmit({
                title: title.trim(),
                description: description.trim() || 'Нет описания',
                columnId: firstColumnId,
            });
        }

        setTitle('');
        setDescription('');
        onClose();
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        handleSubmit,
    };
}
