import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import "./assets/index.css";
import "./styles/index.css";
import App from "./components/App";
import HomePage from "./connectors/HomePage";
import BottomHalfText from "./components/BottomHalfText";
import TopHalfText from "./components/TopHalfText";
import TableWithSliders from "./components/TableWithSliders";
import FixationsWithSliders from "./components/FixationsWithSliders";
import NewFixationsText from "./components/NewFixationsText";
import UrlParamsProvider from "./hoc/UrlProvider";
import registerServiceWorker from "./registerServiceWorker";

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

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App>
          <Route exact path="/" component={UrlParamsProvider(HomePage)} />
          <Route path="/fixations" component={UrlParamsProvider(FixationsWithSliders)} />
          <Route path="/top-half-text" component={UrlParamsProvider(TopHalfText)} />
          <Route path="/bottom-half-text" component={UrlParamsProvider(BottomHalfText)} />
          <Route path="/schultz-table" component={UrlParamsProvider(TableWithSliders)} />
          <Route path="/create-own-text" component={UrlParamsProvider(NewFixationsText)} />
        </App>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root"),
);

// ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
