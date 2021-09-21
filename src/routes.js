import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import Signup from "./Components/Signup";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/user" component={UserProfile} />
    <Route path="/signup" component={Signup} />
  </Switch>
);
