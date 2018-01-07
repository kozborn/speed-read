import React from "react";
import { instanceOf, node } from "prop-types";
import Immutable from "immutable";
import HalfText from "./HalfText";
import HelpPortal from "./common/HelpPortal"

const TopHalfWord = (props) => {
  return <span>{props.children}<span className="top-half-text" /></span>;
};

TopHalfWord.propTypes = {
  children: node.isRequired,
};

const TopHalfText = ({ text }) =>
  (
    <div>
      <h1 className="with-help">Górna połowa tekstu <HelpPortal helpKey="top-half-text" /></h1>
      <HalfText
        text={text}
        handlerComponent={TopHalfWord}
        className="top-half-text"
      />
    </div>
  );

TopHalfText.propTypes = {
  text: instanceOf(Immutable.Map).isRequired,
};

export default TopHalfText;
