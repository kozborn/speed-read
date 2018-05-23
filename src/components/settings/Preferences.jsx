import React from 'react';
import Immutable from 'immutable';
import { instanceOf } from 'prop-types';
import DraftEditor from '../common/Editor';
import { getDraftTextSnippet } from '../../utils/editor_helpers';

const printMap = (map) => {
  return map.map((value, key) => {
    const preferenceValue = Immutable.Map.isMap(value) ? printMap(value) : value;
    return (
      <div className="preference" key={key}>
        <div className="preference__key" key={key}>{key}</div>
        <div className="preference__value">{preferenceValue}</div>
      </div>
    );
  }).toList();
};

class Preferences extends React.Component {
  static propTypes = {
    userDoc: instanceOf(Immutable.Map).isRequired,
  }

  render() {
    const {userDoc} = this.props;
    return (
      <div>
        <div className="settings__label">
          Informacje o dokumencie:
        </div>
        <div className="document-settings">
          <div className="document-settings__title">ID:</div>
          <div className="document-settings__value">{userDoc.get('id')}</div>
        </div>
        <div className="settings__label">Twoje teksty:</div>
        <div>
          {userDoc.getIn(['doc', 'texts'], Immutable.Map()).map((text) => {
            return (
              <div className="texts" key={text.get('id')}>
                <div className="texts__title">{text.get('title')}</div>
                <div className="texts__draft">
                  <DraftEditor readOnly initialText={getDraftTextSnippet(text.get('text'))} />
                </div>
              </div>
            );
          }).toList()}
        </div>
        <div className="settings__label">Ustawienia:</div>
        <div>
          {printMap(userDoc.getIn(['doc', 'preferences'], Immutable.Map()))}
        </div>
      </div>
    );
  }
}

export default Preferences;
