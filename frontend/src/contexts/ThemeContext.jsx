import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks';
import { START_THEME, LIGHT_THEME, DARK_THEME } from '../themes';


const ThemeContext = createContext();


export function ThemeProvider({ children }) {
    const [theme, setTheme] = useLocalStorage('theme', START_THEME);

    const isDark = theme === DARK_THEME;

    const toggleTheme = () => {
        setTheme(isDark ? LIGHT_THEME : DARK_THEME);
    };

    useEffect(() => {
        document.documentElement.classList.toggle(DARK_THEME, isDark);
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{
            toggleTheme,
            isDark,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};


export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used into ThemeProvider');
    }

    return context;
}
