import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link btn btn-light">Головна</Link>
            </li>
            <li className="nav-item">
              <Link to="/calendar" className="nav-link btn btn-light">Календар</Link>
            </li>
            <li className="nav-item">
              <Link to="/stats" className="nav-link btn btn-light">Статистика</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
