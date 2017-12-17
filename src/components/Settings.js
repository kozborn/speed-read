import React from 'react';
import Immutable from 'immutable';
import { instanceOf, func } from 'prop-types';
import Preferences from './settings/Preferences';

class Settings extends React.Component {
  static propTypes = {
    userDoc: instanceOf(Immutable.Map).isRequired,
    createNewUserDoc: func.isRequired,
  }

  render() {
    const { userDoc, createNewUserDoc } = this.props;

    return (
      <div>
        {(userDoc.get('id')) ?
          <Preferences userDoc={userDoc} />
        :
          <div>
            <h2>Nie masz utworzonego dokumentu użytkownika</h2>
            <h3>
              Jeśli chcesz go utworzyć teraz kliknij przycisk
              <button onClick={createNewUserDoc}>Utwórz mój dokument</button>
            </h3>
          </div>
        }
      </div>
    );
  }
}

export default Settings;
