import React from 'react';
import cn from 'classnames';
import { func, bool } from 'prop-types';

class Sidebar extends React.Component {

  static propTypes = {
    onToggle: func.isRequired,
    expanded: bool.isRequired,
  }

  render() {
    const sidebarClasses = cn('sidebar', {
      'expanded': this.props.expanded,
      'collapsed': !this.props.expanded,
    });

    const btnClasses = cn('btn', 'white', 'fa', 'sidebar__button', 'fa-chevron-circle-left',
    'sidebar__button-transition', {
      'sidebar__button--expanded': this.props.expanded,
      'sidebar__button--collapsed': !this.props.expanded,
    });

    return (
      <div className={sidebarClasses}>
        <nav className="sidebar__navigation">
          <li>Dupa jasia</li>
          <li>
            Dupa Jasia
            <nav>
              <li>Nested dupa jasia</li>
            </nav>
          </li>
        </nav>
        <button className={btnClasses} onClick={this.props.onToggle} />
      </div>
    )
  }
}

export default Sidebar;
