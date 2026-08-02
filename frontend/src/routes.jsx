import Home from './pages/Home';
import NotFound from './pages/NotFound';

export const routes = [
    { path: '/', page: <Home /> },
    
    { path: '*', page: <NotFound /> },  
];