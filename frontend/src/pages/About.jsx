import AdvantageAppCard from '../components/AdvantageAppCard';
import Button from '../components/Button';
import { PROJECT_NAME } from '../config';

const FEATURES = [
    {
        title: 'Понятный процесс',
        description: 'Разделяйте задачи по этапам и сразу видьте текущий прогресс.',
        icon: '🗂️',
    },
    {
        title: 'Удобная работа',
        description: 'Перемещайте карточки между колонками простым перетаскиванием.',
        icon: '✨',
    },
    {
        title: 'Фокус на главном',
        description: 'Сохраняйте порядок в задачах без лишних инструментов.',
        icon: '🎯',
    },
];

function About() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-primary px-4 py-12">
            <div className="max-w-3xl text-center">
                <h1 className="text-5xl font-extrabold text-text mb-4 tracking-tight">
                    О <span className="text-accentText">{PROJECT_NAME}</span>
                </h1>

                <p className="text-xl text-text/80 mb-8 leading-relaxed">
                    Простой канбан-менеджер задач, который помогает держать работу в порядке
                    и двигаться к целям.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {FEATURES.map((feature) => (
                        <AdvantageAppCard key={feature.title} {...feature} />
                    ))}
                </div>

                <Button link="/board">Открыть доску →</Button>
            </div>
        </div>
    );
}

export default About;
