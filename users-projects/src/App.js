import React from "react";

import { withRouter, Route, Switch } from "react-router-dom";

import { Search } from "./pages/Search";
import { Auth } from "./pages/Auth";

import { connect } from "react-redux";
import { getAuthStatus } from "./redux/auth";
import { Details } from "./pages/Details";
import { ProjectCard } from "./pages/ProjectCard";

function App(props) {
  let route = (
    <Switch>
      <Route exact path="/" component={Auth} />
    </Switch>
  );
  if (!!props.status) {
    route = (
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/details/:userNumber" component={Details} />
        <Route path="/project/:id" component={ProjectCard}/>
      </Switch>
    );
  }

  return <div>{route}</div>;
}
const mapStateToProps = (state) => ({
  status: getAuthStatus(state),
});

export default withRouter(connect(mapStateToProps)(App));
