import Button from "./Button";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";

const links = [
    { name: 'Доска', to: '/board' },
    { name: 'О нас', to: '/about' },
];

function NavBar() {
    const location = useLocation();
  
    return (
        <nav className="bg-primary pb-4 pt-4">
            <div className="flex justify-between items-center">
                <Logo />
                    <div className="flex gap-2">
                          {links.map(({ name, to }) => (
                              <Button
                                  title={ name } 
                                  link={ to }
                                  isNavigate={ true }
                                  isActive={ location.pathname === to }
                              />
                        ))}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;