import React from "react";
import { instanceOf, node } from "prop-types";
import { Map } from "immutable";
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
      <h1>Top half Text <HelpPortal /></h1>
      <HalfText
        text={text}
        handlerComponent={TopHalfWord}
        className="top-half-text"
      />
    </div>
  );

TopHalfText.propTypes = {
  text: instanceOf(Map).isRequired,
};

export default TopHalfText;
