import React from 'react'
import Immutable from 'immutable'
import { func, bool, instanceOf } from 'prop-types';
import StaticText from './static-texts/StaticText'

class StaticTexts extends React.Component {

  static propTypes = {
    isLogged: bool.isRequired,
    saveDoc: func.isRequired,
    defaultDoc: instanceOf(Immutable.Map).isRequired,
  }

  render() {
    if (!this.props.isLogged) {
      return "Not found";
    }
    return (
      <div>
        <h2>Static texts</h2>
        <ul className="default-texts">
          {this.props.defaultDoc.map((text, key) => {
            if (!Immutable.Map.isMap(text)) return null
            if (!text.has('text')) return null
            return (
              <li key={key}>
                <StaticText
                  id={key}
                  save={this.props.saveDoc}
                  title={text.get('title')}
                  text={text.get('text')}
                />
              </li>
            );
          }).toList()}
        </ul>
      </div>
    )
  }
}

export default StaticTexts;
