import React from "react";
import { object } from "prop-types";
import { matchPath } from "react-router-dom";
import camelize from "underscore.string/camelize";
import TextListToChoose from "../../connectors/TextListToChoose";

const pageWithSidebar = (location) => {
  const key = camelize(location);
  return (["fixations", "bottomHalfText", "topHalfText"].indexOf(key) !== -1);
};

const Sidebar = ({ history }) => {
  const location = matchPath(history.location.pathname, {
    // You can share this string as a constant if you want
    path: "/:module/:userId",
  });
  if (location && location.params) {
    if (pageWithSidebar(location.params.module)) {
      const key = camelize(location.params.module);
      return (
        <div className="sidebar">
          <TextListToChoose textKey={key} />
        </div>
      );
    }
  }
  return null;
};

Sidebar.propTypes = {
  history: object.isRequired,
};

export default Sidebar;
