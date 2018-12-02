import React, {Fragment} from 'react';
import {Modal, Button, Icon, List, Col, Tooltip} from "antd";
import ActividadEdit from "./list-itens/ActividadEdit";
import SpinGral from "./SpinGral";
import api from '../services/api';
import SubactividadEdit from "./list-itens/SubactividadEdit";
import NotaAddForm from "./list-itens/NotaAdd";


export default class ModalNotasSubactividad extends React.Component {
    constructor(props) {
        super(props);
        this.act = this.props.actividad.id_actividad;
        this.user = this.props.estudianteID;
        this.state = {
            loading: true,
            toggle: false,
            subactividades: []
        }
    }

    toggleModal = async () => {
        console.log('MODAL')
        const {actividad} = this.props;
        this.setState({toggle: !this.state.toggle});
        await api.get(`/curso/${actividad.id_curso}/actividad/${this.act}/subactividades/`)
            .then((response) => {
                this.setState({subactividades: response.data, loading: false});
                console.log(response.data)
            })
        // await api.get(`/nota/usuario/${this.user}/actividad/${this.act}`)

    };

    render() {
        const {actividad} = this.props;

        const {toggle, loading, subactividades} = this.state;
        return (
            <Fragment>
                <Tooltip key={2} title="Editar">
                    <Button onClick={this.toggleEdit}>
                        <Icon type="edit"/>
                    </Button>
                </Tooltip>

                <Modal
                    title={`Notas de la Actividad: ${actividad.titulo}`}
                    width={890}
                    visible={toggle}
                    onOk={this.toggleModal}
                    onCancel={this.toggleModal}
                    footer={null}
                    destroyOnClose={true}
                >
                    asdsad
                   {/* {loading ? <SpinGral text={`Notas de ${estudiante.nombre}`}/>
                        : (
                            <List itemLayout="horizontal"
                                  dataSource={actividades} renderItem={(item, i) => (
                                    <NotaAddForm key={i} actividad={item} estudianteID={estudiante.id} />

                            )}/>
                        )}*/}
                </Modal>

            </Fragment>

        )
    }
}