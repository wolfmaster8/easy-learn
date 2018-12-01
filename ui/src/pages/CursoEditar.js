import React from 'react';
import {Layout, Row, Col, List} from "antd";
import {withRouter} from "react-router-dom";
import SpinGral from "../components/SpinGral";
import api from "../services/api";
import CursoEditForm from "../components/forms/CursoEditForm";
import ActividadEdit from "../components/list-itens/ActividadEdit";

const {Content} = Layout;

class CursoEditar extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            cursoInfo:{},
            actividades:[],
            loading: true
        }
    }

    componentDidMount = async ()=> {
    await api.get(`/curso/${this.id}`)
        .then((response)=>{
            this.setState({cursoInfo: response.data[0]});
        });
        await api.get(`/curso/${this.id}/actividades/`)
            .then((response)=>{
                console.log(response.data);
                this.setState({actividades: response.data, loading: false});

            })
    };

    render() {
        // const {} = this.props;
        const {loading, cursoInfo, actividades} = this.state;
        if(loading) return <SpinGral text="Actividades"/>;
        return (
            <Layout>
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 680}}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <CursoEditForm cursoInfo={cursoInfo} idCurso={this.id} />
                        </Col>
                        <Col span={24}>
                            <List header={<h3>Actividades</h3>} bordered itemLayout="horizontal" dataSource={actividades} renderItem={(item, i) => (
                                <ActividadEdit key={i} actividad={item} />
                            )}/>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}

export default withRouter(CursoEditar);
