import { useTheme } from '../contexts/ThemeContext';
import sunIcon from '../assets/theme-sun.svg';
import moonIcon from '../assets/theme-moon.svg';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();
    const label = isDark ? 'Включить светлую тему' : 'Включить тёмную тему';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg shadow-sm ring-1 ring-thirdary transition hover:bg-thirdary"
            title={label}
        >
            <img
                src={isDark ? sunIcon : moonIcon}
                alt=""
                className="h-5 w-5"
            />
        </button>
    );
}
