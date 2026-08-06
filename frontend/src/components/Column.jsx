import Task from './Task';


const TASKS = {
    1: { title: 'Task 1', description: 'Description for Task 1' },
    2: { title: 'Task 2', description: 'Description for Task 2' },
    3: { title: 'Task 3', description: 'Description for Task 3' },
};

export default function Column({ title, tasks }) {
    return (
        <div className="container bg-secondary rounded-md pb-4 h-fit ml-10 mr-10 min-w-[200px] max-w-[600px]">
            <div className='m-4'>
                <h2 className="font-bold text-text mb-4">{title}</h2>
                {tasks.map((task) => (
                    <Task key={task.id} title={TASKS[task.id].title} description={TASKS[task.id].description} />
                ))}
            </div>
        </div>
    );
}