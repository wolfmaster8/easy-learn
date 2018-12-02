import React from 'react';
import {Button, Icon, List, Popconfirm, Tooltip} from 'antd'
import ModalSubactividades from "../ModalSubactividades";
import * as notif from "../Notificaciones";
import api from '../../services/api';
import SubActividadEditForm from "../forms/SubActividadEditForm";

export default class SubactividadNota extends React.Component{
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

    getPuntaje = () => {
        const {subactividades} = this.props;
        let puntajeTotal = 0;
        subactividades.map(sub => (
            puntajeTotal = puntajeTotal + sub.puntaje
        ));
        this.setState({puntosMaximosSub: puntajeTotal})
    };

    toggleEdit = () =>{
        this.getPuntaje();
        this.setState({editing: !this.state.editing});
    };

    deleteSubact = async ()=>{
        this.setState({deleting:true});
        await api.delete(`/subactividad/${this.subact}/delete`)
            .then((response)=>{
                if(response.status === 200){
                    this.setState({deleting:false, deleted: true});
                    notif.eliminada('Subactividad', 'f');
                }

            })
    };

    render(){
        const {subactividad, actividad} = this.props;
        const {deleted, editing, deleting, puntosMaximosSub} = this.state;

        /*if(deleting) return(
            <List.Item actions={[<p style={{color: '#d62424'}}><Icon type="sync" spin /> Eliminando</p>]} >
                <List.Item.Meta  title={`${subactividad.titulo} ${subactividad.puntaje}`} description={subactividad.instrucciones}/>
            </List.Item>
        );

        if(deleted) return (
            <List.Item style={{background: '#f3d0d0'}}  actions={[<p style={{color: '#d62424'}}>Eliminada</p>]} >
                <List.Item.Meta title={`${subactividad.titulo} ${subactividad.puntaje}`} description={subactividad.instrucciones}/>
            </List.Item>
        );

        if(editing) return(
            <List.Item style={{background: '#f5f5f5'}}  actions={[
                <Button onClick={this.toggleEdit}>
                    <Icon type="close" /> Cancelar
                </Button>,
            ]} >
                <SubActividadEditForm actividad={actividad} puntosMaximos={puntosMaximosSub} subactividad={subactividad}/>
            </List.Item>
        );*/

        return(
            <List.Item  actions={[
                <Tooltip key={2} title="Editar">
                    <Button onClick={this.toggleEdit}>
                        <Icon type="edit" />
                    </Button>
                </Tooltip>,
                <Popconfirm key={3} placement="topRight" title="¿Seguro que deseas eliminar esta subactividad?" onConfirm={this.deleteSubact} onCancel={notif.cancel} okText="Sí" cancelText="No">
                    <Button type="danger">
                        <Icon type="delete" />
                    </Button>
                </Popconfirm>
                ,
            ]}>
                <List.Item.Meta title={`${subactividad.titulo} ${subactividad.puntaje}`} description={subactividad.instrucciones}/>

            </List.Item>
        )
    }
}