import React, {Fragment, Component} from 'react';
import {Checkbox, Layout, Row, Col, message} from 'antd';
import {withRouter} from "react-router-dom";
import api from '../services/api';
import SpinGral from "../components/SpinGral";
import ListCheck from "../components/ListCheck";
import SidebarCursos from "../containers/SidebarCursos";

const {Content} = Layout;


class UsuarioCursoAdd extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.state = {
            estudiantes: [],
            loading: true,
            checked: false
        }
    }


    async componentDidMount() {
        const estudiantes = await api.get('/usuario/rol/2');
        this.setState({estudiantes: estudiantes.data, loading: false})
    }

    render() {
        const {estudiantes, loading, checked} = this.state;
        return (
            <Layout>
                <SidebarCursos idCurso={this.id} selected={2}/>

                {loading ? <SpinGral text="Inscritos"/>
                : (
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 680}}>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <ListCheck curso={this.id}/>
                                </Col>
                            </Row>
                        </Content>
                    )}

            </Layout>
        )
    }
}

export default withRouter(UsuarioCursoAdd)