import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "../../pages/Home";
import { Layout } from "../Layout";
import { ModalManager } from "../ModalManager";

export const App = () => {
  return (
    <Router>
      <Layout>
        <ModalManager />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
