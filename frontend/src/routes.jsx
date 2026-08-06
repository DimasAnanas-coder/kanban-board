import Home from './pages/Home';
import Board from './pages/Board';
import NotFound from './pages/NotFound';

export const routes = [
    { path: '/', page: <Home /> },
    { path: '/board', page: <Board /> },
    
    { path: '*', page: <NotFound /> },  
];