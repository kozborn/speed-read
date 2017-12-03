import React from "react";
import { Link } from "react-router-dom";
import { string } from "prop-types";

const Footer = ({ queryParams }) =>
(
  <div className="App-footer">
    <footer>
      <nav className="navigation-footer">
        <li><Link to="/">Home page</Link></li>
        <li><Link to={`/bottom-half-text${queryParams}`}>Dolna połowa tekstu</Link></li>
        <li><Link to={`/top-half-text${queryParams}`}>Górna połowa tekstu</Link></li>
        <li><Link to={`/schultz-table${queryParams}`}>Tabela Schultz'a</Link></li>
        <li><Link to={`/fixations${queryParams}`}>Fiksacja</Link></li>
        <li><Link to={`/user-texts${queryParams}`}>Twoje teksty</Link></li>
      </nav>
      <div className="clearfix" />

      <div className="user-private-link">
        Twój prywatny link <a href="/">FIX ME</a>
      </div>

      <div className="copyrights">
        © Copyright by piotrkozubek@gmail.com {new Date().getFullYear()}
      </div>
    </footer>
  </div>
);

Footer.propTypes = {
  queryParams: string,
};

Footer.defaultProps = {
  queryParams: "",
};

export default Footer;
