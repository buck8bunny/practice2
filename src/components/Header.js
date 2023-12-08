import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link btn btn-light" onClick={handleNavCollapse}>
                Головна
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/calendar" className="nav-link btn btn-light" onClick={handleNavCollapse}>
                Календар
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/stats" className="nav-link btn btn-light" onClick={handleNavCollapse}>
                Статистика
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
