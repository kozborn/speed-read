import React from 'react';
import { Link, matchPath } from 'react-router-dom';
import { string } from 'prop-types';
import cn from 'classnames';
import Hamburger from './common/Hamburger';
import logo from "../assets/logo.svg";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hamburgerExpanded: false,
    };

    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
  }

  toggleHamburgerMenu() {
    this.setState({hamburgerExpanded: !this.state.hamburgerExpanded});
  }

  renderMenu(hamburger = false) {
    // https://stackoverflow.com/a/45492498/1783152
    const match = matchPath(this.props.history.location.pathname, {
      // You can share this string as a constant if you want
      path: "/:module/:userId",
    });

    const userId = match && match.params && match.params.userId ? match.params.userId : "";

    return (
      <nav className={cn({'hamburger-menu': hamburger, 'navigation-top': !hamburger})}>
        <li><Link to={`/${userId}`}>Home page</Link></li>
        <li><Link to={`/bottom-half-text/${userId}`}>Dolna połowa tekstu</Link></li>
        <li><Link to={`/top-half-text/${userId}`}>Górna połowa tekstu</Link></li>
        <li><Link to={`/schultz-table/${userId}`}>Tabela Schultz'a</Link></li>
        <li><Link to={`/fixations/${userId}`}>Fiksacja</Link></li>
        <li><Link to={`/user-texts/${userId}`}>Twoje teksty</Link></li>
        <li>
          {hamburger ?
            <Link className="settings" to={`/settings${userId}`}>
              Settings &#9881;
            </Link>
          :
            <Link className="settings" to={`/settings${userId}`}>
              &#9881;
            </Link>
          }
        </li>
      </nav>
    );
  }

  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        {this.renderMenu()}
        <Hamburger
          className={'hamburger'}
          onClick={this.toggleHamburgerMenu}
        />
        {this.state.hamburgerExpanded && this.renderMenu(true)}
      </header>
    );
  }
}

Header.propTypes = {
  queryParams: string.isRequired,
};

export default Header;
