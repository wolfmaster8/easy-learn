import React from 'react';
import {List, Button, Tooltip, Icon, Popconfirm, Modal} from "antd";
import * as notif from '../Notificaciones';
import api from '../../services/api';
import ActividadEditForm from "../forms/ActividadEditForm";
import ModalSubactividades from "../ModalSubactividades";

export default class ActividadEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted: false,
            deleting: false,
            editing:false,
            modal: false
        }
    }

    editAct = () => {
        this.setState({editing: !this.state.editing})
    };

    deleteAct = async () =>{
        const {actividad} = this.props;
        this.setState({deleting:true});
        await api.delete(`/curso/${actividad.id_curso}/actividad/${actividad.id_actividad}`)
            .then((response)=>{
                this.setState({deleted: true, deleting:false});
                notif.eliminada('Actividad', "f");
            })
    };



    render() {
        const {actividad} = this.props;
        const {deleting, deleted, editing, modal} = this.state;

        if(deleting) return(
            <List.Item actions={[<p style={{color: '#d62424'}}><Icon type="sync" spin /> Eliminando</p>]} >
                <List.Item.Meta  title={`${actividad.titulo} ${actividad.puntos}`} description={actividad.descripcion}/>
            </List.Item>
        );
        if(deleted) return (
            <List.Item style={{background: '#f3d0d0'}}  actions={[<p style={{color: '#d62424'}}>Eliminada</p>]} >
                <List.Item.Meta title={`${actividad.titulo} ${actividad.puntos}`} description={actividad.descripcion}/>
            </List.Item>
        );
        if(editing) return(
            <List.Item style={{background: '#f5f5f5'}}  actions={[
                <Button onClick={this.editAct}>
                <Icon type="close" /> Cancelar
            </Button>,
            ]} >
               <ActividadEditForm info={actividad} />
            </List.Item>
        );

        return (
            <List.Item  actions={[
                <ModalSubactividades actividad={actividad}/>,
                <Tooltip key={2} title="Editar">
                    <Button onClick={this.editAct}>
                        <Icon type="edit" />
                    </Button>
                </Tooltip>,
                    <Popconfirm key={3} placement="topRight" title="¿Seguro que deseas eliminar esta actividad? Eliminarás las subactividades también" onConfirm={this.deleteAct} onCancel={notif.cancel} okText="Sí" cancelText="No">
                    <Button type="danger">
                        <Icon type="delete" />
                    </Button>
                    </Popconfirm>
                ,
            ]}>
                <List.Item.Meta title={`${actividad.titulo} ${actividad.puntos}`} description={actividad.descripcion}/>

            </List.Item>
        )
    }
}