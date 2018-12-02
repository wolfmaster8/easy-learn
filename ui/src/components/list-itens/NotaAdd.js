import React, {Fragment} from 'react';
import {Button, Form, Icon, Input, Select, message, InputNumber, Row, Col, Progress, Alert, List, Tooltip} from "antd";
import api from '../../services/api';
import {get} from 'lodash'
import {
    withRouter
} from 'react-router-dom';
import * as notif from '../Notificaciones'
import SubactividadNota from "./SubactividadNota";
import ModalNotasSubactividad from "../ModalNotasSubactividad";

const Option = Select.Option;
const {TextArea} = Input;

class NotaAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding:false,
            notaActividad: {}
        }
    }

    componentDidMount = async ()=> {
        const {actividad, estudianteID} = this.props;
        await api.get(`/nota/usuario/${estudianteID}/actividad/${actividad.id_actividad}`)
            .then((response)=>{
                this.setState({notaActividad: response.data});
                // console.log(this.state.notaActividad)
            })

    };

    porcentajeActividad = () => {
        const {actividad} = this.props;
        const {notaActividad} = this.state;
        let porcentaje = (get(notaActividad, 'puntos', 0) * 100) / actividad.puntos;
        return porcentaje;
    };

    toggleEdit = () =>{
        this.setState({adding: !this.state.adding})
    };

    render() {
        const {actividad, estudianteID} = this.props;
        const {adding, notaActividad} = this.state;

        return (
            <List.Item
                actions={[
                    <ModalNotasSubactividad actividad={actividad} estudianteID={estudianteID} />]}>

                <List.Item.Meta title={`${actividad.titulo}`}/>

                <Tooltip title={`${get(notaActividad, 'puntos', 0)} de ${actividad.puntos}`}>
                    <Progress showInfo={false} percent={this.porcentajeActividad()} />
                </Tooltip>

            </List.Item>
        )
    }
}

export default NotaAdd;