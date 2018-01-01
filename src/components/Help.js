import React from 'react';
import { instanceOf } from 'prop-types'
import Immutable from 'immutable'
import DraftEditor from './common/Editor'

const Help = ({
  helpContent,
}) => {
  return (
    <div>
      <h2>{helpContent.get('title')}</h2>
      <DraftEditor readOnly initialText={helpContent.get('text', '')} />
    </div>
  )
}

Help.propTypes = {
  helpContent: instanceOf(Immutable.Map).isRequired,
}

Help.defaultProps = {
  isLogged: false,
}

export default Help;
