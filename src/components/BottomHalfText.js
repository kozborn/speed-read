import React from "react";
import Immutable from "immutable";
import { instanceOf, node} from "prop-types";
import HalfText from "./HalfText";
import HelpPortal from "./common/HelpPortal"

const BottomHalfWord = (props) => {
  return <span>{props.children}<span className="bottom-half-text" /></span>;
};

BottomHalfWord.propTypes = {
  children: node.isRequired,
};

const BottomHalfText = ({ text }) =>
  (
    <div>
      <h1>Dolna połowa tekstu <HelpPortal helpKey="bottom-half-text" /></h1>
      <HalfText
        text={text}
        handlerComponent={BottomHalfWord}
        className="bottom-half-text"
      />
    </div>
  );

BottomHalfText.propTypes = {
  text: instanceOf(Immutable.Map).isRequired,
};

export default BottomHalfText;
