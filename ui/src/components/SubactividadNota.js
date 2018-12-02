import React from 'react';
import {Button, Col, Icon, List, Popconfirm, Tooltip} from 'antd'
import ModalSubactividades from "./ModalSubactividades";
import * as notif from "./Notificaciones";
import api from '../services/api';
import SubActividadEditForm from "./forms/SubActividadEditForm";
import ActividadEdit from "./list-itens/ActividadEdit";
import SpinGral from "./SpinGral";
import SubactividadNotaAdd from "./list-itens/SubactividadNotaAdd";

export default class SubactividadNota extends React.Component {
    constructor(props) {
        super(props);
        this.act = this.props.actividad.id_actividad;
        this.curso = this.props.cursoID;
        this.state = {
            subactividades: [],
            loading: true
        }
    }

    componentDidMount = async () => {
        await api.get(`/curso/${this.curso}/actividad/${this.act}/subactividades/`)
            .then((response) => {
                this.setState({subactividades: response.data, loading: false})
            })
    };

    render() {
        const {subactividades, loading} = this.state;
        const {actividad, estudianteID } = this.props;
        if (loading) return <SpinGral text="Notas" size={100}/>;
        return (
            <List
                  size="large"
                  bordered
                  itemLayout="horizontal"
                  dataSource={subactividades}
                  renderItem={(item, i) => (
                      <SubactividadNotaAdd key={i} estudianteID={estudianteID} subactividad={item} actividad={actividad}/>
                  )}/>
        )
    }
}