import { ThemeProvider } from './ThemeContext';


export default function AppProvider({ children }) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};
