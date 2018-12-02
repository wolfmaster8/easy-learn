import React, {Fragment} from 'react';
import {Modal, Button, Icon, List, Col, Row, Tabs, Layout} from "antd";
import SpinGral from "./SpinGral";
import api from '../services/api';
import NotaProgress from "./NotaProgress";
import SubactividadNota from "./SubactividadNota";

const TabPane = Tabs.TabPane;
const {Content} = Layout;


export default class ModalNotas extends React.Component {
    constructor(props) {
        super(props);
        this.act = this.props.inscripcion.id_actividad;
        this.curso = this.props.inscripcion.id_curso;
        this.state = {
            loading: true,
            toggle: false,
            actividades: []
        }
    }

    toggleModal = async () => {
        this.setState({toggle: !this.state.toggle});
        await api.get(`/curso/${this.curso}/actividades/`)
            .then((response) => {
                this.setState({actividades: response.data, loading: false})
            })
        await api.get(``)
        // await api.get(`/nota/usuario/${this.user}/actividad/${this.act}`)

    };

    render() {
        const {estudiante} = this.props;
        const {toggle, loading, actividades} = this.state;
        return (
            <Fragment>
                <Button key={1} onClick={this.toggleModal}>
                    <Icon type="file-sync"/> Editar Notas
                </Button>

                <Modal
                    title={`Notas de: ${estudiante.nombre} ${estudiante.apellido}`}
                    width={990}
                    style={{ top: 20 }}
                    visible={toggle}
                    onOk={this.toggleModal}
                    onCancel={this.toggleModal}
                    footer={null}
                    destroyOnClose={true}
                >

                    {loading ? <SpinGral text={`Notas de ${estudiante.nombre}`} size={100}/>
                        : (

                                <Tabs
                                defaultActiveKey="1"
                                tabPosition='top'
                            >
                                {actividades.map((act, i) => (
                                    <TabPane tab={act.titulo} key={i + 1}>
                                        {/* NotaProgress Ya tiene Row y Col*/}
                                        <NotaProgress actividad={act} estudianteID={estudiante.id_usuario}/>
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <SubactividadNota actividad={act} estudianteID={estudiante.id_usuario} cursoID={this.curso} />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                ))}
                            </Tabs>

                        )}

                </Modal>

            </Fragment>

        )
    }
}