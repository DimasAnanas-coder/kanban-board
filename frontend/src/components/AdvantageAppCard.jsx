export default function AdvantageAppCard({ title, description, icon }) {
    return ( 
        <div className="bg-secondary p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-semibold text-text">{title}</h3>
            <p className="text-text/60 text-sm mt-1">
                {description}
            </p>
        </div>
    );
}