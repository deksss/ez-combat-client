import React from "react";
import { Route } from 'react-router-dom';
import App from "./containers/App";
import Room from "./containers/Room";
import RoomAdmin from "./containers/RoomAdmin";

export default (
  <Route>
    <Route path="/" component={App} />
    <Route path="/admin/:name" component={RoomAdmin} />
    <Route path="/:name" component={Room} />
  </Route>
);
