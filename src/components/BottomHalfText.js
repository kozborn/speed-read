import React from "react";
import Immutable from "immutable";
import { instanceOf, node} from "prop-types";
import HalfText from "./HalfText";

const BottomHalfWord = (props) => {
  return <span>{props.children}<span className="bottom-half-text" /></span>;
};

BottomHalfWord.propTypes = {
  children: node.isRequired,
};

const BottomHalfText = ({ text }) =>
  (<HalfText
    text={text}
    handlerComponent={BottomHalfWord}
    pageTitle="Bottom half Text"
    className="bottom-half-text"
  />);

BottomHalfText.propTypes = {
  text: instanceOf(Immutable.Map).isRequired,
};

export default BottomHalfText;
