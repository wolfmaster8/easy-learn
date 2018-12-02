import React from 'react';
import {Col, Layout, List, Row} from "antd";
import SidebarCursos from "../containers/SidebarCursos";
import SpinGral from "../components/SpinGral";
import ActividadEdit from "../components/list-itens/ActividadEdit";
import api from "../services/api";
import UsuarioNotas from "../components/UsuarioNotas";

const {Content} = Layout;

export default class NotasUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            loading: true,
            estudiantes: []
        }
    }

    async componentDidMount() {
        await api.get(`/curso/${this.id}/usuarios/`)
            .then((response) => {
                this.setState({estudiantes: response.data, loading: false});
            })
    }

    render() {
        const {loading, estudiantes} = this.state;
        return (
            <Layout>
                <SidebarCursos idCurso={this.id} selected={3}/>
                {loading ? <SpinGral text="Usuarios" size={690}/>
                    : (
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 680}}>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <List header={<h3>Estudiantes Inscritos al Curso</h3>} bordered itemLayout="horizontal"
                                          dataSource={estudiantes} renderItem={(item, i) => (

                                            <UsuarioNotas key={i} inscripcion={item} />

                                    )}/>
                                </Col>
                            </Row>
                        </Content>
                    )}
            </Layout>
        )
    }
}