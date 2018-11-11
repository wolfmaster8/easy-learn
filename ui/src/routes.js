import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as pages from './pages';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={pages.Demo}/>
      <Route path="/usuarios" component={pages.Usuarios}/>
      <Route path="/cursos" component={pages.Cursos}/>
      <Redirect to="/"/>
    </Switch>
  </Fragment>
);

export default Routes;