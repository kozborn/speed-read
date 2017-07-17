import React from "react";
import queryString from "query-string";

export default WrappedComponent =>
  class extends React.Component {
    render() {
      let queryParams = "";
      const parsed = queryString.parse(window.location.search);
      const documentId = parsed.documentId;
      if (documentId) {
        queryParams = `?documentId=${documentId}`;
      }
      return <WrappedComponent {...this.props} documentId={documentId} queryParams={queryParams} />;
    }
  };
