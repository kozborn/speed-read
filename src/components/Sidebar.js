import React from 'react';
import cn from 'classnames';
import { string, func, bool } from 'prop-types';

class Sidebar extends React.Component {

  static propTypes = {
    renderMode: string.isRequired,
    onToggle: func.isRequired,
    expanded: bool.isRequired,
  }

  render() {
    const sidebarClasses = cn('sidebar', {
      'expanded': this.props.expanded,
      'collapsed': !this.props.expanded,
    });
    return (
      <div className={sidebarClasses}>
        <nav className="sidebar__navigation">
          <li>Dupa jasia</li>
          <li>Dupa jasia</li>
          <li>Dupa jasia</li>
          <li>Dupa jasia</li>
          <li>Dupa jasia</li>
          <li>Dupa jasia</li>
          <li>Dupa jasia</li>
          <li>
            Dupa Jasia
            <nav>
              <li>Nested dupa jasia</li>
              <li>Nested dupa jasia</li>
              <li>Nested dupa jasia</li>
              <li>Nested dupa jasia</li>
              <li>Nested dupa jasia</li>
              <li>Nested dupa jasia</li>
            </nav>
          </li>
        </nav>
        <button onClick={this.props.onToggle}>expand</button>
      </div>
    )
  }
}

export default Sidebar;
