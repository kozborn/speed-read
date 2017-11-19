import React from 'react';
import { instanceOf, func } from 'prop-types';
import Immutable from 'immutable';
import HTMLTextSnippet from '../common/HTMLTextSnippet';

const Texts = ({texts}) => {
  return (
    <div>
      <h2>User texts</h2>
      <ul>
        {texts.map((text, key) => {
          return (
            <li key={key}>
              <h2>{text.get('title')}</h2>
              <HTMLTextSnippet text={text.get('text')} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Texts.propTypes = {
  texts: instanceOf(Immutable.List).isRequired,
};

export default Texts;
