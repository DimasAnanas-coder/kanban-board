import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import { routes } from './routes';
import AppProvider from './contexts/AppProvider';
import BasePage from './pages/BasePage';

import './index.css';

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <BasePage>
                    <NavBar />
                    <Routes>
                        { routes.map(({ path, page }) => (
                            <Route key={path} path={path} element={page} />
                        ))}
                    </Routes>
                </BasePage>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;
