import Column from "../components/Column";

const COLUMN_TITLES = ['To Do', 'In Progress', 'Done'];

const TASKS = [
    { id: 1, column: 'To Do' },
    { id: 2, column: 'In Progress' },
    { id: 3, column: 'To Do' },
];

export default function Board() {
    return (
        <div className="min-h-screen flex justify-center">
            { COLUMN_TITLES.map((title) => (
                <Column title={title} tasks={TASKS.filter(task => task.column === title)} />
            ))}
        </div>
    );
}