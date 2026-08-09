import { Link } from 'react-router-dom';

import { BUTTON_COLORS } from '../config';


export default function Button({
    children,
    onClick=null,
    link=null,
    className='',
    color='accent',
    ...props
}) {
    if (!(color in BUTTON_COLORS)){
        throw new Error(`Недопустимое значение параметра color - ${color}`);
    }

    const bgColorStyle = BUTTON_COLORS[color];
    const baseClassName = 'inline-block text-secondary font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl';
    const finalClassName = `${baseClassName} ${bgColorStyle} ${className}`;

    if (link) {
        return (
            <Link
                to={link}
                className={finalClassName}
                {...props}
            >
                { children }
            </Link>
        );
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
