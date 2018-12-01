import React, {Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../services/api';
import {
    Layout,
    Card,
    Row,
    Col,
    Form,
    Divider,
    Progress,
    Tooltip,
    Button,
    Skeleton,
    Breadcrumb,
    Steps,
    Input, Icon,
    Menu
} from "antd";
import SpinGral from "../components/SpinGral";
import ActividadAddForm from "../components/forms/ActividadAddForm";
import SidebarActividad from "../containers/SidebarActividad";
import SidebarSubActividad from "../containers/SidebarSubActividad";
import SubActividadAddForm from "../components/forms/SubActividadAddForm";
import Badge from "antd/es/badge";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const {TextArea} = Input;

const Step = Steps.Step;

export default class SubActividadAdd extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.curso;
        this.act = props.match.params.act;
        this.state = {
            infoCurso: {},
            actividades: [],
            subactividades: [],
            infoActividad: [],
            puntosMaximosSub: 10,
            loading: true
        }
    }

    async componentDidMount() {
        const idCurso = this.id;
        const idAct = this.act;
        const response = await api.get(`/curso/${idCurso}`);
        const actividades = await api.get(`/curso/${idCurso}/actividades`);
        const subactividades = await api.get(`/curso/${idCurso}/actividad/${idAct}/subactividades/`);
        const puntosActividad = await api.get(`/curso/${idCurso}/actividad/${idAct}`);


        this.setState({
            infoCurso: response.data[0],
            actividades: actividades.data,
            subactividades: subactividades.data,
            infoActividad: puntosActividad.data[0],
            loading: false
        });

        this.getPuntaje()

        // console.log(this.state.subactividades);

    }

    getPuntaje = () => {
        const {subactividades} = this.state;
        let puntajeTotal = 0;
        subactividades.map(sub => (
            puntajeTotal = puntajeTotal + sub.puntaje
        ));
        this.setState({puntosMaximosSub: puntajeTotal})
    };


    render() {
        const {infoCurso, actividades, subactividades, infoActividad, puntosMaximosSub, loading} = this.state;
        return (
            <Layout>
                <SidebarActividad curso={infoCurso} actividades={actividades}/>
                <SidebarSubActividad curso={infoCurso} subactividades={subactividades}/>
                {loading ? <SpinGral text="Subactividades"/>
                    : (
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 680}}>
                            <Row gutter={16}>
                                <Col span={18}>
                                    <Breadcrumb style={{margin: '16px 0'}}>
                                        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                                        <Breadcrumb.Item>Administrador</Breadcrumb.Item>
                                        <Breadcrumb.Item><Link to="/cursos">Cursos</Link></Breadcrumb.Item>
                                        {/*<Breadcrumb.Item>{infoCurso.titulo}</Breadcrumb.Item>*/}
                                        <Breadcrumb.Item><Link to="/cursos">Actividades</Link></Breadcrumb.Item>
                                        <Breadcrumb.Item><Link to="/cursos">Nueva Subactividad</Link></Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                                <Col span={6}>
                                    <Badge count={`Puntos: ${puntosMaximosSub}/${infoActividad.puntos}`}
                                           style={{backgroundColor: "#3BAC53", float: 'right'}}/>
                                </Col>


                            </Row>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <SubActividadAddForm curso={this.id} actividad={this.act}
                                                         puntosMaximos={infoActividad.puntos - puntosMaximosSub}/>
                                </Col>

                            </Row>
                        </Content>)
                }

            </Layout>
        )
    }
}