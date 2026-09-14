import { AlertProvider } from './AlertContext';
import { ThemeProvider } from './ThemeContext';


export default function AppProvider({ children }) {
    return (
        <ThemeProvider>
            <AlertProvider>
                {children}
            </AlertProvider>
        </ThemeProvider>
    );
};
