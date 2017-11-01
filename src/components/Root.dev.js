import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./home/index";
import Room from "./room/index";
import RoomAdmin from "./room/indexAdmin";

const Root = ({ store }) => (
  <Provider store={store}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/roomgm/:name" component={RoomAdmin} />
      <Route path="/room/:name" component={Room} />
    </Switch>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
