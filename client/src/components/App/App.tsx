import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "../../pages/Home";
import { Layout } from "../Layout";
import { ModalManager } from "../ModalManager";
import { useDispatch } from "react-redux";
import { meAction } from "../../redux/auth/actions";
import { useTypedSelector } from "../../redux/hooks";
import { Loading } from "../Loading";
import { CreatePost } from "../../pages/CreatePost";

export const App = () => {
  const dispatch = useDispatch();

  const didRequest = useTypedSelector((state) => state.auth.didRequest);

  useEffect(() => {
    dispatch(meAction());
  }, [dispatch]);

  if (!didRequest) {
    return <Loading />;
  }

  return (
    <Router>
      <Layout>
        <ModalManager />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/create">
            <CreatePost />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
