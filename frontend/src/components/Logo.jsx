import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

import { PROJECT_NAME } from '../config';

export default function Logo() {
    return (
        <Link
            key="/"
            to="/"
            className="flex items-center"
        >
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="ml-2 font-bold">{PROJECT_NAME}</span>
        </Link>
    );
}
