import React from "react";
import { instanceOf, node } from "prop-types";
import { Map } from "immutable";
import HalfText from "./HalfText";

const TopHalfWord = (props) => {
  return <span>{props.children}<span className="top-half-text" /></span>;
};

TopHalfWord.propTypes = {
  children: node.isRequired,
};

const TopHalfText = ({ text }) =>
  (<HalfText
    text={text}
    handlerComponent={TopHalfWord}
    pageTitle="Top half Text"
    className="top-half-text"
  />);

TopHalfText.propTypes = {
  text: instanceOf(Map).isRequired,
};

export default TopHalfText;
