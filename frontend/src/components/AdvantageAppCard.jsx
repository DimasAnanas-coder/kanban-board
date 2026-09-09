export default function AdvantageAppCard({
    title,
    description,
    icon,
    width=1,
}) {
    const colSpanClass = width === 1 ? 'col-span-1' : 'col-span-2';

    return (
        <div className={`bg-secondary p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${colSpanClass}`}>
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-semibold text-text">{title}</h3>
            <p className="text-text/60 text-sm mt-1">
                {description}
            </p>
        </div>
    );
}
