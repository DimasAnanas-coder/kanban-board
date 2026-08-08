import AdvantageAppCard from "../components/AdvantageAppCard";
import Button from "../components/Button";
import { PROJECT_NAME } from "../config";

const ADVANTAGES = [
    {
        title: "Три колонки",
        description: "To Do, In Progress, Done — стандартный workflow",
        icon: "📋"
    }, 
    {
        title: "Drag & Drop",
        description: "Перетаскивайте карточки мышкой или сенсором",
        icon: "🔄"
    },
    {
        title: "Плавный UX",
        description: "Анимации и обратная связь при взаимодействии",
        icon: "⚡"
    }
];

const PROJECT_DESCRIPTION = "Управляйте своими задачами с помощью интуитивной доски. Перетаскивайте карточки между колонками, отслеживайте прогресс и достигайте целей!";

const FOOTER_TEXT = "Built with React, Tailwind CSS, and dnd-kit. Idea by AI, but my own solution";

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary px-4">
            <div className="max-w-3xl text-center">
                
                <h1 className="text-5xl font-extrabold text-text mb-4 tracking-tight">
                    🚀 Добро пожаловать в 
                    <span className="text-accentText"> {PROJECT_NAME}</span>
                </h1>
                
                <p className="text-xl text-text/80 mb-8 leading-relaxed">
                    {PROJECT_DESCRIPTION}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {ADVANTAGES.map((advantage, index) => (
                        <AdvantageAppCard key={index} {...advantage} />
                    ))}
                </div>

                <Button 
                    title="Перейти к доске →"
                    link="/board"
                />

                <div className="mt-12 text-sm text-text/40">
                    {FOOTER_TEXT}
                </div>
            </div>
        </div>
    );
}

export default Home;