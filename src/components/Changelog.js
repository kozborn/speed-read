import React from 'react';
import { instanceOf, func } from 'prop-types';
import Immutable from 'immutable';
import ChangelogEntry from './changelog/ChangelogEntry'

const Changelog = ({ changelog, update }) => {
  return (
    <div className="changelog">
      {changelog.map((entry) => {
        return (
          <ChangelogEntry
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
  update: func.isRequired,
  changelog: instanceOf(Immutable.List).isRequired,
}

export default Changelog;
