import React from 'react';
import { instanceOf, func, bool } from 'prop-types';
import Immutable from 'immutable';
import ChangelogEntry from './changelog/ChangelogEntry'

const Changelog = ({ changelog, update, isLogged }) => {
  return (
    <div className="changelog-texts">
      {changelog.map((entry) => {
        return (
          <ChangelogEntry
            isLogged={isLogged}
            key={entry.get('id')}
            entry={entry}
            update={update}
          />
        )
      })}
    </div>
  )
}

Changelog.propTypes = {
  isLogged: bool.isRequired,
  update: func.isRequired,
  changelog: instanceOf(Immutable.List).isRequired,
}

export default Changelog;
