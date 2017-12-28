import React from 'react';
import { instanceOf } from 'prop-types';
import Immutable from 'immutable';

const Changelog = ({ changelog }) => {
  return (
    <div className="changelog">
      <h2>Changelog:</h2>
    </div>
  )
}

Changelog.propTypes = {
  changelog: instanceOf(Immutable.List).isRequired,
}

export default Changelog;
