import React from 'react';
import { Link, matchPath } from 'react-router-dom';
import { string } from 'prop-types';
import cn from 'classnames';
import Hamburger from './common/Hamburger';
import logo from "../assets/logo.svg";

class Header extends React.Component {

  static propTypes = {
    docId: string.isRequired,
  }

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
    // const userId = match && match.params && match.params.userId ? match.params.userId : "";
    const { docId } = this.props;
    return (
      <nav className={cn({'hamburger-menu': hamburger, 'navigation-top': !hamburger})}>
        <li><Link to={`/home/${docId}`}>Home page</Link></li>
        <li><Link to={`/bottom-half-text/${docId}`}>Dolna połowa tekstu</Link></li>
        <li><Link to={`/top-half-text/${docId}`}>Górna połowa tekstu</Link></li>
        <li><Link to={`/schultz-table/${docId}`}>Tabela Schultz'a</Link></li>
        <li><Link to={`/fixations/${docId}`}>Fiksacja</Link></li>
        <li><Link to={`/user-texts/${docId}`}>Twoje teksty</Link></li>
        <li>
          {hamburger ?
            <Link className="settings" to={`/settings${docId}`}>
              Settings &#9881;
            </Link>
          :
            <Link className="settings" to={`/settings${docId}`}>
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

export default Header;
