import React from 'react';
import { NavLink } from 'react-router-dom';
import { Session } from 'services/session';
import { ROUTES } from 'services/routes';
import './header.css';

export const Header = () => (
	<header className="header header_main">
		<Link to={ROUTES.HOME}>
			<span className="header__logo">Issue Tracker</span>
		</Link>
		{
			Session.isAuthorized() ? (
				<nav className="header__nav">
					<Link to={ROUTES.CREATE.replace(':type', 'issue')}>
						New issue
					</Link>
					<Link to={ROUTES.LIST.replace(':type', 'issue')}>
						All issues
					</Link>
					<Link to={ROUTES.CREATE.replace(':type', 'user')}>
						New user
					</Link>
                    <Link to={ROUTES.LIST.replace(':type', 'user')}>
                        All users
                    </Link>
                    <Link to={ROUTES.AUTHORIZE} onClick={Session.clear}>
                        Log out
                    </Link>
				</nav>
			) : null
		}
	</header>
);

const Link = ({ children, ...props }) => (
    <NavLink
        className="nav__link"
        activeClassName="nav__link_active"
        {...props}
    >
        {children}
    </NavLink>
);
