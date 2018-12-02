import React, {Fragment} from 'react';
import {Modal, Button, Icon, List, Col} from "antd";
import ActividadEdit from "./list-itens/ActividadEdit";
import SpinGral from "./SpinGral";
import api from '../services/api';
import SubactividadEdit from "./list-itens/SubactividadEdit";
import NotaAddForm from "./list-itens/NotaAdd";


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
                    width={890}
                    visible={toggle}
                    onOk={this.toggleModal}
                    onCancel={this.toggleModal}
                    footer={null}
                    destroyOnClose={true}
                >
                    {loading ? <SpinGral text={`Notas de ${estudiante.nombre}`}/>
                        : (
                            <List itemLayout="horizontal"
                                  dataSource={actividades} renderItem={(item, i) => (
                                    <NotaAddForm key={i} actividad={item} estudianteID={estudiante.id} />

                            )}/>
                        )}
                </Modal>

            </Fragment>

        )
    }
}