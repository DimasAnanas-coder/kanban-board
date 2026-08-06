export default function Task({ title, description }) {
    return (
        <div className="bg-thirdary rounded-md p-4 mb-4 shadow-md">
            <h3 className="font-bold text-text mb-2">{title}</h3>
            <p className="text-text mb-2">{description}</p>
        </div>
    );
}