import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import Signup from "./Components/Signup";
import About from "./Components/About";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/user" component={UserProfile} />
    <Route path="/signup" component={Signup} />
    <Route path="/about" component={About} />
  </Switch>
);
