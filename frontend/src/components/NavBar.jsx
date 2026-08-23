import NavLink from './NavLink';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const links = [
    { name: 'Доска', to: '/board' },
    { name: 'О нас', to: '/about' },
];

function NavBar() {
    return (
        <nav className="bg-primary pb-4 pt-4 text-text">
            <div className="flex justify-between items-center">
                <Logo />

                <div className="flex items-center gap-2">
                    {links.map(({ name, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                        >
                            {name}
                        </NavLink>
                    ))}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
