import React from "react";
import { Route } from "react-router";
import App from "./containers/App";
import Room from "./containers/Room";
import RoomAdmin from "./containers/RoomAdmin";

export default (
  <Route>
    <Route path="/" component={App} />
    <Route path="/room/admin" component={RoomAdmin} />
    <Route path="/room" component={Room} />
  </Route>
);
