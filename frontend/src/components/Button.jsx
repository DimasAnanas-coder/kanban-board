import { Link } from "react-router-dom";

export default function Button({ 
    children,
    onClick=null,
    link=null,
    className='',
    ...props 
}) {
    const baseClassName = 'inline-block bg-accent text-secondary font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-accentText/90 hover:shadow-xl'
    const finalClassName = `${baseClassName} ${className}`;

    if (link) {
        return (
            <Link
                to={link}
                className={finalClassName}
                { ...props }
            >
                { children }
            </Link>
        )
    }

    return (
        <button
            className={finalClassName}
            onClick={onClick}
            {...props}
        >   
            { children }
        </button>      
    );
}