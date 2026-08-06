import findTask from "./findTask";
import { arrayMove } from '@dnd-kit/sortable';

export default class dragHandler {
    constructor(setTasks, setActiveId) {
        this.setTasks = setTasks;
        this.setActiveId = setActiveId;
    }

    start(event) {
        const { active } = event;
        this.setActiveId(active.id);
    }

    over(event) {
        const { active, over } = event;
        if (!over) return;

        this.setTasks((prevTasks) => {
            const activeTask = findTask(prevTasks, active.id);
            if (!activeTask) return prevTasks;

            const overTask = findTask(prevTasks, over.id);
            let overColumn = null;
            
            if (overTask) {
                overColumn = overTask.column; // Если over — это задача, берем ее колонку
            } else {
                overColumn = over.id;         // Если over — это колонка, берем ее id (название)
            }

            if (overColumn && activeTask.column !== overColumn) {
                const otherTasks = prevTasks.filter(t => t.id !== active.id);
                return [...otherTasks, { ...activeTask, column: overColumn }];
            }
            
            return prevTasks;
        });
    }

    end(event) {
        const { active, over } = event;
        this.setActiveId(null);

        if (!over) return;

        // ВСЯ логика внутри setTasks с актуальным prev
        this.setTasks((prevTasks) => {
            const activeTask = findTask(prevTasks, active.id);
            const overTask = findTask(prevTasks, over.id);
            
            if (activeTask && overTask && activeTask.column === overTask.column) {
                const columnTasks = prevTasks.filter(t => t.column === activeTask.column);
                const oldIndex = columnTasks.findIndex(t => t.id === active.id);
                const newIndex = columnTasks.findIndex(t => t.id === over.id);
                
                if (oldIndex !== newIndex && oldIndex !== -1 && newIndex !== -1) {
                    const reordered = arrayMove(columnTasks, oldIndex, newIndex);
                    const otherTasks = prevTasks.filter(t => t.column !== activeTask.column);
                    return [...otherTasks, ...reordered];
                }
            }
            
            return prevTasks;
        });
    }
}