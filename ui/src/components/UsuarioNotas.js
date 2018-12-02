import React from 'react';
import {Button, Icon, List, Popconfirm, Skeleton, Tooltip} from 'antd';
import api from '../services/api';

import ModalSubactividades from "./ModalSubactividades";
import * as notif from "./Notificaciones";
import ModalNotas from "./ModalNotas";

export default class UsuarioNotas extends React.Component{
    constructor(props) {
        super(props);
        this.id = this.props.inscripcion.id_usuario;
        this.state ={
            estudiante: {},
            loading: true
        }
    }
    componentDidMount = async ()=> {
        await api.get(`/usuario/${this.id}`)
            .then((response)=>{
                this.setState({estudiante: response.data[0], loading: false})
            });
    };

    render(){
        const {inscripcion} =this.props;
        const {estudiante, loading} = this.state;
        if(loading) return <Skeleton paragraph={false}/>;
        return(
            <List.Item
                actions={[
                    <Tooltip key={2} title="Editar Notas">
                      <ModalNotas estudiante={estudiante} inscripcion={inscripcion}/>
                    </Tooltip>
                ]}>

                <List.Item.Meta title={`${estudiante.nombre} ${estudiante.apellido}`}/>


            </List.Item>
        )
    }
}