export default function findTask(tasks, id) {
    return tasks.find(task => task.id === id);
}
