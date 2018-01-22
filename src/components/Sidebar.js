import React from 'react';
import { string, func, bool } from 'prop-types';

class Sidebar extends React.Component {

  static propTypes = {
    renderMode: string.isRequired,
    onToggle: func.isRequired,
    expanded: bool.isRequired,
  }

  render() {
    return (
      <div className="sidebar">
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
        <button>expand</button>
      </div>
    )
  }
}

export default Sidebar;
