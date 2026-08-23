import Home from './pages/Home';
import Board from './pages/Board';
import About from './pages/About';
import NotFound from './pages/NotFound';

export const routes = [
    { path: '/', page: <Home /> },
    { path: '/board', page: <Board /> },
    { path: '/about', page: <About /> },

    { path: '*', page: <NotFound /> },
];
