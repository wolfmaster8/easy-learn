import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import SpinGral from "../components/SpinGral";
import api from "../services/api";
import {Tabs, Radio, Layout, Col, Row, Badge} from 'antd';
import SubactividadShow from "../components/SubactividadShow";
import SidebarCursos from "../containers/SidebarCursos";

const {Content} = Layout;
const TabPane = Tabs.TabPane;

class CursoVer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursoInfo: {},
            actividades: [],
            loading: true,
            profesor: '-',
            mode: 'top',
        }
    }

    async componentDidMount() {
        this.id = this.props.match.params.id;
        const response = await api.get(`/curso/${this.id}`);
        /* get PROFESOR */
        const profesor = await api.get(`/usuario/${response.data[0].id_profesor}`);
        /* get Actividades */
        const actividades = await api.get(`/curso/${this.id}/actividades`);
        this.setState({
            cursoInfo: response.data[0],
            actividades: actividades.data,
            profesor: profesor.data[0].nombre + ' ' + profesor.data[0].apellido,
            loading: false
        });

    }

    renderActividades = () => {
        const {actividades, mode, cursoInfo} = this.state;
        return (
            <Tabs
                defaultActiveKey="desc"
                tabPosition={mode}
            >
                <TabPane tab="Descripción" key="desc">
                    {cursoInfo.descripcion}
                </TabPane>
                {actividades.map((act, i) => (
                    <TabPane tab={`${i + 1}. ${act.titulo}`} key={i}>
                        <SubactividadShow cursoID={cursoInfo.id_curso} actividadID={act.id_actividad}/>
                    </TabPane>
                ))}
                <TabPane disabled={true} tab="Mis Notas" key="328">Mis Notas</TabPane>

            </Tabs>
        );
    }

    render() {
        const {loading, cursoInfo, profesor} = this.state;
        if (loading) return <SpinGral/>;
        return (
            <Layout>
                <SidebarCursos idCurso={this.id} />
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 680}}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <h2>{cursoInfo.titulo}</h2>
                            <p><b>Profesor:</b> {profesor}</p>
                        </Col>
                    </Row>

                    {this.renderActividades()}

                </Content>
            </Layout>
        )
    }
}

export default withRouter(CursoVer);
