import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePane from "./components/homepane/HomePane";
import ProposePane from "./components/proposepane/ProposePane";
import ApprovePane from "./components/approvepane/ApprovePane";
import AccountsPane from "./components/accountspane/AccountsPane";
import AdminPane from "./components/adminpane/AdminPane";

export default () =>
  <Switch>
    <Route path="/" exact component={HomePane} />
    <Route path="/propose" exact component={ProposePane} />
    <Route path="/approve" exact component={ApprovePane} />
    <Route path="/accounts" exact component={AccountsPane} />
    <Route path="/admin" exact component={AdminPane } />
  </Switch>;