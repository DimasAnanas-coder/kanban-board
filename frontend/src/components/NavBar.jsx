import NavLink from './NavLink';
import Logo from './Logo';

const links = [
    { name: 'Доска', to: '/board' },
    { name: 'О нас', to: '/about' },
];

function NavBar() {
    return (
        <nav className="bg-primary pb-4 pt-4">
            <div className="flex justify-between items-center">
                <Logo />

                <div className="flex gap-2">
                    {links.map(({ name, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                        >
                            {name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
