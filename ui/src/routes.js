import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as pages from './pages';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path="/usuarios" component={pages.Usuarios} />
      <Redirect to="/"/>
    </Switch>
  </Fragment>
);

export default Routes;