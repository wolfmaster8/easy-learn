import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as pages from './pages';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={pages.Demo}/>
      <Route exact path="/usuarios" component={pages.Usuarios}/>
      <Route path="/usuario/:id/asignar/cursos" component={pages.AsignarCursos}/>
      <Route exact path="/cursos" component={pages.Cursos}/>
      <Route path="/cursos/new" component={pages.CursoAdd}/>
      <Route path="/cursos/:id/actividades/new" component={pages.ActividadAdd}/>
      {/* <Route exact path="/cursos/:id/actividades" component={pages.ActividadAdd}/> */}
      <Route exact path="/curso/:curso/actividad/:act/subactividad/new" component={pages.ActividadAdd}/>
      <Route path="/cursos/usuario/:id" component={pages.CursoUsuario}/>
      <Redirect to="/"/>
    </Switch>
  </Fragment>
);

export default Routes;