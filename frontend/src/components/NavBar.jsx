import { Link } from "react-router-dom";

const links = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
];

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Kanban Board</h1>
        <div>
          {links.map(({ name, to }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;