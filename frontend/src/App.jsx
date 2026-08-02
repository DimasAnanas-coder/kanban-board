import React from 'react'; 
import NavBar from './components/NavBar';
import { routes } from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div className="container mx-auto ">
        <Routes>
          { routes.map(({ path, page }) => (
            <Route key={path} path={path} element={page} />
          ))}
        </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
