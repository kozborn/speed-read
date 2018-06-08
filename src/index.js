import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import 'font-awesome/css/font-awesome.css'
import "../node_modules/draft-js/dist/Draft.css";
import "./styles/index.css";


import reducer from "./reducer";
import App from "./connectors/App";
import BottomHalfText from "./connectors/BottomHalfText";
import Changelog from "./connectors/Changelog";
import HomePage from "./connectors/HomePage";
import HelpPage from "./connectors/HelpPage";
import TopHalfText from "./connectors/TopHalfText";
import TableWithSliders from "./connectors/Table";
import Fixations from "./connectors/Fixations";
import UserTexts from "./connectors/UserTexts";
import NewText from "./connectors/NewText";
import EditText from "./connectors/EditText";
import Settings from "./connectors/Settings";
import StaticTexts from './connectors/StaticTexts';
import registerServiceWorker from "./registerServiceWorker";
import { getDefaultDoc, checkIfUserLogged, logIn } from "./actions/app-actions";

const history = createBrowserHistory();

function logger({ getState }) {
  return next => (action) => {
    console.log("will dispatch", action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log("state after dispatch", getState().toJS());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
store.dispatch(getDefaultDoc());
store.dispatch(logIn('piotrek2', 'sedes'));
// store.dispatch(checkIfUserLogged())
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Route exact path="/" component={HomePage} />
        <Route path="/home/:userId?" component={HomePage} />
        <Route path="/fixations/:userId?" component={Fixations} />
        <Route path="/top-half-text/:userId?" component={TopHalfText} />
        <Route path="/bottom-half-text/:userId?" component={BottomHalfText} />
        <Route path="/schultz-table/:userId?" component={TableWithSliders} />
        <Route path="/new-text/:userId?" component={NewText} />
        <Route path="/user-texts/:userId?" component={UserTexts} />
        <Route path="/settings/:userId?" component={Settings} />
        <Route path="/edit-text/:userId/:textId" component={EditText} />
        <Route path="/help" component={HelpPage} />
        <Route path="/static-texts/" component={StaticTexts} />
        <Route path="/changelog" component={Changelog} />
      </App>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
