const COLUMNS = [
    { title: 'To Do', color: '#4444EF' },
    { title: 'In Progress', color: '#F59E0B' },
    { title: 'Done', color: '#10B981' },
];

const PROJECT_NAME = 'Task Manager';

const INITIAL_TASKS = [
    { id: '1', title: 'Task 1', description: 'Description for Task 1', date: '2023-01-01', column: 'To Do' },
    { id: '2', title: 'Task 2', description: 'Description for Task 2', date: '2023-01-02', column: 'In Progress' },
    { id: '3', title: 'Task 3', description: 'Description for Task 3', date: '2023-01-03', column: 'To Do' },
];

export { 
    PROJECT_NAME, 
    COLUMNS, 
    INITIAL_TASKS 
};