import React from "react";
import { NavLink, Link } from "react-router-dom";
import { routes } from "../../routing/routes";
import Logo from "../../logo.png";

function Header() {

  return (
    <header className="main-header">
      <div className="wrapper">
        <span className="brand">
          <Link to="/"><img src={Logo} alt="logo"/></Link>
        </span>
        <div className="navigation">
          {routes.map((route) => {
            return <NavLink
                key={route.path}
                exact={route.exact}
                className="navigation__link"
                to={route.path}
              >
                {route.main_nav_label}
              </NavLink>
            }
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
