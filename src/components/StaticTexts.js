import React from 'react'
import Immutable from 'immutable'
import StaticText from './static-texts/StaticText'

class StaticTexts extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
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
