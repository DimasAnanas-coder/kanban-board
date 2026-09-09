import AdvantageAppCard from '../components/AdvantageAppCard';
import Button from '../components/Button';
import { PROJECT_NAME } from '../config';

const ADVANTAGES = [
    {
        title: 'Три колонки',
        description: 'To Do, In Progress, Done — стандартный workflow',
        icon: '📋',
        width: 1,
    },
    {
        title: 'Drag & Drop',
        description: 'Перетаскивайте карточки мышкой или сенсором',
        icon: '🔄',
        width: 2,
    },
    {
        title: 'Плавный UX',
        description: 'Анимации и обратная связь при взаимодействии. Сопровождается понятными алертами',
        icon: '⚡',
        width: 2,
    },
    {
        title: 'Полный контроль',
        description: 'Задачи можно создавать, изменять и удалять',
        icon: '🧩',
        width: 1,
    },
];

const PROJECT_DESCRIPTION = 'Управляйте своими задачами с помощью интуитивной доски. Перетаскивайте карточки между колонками, отслеживайте прогресс и достигайте целей!';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary px-4">
            <div className="max-w-3xl text-center">

                <h1 className="text-5xl font-extrabold text-text mb-2 tracking-tight">
                    🚀 Добро пожаловать в
                    <span className="text-accentText"> {PROJECT_NAME}</span>
                </h1>

                <p className="text-xl text-text/80 mb-8 leading-relaxed">
                    {PROJECT_DESCRIPTION}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
                    {ADVANTAGES.map((advantage, index, width) => (
                        <AdvantageAppCard
                            key={index}
                            width={width}
                            {...advantage}
                        />
                    ))}
                </div>

                <Button
                    link="/board"
                >
                    Перейти к доске →
                </Button>
            </div>
        </div>
    );
}
