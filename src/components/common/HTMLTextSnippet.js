import React from 'react';
import { string, number } from 'prop-types';

// TODO create this method so it can consider also text with HTML
const createMarkup = (text, length) => {
  return {
    __html: text.slice(0, length),
  };
};

const HTMLTextSnippet = ({ text, length}) =>
  <div className="text-snippet" dangerouslySetInnerHTML={createMarkup(text, length)} />

HTMLTextSnippet.propTypes = {
  text: string.isRequired,
  length: number,
};

HTMLTextSnippet.defaultProps = {
  length: 200,
};

export default HTMLTextSnippet;
