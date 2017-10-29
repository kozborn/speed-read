import React from 'react';
import { Link } from 'react-router-dom';
import { func, string } from 'prop-types';
import logo from "../assets/logo.svg";

const Header = (props) => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <nav className="navigation-top">
        <li><Link to="/">Home page</Link></li>
        <li><Link to={`/bottom-half-text${props.queryParams}`}>Dolna połowa tekstu</Link></li>
        <li><Link to={`/top-half-text${props.queryParams}`}>Górna połowa tekstu</Link></li>
        <li><Link to={`/schultz-table${props.queryParams}`}>Tabela Schultz'a</Link></li>
        <li><Link to={`/fixations${props.queryParams}`}>Fiksacja</Link></li>
        <li><Link to={`/user-texts${props.queryParams}`}>Twoje teksty</Link></li>
        {
          localStorage.getItem("docId") ?
            <li>
              <button className="btn btn-sm btn-warning" onClick={props.clearLocalStorage}>
                Wyczyść dane
              </button>
            </li>
            : null
        }
      </nav>
    </header>
  );
};

Header.propTypes = {
  clearLocalStorage: func.isRequired,
  queryParams: string.isRequired,
};

export default Header;
