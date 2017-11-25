import React from 'react';
import { instanceOf, func } from 'prop-types';
import Immutable from 'immutable';
import HTMLTextSnippet from '../common/HTMLTextSnippet';

const Texts = ({texts, removeText}) =>
  (
    <ul>
      {texts.map((text, key) => {
        return (
          <li key={key}>
            <div className="text-header">
              <h2>{text.get('title')}</h2>
              <button onClick={() => removeText(text.get('id'))}>Remove Text</button>
            </div>
            <HTMLTextSnippet text={text.get('text')} length={100} />
          </li>
        );
      })}
    </ul>
  );

Texts.propTypes = {
  texts: instanceOf(Immutable.List).isRequired,
  removeText: func.isRequired,
};

export default Texts;
