import { createContext, useContext } from 'react';
import { useAlert } from '../hooks';

const AlertContext = createContext();

export function AlertProvider({ children }) {
    const { showAlert, AlertComponent } = useAlert();
    return (
        <AlertContext.Provider value={{ showAlert }}>
            { children }
            { AlertComponent }
        </AlertContext.Provider>
    );
}

export function useAlertContext() {
    const context = useContext(AlertContext);

    if (!context) {
        throw new Error('useAlertContext must be used into AlertProvider');
    }

    return context;
}
