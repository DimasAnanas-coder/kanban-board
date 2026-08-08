import { Link, useLocation } from "react-router-dom";

export default function NavLink({
    to, 
    children
}){
    const location = useLocation();
    const isActive = location.pathname === to;

    const baseStyles = "font-bold px-4 py-2 rounded-md duration-200";

    const activeStyles = isActive 
        ? "bg-accentHover text-accentText" 
        : "bg-primary hover:bg-thirdary text-text";

    return (
        <Link 
            to={to} 
            className={`${baseStyles} ${activeStyles}`}
        >
            { children }
        </Link>
    );

}