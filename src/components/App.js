import React, { Component } from "react";
import { withRouter } from "react-router";
import { matchPath } from "react-router-dom";
import Immutable from 'immutable';
import { bool, object, node, instanceOf, func } from "prop-types";
import Header from '../connectors/Header';
import Spinner from './common/Spinner';
import Modal from './common/Modal';
import Footer from "../connectors/Footer";
import Sidebar from "./sidebar/Sidebar";

class App extends Component {

  static propTypes = {
    isFetching: bool.isRequired,
    history: object.isRequired,
    children: node.isRequired,
    notification: instanceOf(Immutable.Map).isRequired,
    closeNotification: func.isRequired,
    fetchUserDoc: func.isRequired,
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

  render() {
    const { history, isFetching, children, notification, closeNotification} = this.props;

    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <div className="page-content">
            {isFetching ? <Spinner /> : children}
          </div>
          <Sidebar history={history} />
        </div>
        <Footer />
        
        <Modal
          isOpen={!notification.isEmpty()}
          overlay
          title={notification.get('title', "")}
          position="center"
          closeBtn
          onClose={closeNotification}
        >
          <div className="notification">
            {notification.get('message', '')}
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(App);
