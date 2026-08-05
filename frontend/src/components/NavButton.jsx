import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavButton({ name, to, isActive}) {
    const baseStyles = "font-bold px-4 py-2 rounded-md duration-200";

    const activeStyles = isActive 
        ? "bg-accentHover text-accentText" 
        : "bg-primary hover:bg-thirdary text-text";

    return (
        <Link
            key={to}
            to={to}
            className={`${baseStyles} ${activeStyles}`}
        > {name} </Link>
    );
}
