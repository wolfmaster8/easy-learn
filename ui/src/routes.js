import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as pages from './pages';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={pages.Demo}/>
      <Route path="/usuarios" component={pages.Usuarios}/>
      <Route path="/usuario/:id/asignar/cursos" component={pages.AsignarCursos}/>
      <Route exact path="/cursos" component={pages.Cursos}/>
      <Route path="/cursos/new" component={pages.CursoAdd}/>
      <Route path="/cursos/usuario/:id" component={pages.CursoUsuario}/>
      <Redirect to="/"/>
    </Switch>
  </Fragment>
);

export default Routes;