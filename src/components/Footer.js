import React from "react";
import { Link } from "react-router-dom";
import { string } from "prop-types";

const Footer = ({ userId }) =>
(
  <div className="footer">
    <footer>
      <nav className="navigation-footer">
        <li><Link to={`/home/${userId}`}>Strona główna</Link></li>
        <li><Link to={`/bottom-half-text/${userId}`}>Dolna połowa tekstu</Link></li>
        <li><Link to={`/top-half-text/${userId}`}>Górna połowa tekstu</Link></li>
        <li><Link to={`/schultz-table/${userId}`}>Tabela Schultz'a</Link></li>
        <li><Link to={`/fixations/${userId}`}>Fiksacja</Link></li>
        <li><Link to={`/user-texts/${userId}`}>Twoje teksty</Link></li>
        <li><Link to={`/changelog`}>Changelog</Link></li>
        <li>
          <Link className="settings" to={`/settings/${userId}`}>
            Settings &#9881;
          </Link>
        </li>
      </nav>
      <div className="copyrights">
        © Copyright by piotrkozubek@gmail.com {new Date().getFullYear()}
      </div>
    </footer>
  </div>
);

Footer.propTypes = {
  userId: string,
};

Footer.defaultProps = {
  userId: "",
};

export default Footer;
