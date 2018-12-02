import React from 'react';
import {Checkbox, message} from "antd";
import {List} from "antd/lib/list";
import api from "../services/api";
import {get} from 'lodash';
import * as notif from './Notificaciones'

export default class CheckItem extends React.Component {
    constructor(props) {
        super(props);
        this.id = parseInt(this.props.curso);
        this.state = {
            checked: false,
            asociaciones: {},
        }
    }

    async componentDidMount() {
        const {estudiante} = this.props;

        await api.get(`/usuario/${estudiante.id_usuario}/cursos/${this.id}`)
            .then((response) => {
                const datos = response.data[0];
                const checked = get(datos, 'id_usuario', false);
                this.setState({
                    asociaciones: datos,
                    checked: checked,
                    loading: false,
                });
                // console.log(this.state.asociaciones);

            })

    };


    onChange = (e) => {
        const value = e.target.checked;
        const {estudiante} = this.props;
        notif.saving();
        if (!value) {
            api.delete(`/usuario/${estudiante.id_usuario}/curso/${this.id}`)
                .then(() => {
                    this.setState({checked: !this.state.checked});
                    notif.eliminada('Usuario', 'm')
                })
        } else {
            let usuario = e.target.value;
            let data = {
                id_usuario: usuario,
                id_curso: this.id
            };
            api.post(`/usuario/${data.id_usuario}/curso/`, data)
                .then(() => {
                    this.setState({checked: !this.state.checked});
                    notif.success();
                })
        }

    };

    successGuardando = () => {
        message.success('Usuario Añadido al curso');
    };

    saving = () => {
        message.loading('Guardando');
    };

    successEliminando = () => {
        message.success('Usuario Eliminado del curso');
    };

    render() {
        const {estudiante} = this.props;
        const {checked, saving} = this.state;
        return (
            <Checkbox
                checked={checked}
                value={estudiante.id_usuario}
                onChange={this.onChange}
            >
                {estudiante.nombre} {estudiante.apellido}
            </Checkbox>

        )
    }
}