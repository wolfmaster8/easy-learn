import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as pages from './pages';
import axios from 'axios';
import SubActividadAdd from "./pages/SubActividadAdd";

class Routes extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }


    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={pages.Demo}/>
                    <Route exact path="/usuarios" component={pages.Usuarios}/>
                    <Route path="/usuario/:id/asignar/cursos" component={pages.AsignarCursos}/>
                    <Route exact path="/cursos" component={(props) => (
                        <pages.Cursos timestamp={new Date().toString()} {...props}/>
                    )}/>
                    <Route path="/cursos/new" component={pages.CursoAdd}/>
                    <Route exact path="/cursos/:id/actividades/new" component={(props) => (
                        <pages.ActividadAdd timestamp={new Date().toString()} {...props}/>
                    )}/>
                    <Route path="/ver/curso/:id" component={pages.CursoVer}/>

                    {/* <Route exact path="/cursos/:id/actividades" component={pages.ActividadAdd}/> */}
                    <Route path="/curso/:curso/actividad/:act/subactividad/new" component={(props) => (
                        <pages.SubActividadAdd timestamp={new Date().toString()} {...props}/>
                    )}/>
                    <Route path="/cursos/usuario/:id" component={pages.CursoUsuario}/>

                    {/* Asociaciones */}
                    <Route path="/inscribir/curso/:id" component={pages.UsuarioCursoAdd}/>

                    <Redirect to="/"/>
                </Switch>
            </Fragment>
        )
    }

}
export default Routes;