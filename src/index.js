// Certain things in ES6 require the polyfill. If size is a concern you can
// specify the specific components you would need if you dont want the whole
// 50k library
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";
import { Router, browserHistory } from "react-router";
import routes from "./routes";
import {loadCourses} from "./actions/courseActions"; // Named import
import {loadAuthors} from "./actions/authorActions"; // Named import
import "./styles/styles.css"; // Webpack can import CSS files too!
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/toastr/build/toastr.min.css'; // For notifications

// Could pass data in here for initial state for server rendering and
// other things
const store = configureStore();
// index.js is the entry point and hence suitable for loading initial data
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
