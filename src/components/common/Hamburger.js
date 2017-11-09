import React from "react";
import {func, string} from "prop-types";

const Hamburger = props =>
  (<button
    className={["hamburger-menu-btn", props.className].join(" ")}
    onClick={props.onClick}
  >
    <span>
      <span className={'hamburgerIconBar'} />
      <span className={'hamburgerIconBar'} />
      <span className={'hamburgerIconBar'} />
    </span>
  </button>);

Hamburger.propTypes = {
  onClick: func.isRequired,
  className: string,
};

Hamburger.defaultProps = {
  className: "",
};

export default Hamburger;
