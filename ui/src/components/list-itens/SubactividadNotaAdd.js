import React from 'react';
import {Button, Icon, List, Popconfirm, Tooltip} from 'antd'
import ModalSubactividades from "../ModalSubactividades";
import * as notif from "../Notificaciones";
import api from '../../services/api';
import SubActividadEditForm from "../forms/SubActividadEditForm";
import NotaAddEditForm from "../forms/NotaAddEditForm";

export default class SubactividadNotaAdd extends React.Component{
    constructor(props) {
        super(props);
        this.subact = this.props.subactividad.id_subactividad;
        this.state = {
            deleting:false,
            deleted: false,
            editing: false,
            puntosMaximosSub: this.props.actividad.puntos,
        }
    }


    toggleEdit = () =>{
        // this.getPuntaje();
        this.setState({editing: !this.state.editing});
    };

    render(){
        const {subactividad, actividad, estudianteID} = this.props;
        const {deleted, editing, deleting, puntosMaximosSub} = this.state;

        if(editing) return(
            <List.Item style={{background: '#f5f5f5'}}  actions={[
                <Button onClick={this.toggleEdit}>
                    <Icon type="close" /> Cancelar
                </Button>,
            ]} >
                <List.Item.Meta title={`${subactividad.titulo} ${subactividad.puntaje}`}
                                description={<NotaAddEditForm actividad={actividad} estudianteID={estudianteID} puntosMaximos={subactividad.puntaje} subactividad={subactividad}/>
                }/>

            </List.Item>
        );

        return(
            <List.Item  actions={[
                <Tooltip key={2} title="Editar">
                    <Button onClick={this.toggleEdit}>
                        <Icon type="edit" />
                    </Button>
                </Tooltip>,
            ]}>
                <List.Item.Meta title={`${subactividad.titulo} ${subactividad.puntaje}`} description={subactividad.instrucciones}/>

            </List.Item>
        )
    }
}