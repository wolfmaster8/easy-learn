import React, {Fragment} from 'react';
import {Modal, Button, Icon, List, Col} from "antd";
import ActividadEdit from "./list-itens/ActividadEdit";
import SpinGral from "./SpinGral";
import api from '../services/api';
import SubactividadEdit from "./list-itens/SubactividadEdit";


export default class ModalSubactividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            toggle: false,
            subactividades: []
        }
    }

    toggleModal = async () => {
        const {id_curso, id_actividad} = this.props.actividad;
        this.setState({toggle: !this.state.toggle});
        await api.get(`/curso/${id_curso}/actividad/${id_actividad}/subactividades`)
            .then((response) => {
                this.setState({subactividades: response.data, loading: false})
            })
    };

    render() {
        const {actividad} = this.props;
        const {toggle, subactividades, loading} = this.state;
        return (
            <Fragment>
                <Button key={1} onClick={this.toggleModal}>
                    <Icon type="file-sync"/> Editar Subactividades
                </Button>

                <Modal
                    title={`Subactividades: ${actividad.titulo}`}
                    width={690}
                    visible={toggle}
                    onOk={this.toggleModal}
                    onCancel={this.toggleModal}
                    footer={null}
                    destroyOnClose={true}
                >
                    {loading ? <SpinGral text="Subactividades"/>
                        : (
                            <List itemLayout="horizontal"
                                  dataSource={subactividades} renderItem={(item, i) => (
                                <SubactividadEdit key={i} subactividad={item} subactividades={subactividades} actividad={actividad}/>

                            )}/>
                        )}
                </Modal>

            </Fragment>

        )
    }
}