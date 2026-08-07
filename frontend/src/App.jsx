import React from 'react'; 
import NavBar from './components/NavBar';
import { routes } from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-primary">
        <div className='ml-6 mr-6'>
          <NavBar />
          <Routes>
            { routes.map(({ path, page }) => (
              <Route key={path} path={path} element={page} />
            ))}
          </Routes>
        </div>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
