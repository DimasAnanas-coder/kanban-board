import { useState } from 'react';

import Button from './Button';

export default function AddTaskModal({ isOpen, onClose, onAddTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!title.trim()) {
            alert('Введите название задачи');
            return;
        }

        const date = new Date().toISOString().split('T')[0];
        const newTask = {
            id: Date.now().toString(),
            date: date, 
            title: title.trim(),
            description: description.trim() || 'Нет описания',
            column: 'To Do' 
        };

        onAddTask(newTask);
        
        setTitle('');
        setDescription('');
        onClose();
    };

    const borderRuleStyle = "border-thirdary focus:ring-2 focus:ring-accent focus:border-transparent"
    const textFieldClassName = `w-full px-4 py-2 border ${borderRuleStyle} rounded-lg focus:outline-none bg-primary`;

    return (
        <div 
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            onClick={onClose}
        >
            <div
                className='bg-secondary rounded-md '
                onClick={(event) => event.stopPropagation()}
            >
                <div className='m-4 text-text'>
                    <h3 className='flex  justify-center mb-4'>
                        Добавление задачи
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="Введите название..."
                                className={textFieldClassName}
                                autoFocus
                                required
                            />
                        </div>

                        <div className='mb-4'>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Введите описание (необязательно)..."
                                rows="3"
                                className={textFieldClassName}
                            />
                        </div>
                    </form>
                    <div className='flex justify-between gap-4'>
                        <Button
                            color='error'
                            onClick={onClose}
                        >
                            Отменить
                        </Button>
                        <Button
                            color='ok'
                            onClick={handleSubmit}
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}