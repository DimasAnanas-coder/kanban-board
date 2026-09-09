import { useState, useCallback, useEffect } from 'react';

import Alert from '../components/Alert';

const ALERT_DELAY_MS = 3000;


export function useAlert() {
    const [alert, setAlert] = useState({
        isOpen: false,
        text: '',
    });

    const showAlert = (text, color) => {
        setAlert({
            isOpen: true,
            text,
            color,
        });
    };

    const hideAlert = () => {
        setAlert({
            isOpen: false,
            text: '',
            color: '',
        });
    };

    useEffect(() => {
        const timeoutId = setTimeout(hideAlert, ALERT_DELAY_MS);
        return () => clearTimeout(timeoutId);
    }, [alert.isOpen]);

    const AlertComponent = alert.isOpen ? (<Alert
        text={alert.text}
        color={alert.color}
    />) : null;

    return { showAlert, AlertComponent };
}
