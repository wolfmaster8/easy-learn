import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as pages from './pages';

const Routes = () => (
  <Fragment>
    <Switch>
      <Router exact path="/" component={pages.Usuarios} />
      <Redirect to="/"/>
    </Switch>
  </Fragment>
);

export default Routes;