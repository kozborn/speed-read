import React from 'react';
import { instanceOf } from 'prop-types';
import Immutable from 'immutable';
import HTMLTextSnippet from '../common/HTMLTextSnippet';

const Texts = ({texts}) =>
  (
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
  );

Texts.propTypes = {
  texts: instanceOf(Immutable.List).isRequired,
};

export default Texts;
