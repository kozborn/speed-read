import React from 'react'
import Immutable from 'immutable'
import { instanceOf, func, bool } from 'prop-types';
import HelpEntry from './help/HelpEntry'

const HelpPage = ({helpDoc, isLogged, update}) => {
  return (
    <div className="help-texts">
      {helpDoc.map((help) => {
        if (Immutable.Map.isMap(help)) {
          return (
            <HelpEntry
              key={help.get('id')}
              update={update}
              isLogged={isLogged}
              entry={help}
            />
          )
        }
        return null;
      }).toList()}
    </div>
  )
}

HelpPage.propTypes = {
  helpDoc: instanceOf(Immutable.Map).isRequired,
  isLogged: bool.isRequired,
  update: func.isRequired,
}

export default HelpPage;
