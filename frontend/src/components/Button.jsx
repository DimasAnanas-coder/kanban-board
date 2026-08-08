import { Link } from "react-router-dom";


export default function Button({ 
    title,
    onClick=null,
    link=null,
    isNavigate=false,
    isActive=true,
    ...props 
}) {
    let className = 'inline-block bg-accentText text-secondary font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-accentText/90 hover:shadow-xl transition-all duration-200 transform hover:scale-105'
    
    if (link) {
        if (isNavigate){
            const baseStyles = "font-bold px-4 py-2 rounded-md duration-200";

            const activeStyles = isActive 
                ? "bg-accentHover text-accentText" 
                : "bg-primary hover:bg-thirdary text-text";

            className = `${baseStyles} ${activeStyles}`
        }
        
        return (
            <Link
                key={link}
                to={link}
                className={className}
                { ...props }
            >
                { title }
            </Link>
        )
    }

    return (
        <button
            className={className}
            onClick={() => onClick}
            {...props}
        >   
            { title }
        </button>      
    );
}