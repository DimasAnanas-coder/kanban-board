import NavButton from "./NavButton";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";

const links = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
];

function NavBar() {
  const location = useLocation();
  
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="flex gap-2">
          {links.map(({ name, to }) => (
            <NavButton
              name={ name } 
              to={ to }
              isActive={ location.pathname === to }
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;