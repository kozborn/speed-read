import React, { Component } from "react";
import camelize from "underscore.string/camelize";
import { withRouter } from "react-router";
import { matchPath } from "react-router-dom";
import Immutable from 'immutable';
import { bool, object, node, instanceOf, func } from "prop-types";
import Header from '../connectors/Header';
import Spinner from './common/Spinner';
import Modal from './common/Modal';
import Footer from "../connectors/Footer";
import TextListToChoose from "../connectors/TextListToChoose";

const pageWithSidebar = (location) => {
  const key = camelize(location);
  return (["fixations", "bottomHalfText", "topHalfText"].indexOf(key) !== -1);
};

class App extends Component {

  static propTypes = {
    isFetching: bool.isRequired,
    history: object.isRequired,
    children: node.isRequired,
    notification: instanceOf(Immutable.Map).isRequired,
    closeNotification: func.isRequired,
    fetchUserDoc: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
    };
    this.closeNotification = this.closeNotification.bind(this);
    this.getSidebar = this.getSidebar.bind(this);
  }

  componentDidMount() {
    // https://stackoverflow.com/a/45492498/1783152
    const match = matchPath(this.props.history.location.pathname, {
      // You can share this string as a constant if you want
      path: "/:module/:userId",
    });

    if (match && match.params.userId) {
      this.props.fetchUserDoc(match.params.userId);
    }
  }

  getSidebar() {
    const location = matchPath(this.props.history.location.pathname, {
      // You can share this string as a constant if you want
      path: "/:module/:userId",
    });
    if (location && location.params) {
      if (pageWithSidebar(location.params.module)) {
        const key = camelize(location.params.module);
        return (<div className="sidebar">
          <TextListToChoose textKey={key} />
        </div>);
      }
    } else {
      return null;
    }
  }

  closeNotification() {
    this.props.closeNotification();
  }

  render() {
    const {isFetching, children} = this.props;

    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <div className="page-content">
            {isFetching ? <Spinner /> : children}
          </div>
          {
            // TODO MAKE THIS AS COMPONENT
          }
          {this.getSidebar()}
        </div>
        <Footer />
        <Modal
          isOpen={!this.props.notification.isEmpty()}
          overlay
          title={this.props.notification.get('title', "")}
          position="center"
          closeBtn
          onClose={this.closeNotification}
        >
          <div className="notification">
            {this.props.notification.get('message', '')}
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(App);
