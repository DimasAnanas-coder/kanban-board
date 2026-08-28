import { useState, useCallback, useEffect } from 'react';

import Alert from '../components/Alert';

const ALERT_DELAY_MS = 3000;


export function useAlert() {
    const [alert, setAlert] = useState({
        isOpen: false,
        text: '',
    });

    const showAlert = useCallback((text) => {
        setAlert({
            isOpen: true,
            text,
        });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert({
            isOpen: false,
            text: '',
        });
    }, []);

    useEffect(() => {
         const timeoutId = setTimeout(hideAlert, ALERT_DELAY_MS);
        return () => clearTimeout(timeoutId);
    }, [alert.isOpen]);

    const AlertComponent = alert.isOpen ? (<Alert
        text={alert.text}
    />) : null;

    return { showAlert, AlertComponent };
}
