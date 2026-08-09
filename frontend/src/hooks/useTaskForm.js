import { useState } from 'react';

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
    initialTask = null,
    onSubmit,
    onClose,
    isEditing = false,
) {
    const [title, setTitle] = useState(initialTask?.title || '');
    const [description, setDescription] = useState(initialTask?.description || '');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title.trim()) {
            alert('Введите название задачи');
            return;
        }

        let techTaskData = null;
        if (isEditing) {
            techTaskData = initialTask;
        } else {
            const date = new Date().toISOString().split('T')[0];
            techTaskData = {
                id: Date.now().toString(),
                date: date,
                column: 'To Do',
            };
        }

        onSubmit({
            ...techTaskData,
            title: title.trim(),
            description: description.trim() || 'Нет описания',
        });

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
