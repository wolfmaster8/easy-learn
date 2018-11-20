import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as pages from './pages';
import SubActividadAdd from "./pages/SubActividadAdd";

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={pages.Demo}/>
      <Route exact path="/usuarios" component={pages.Usuarios}/>
      <Route path="/usuario/:id/asignar/cursos" component={pages.AsignarCursos}/>
      <Route exact path="/cursos" component={(props)=>(
        <pages.Cursos timestamp={new Date().toString()} {...props}/>
      )}/>
      <Route path="/cursos/new" component={pages.CursoAdd}/>
      <Route exact path="/cursos/:id/actividades/new" component={(props)=>(
        <pages.ActividadAdd timestamp={new Date().toString()} {...props}/>
      )}/>
      <Route path="/ver/curso/:id" component={pages.CursoVer}/>

      {/* <Route exact path="/cursos/:id/actividades" component={pages.ActividadAdd}/> */}
      <Route path="/curso/:curso/actividad/:act/subactividad/new" component={(props)=>(
        <pages.SubActividadAdd timestamp={new Date().toString()} {...props}/>
      )}/>
      <Route path="/cursos/usuario/:id" component={pages.CursoUsuario}/>
      <Redirect to="/"/>
    </Switch>
  </Fragment>
);

export default Routes;