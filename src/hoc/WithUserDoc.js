import React from "react";

export default WrappedComponent =>
  class extends React.Component {

    componentDidMount() {
      const userId = this.props.match.params.userId;
      if (userId && userId !== this.props.userDoc.get('id')) {
        this.props.getUserDoc(userId);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
