import React from 'react';
import {Col, InputNumber, Row, Form, Button, message} from "antd";
import {withRouter} from "react-router-dom";
import api from '../../services/api';
import {get} from 'lodash';
import * as notif from "../Notificaciones";


class NotaAddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.estudianteID;
        this.state = {
            subactividadNota: {},
            saving:false
        }
    }

    componentDidMount = async () => {
        const {subactividad} = this.props;
        await api.get(`/ver/nota/usuario/${this.user}/sub/${subactividad.id_subactividad}`)
            .then((response) => {
                this.setState({subactividadNota: response.data[0]});
            })
    };

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({saving: true})
        const {subactividadNota} = this.state;
        if(subactividadNota === undefined){
            /* Si es un nuevo registro */
            notif.saving();
            // console.log(curso);
            const {subactividad, actividad} = this.props;
            await this.props.form.validateFields((err, values) => {
                if (!err) {
                    values['id_actividad'] = actividad.id_actividad;
                    values['id_usuario'] = this.user;
                    values['id_subactividad'] = subactividad.id_subactividad;

                    api.post(`/asignar/nota/sub/${subactividad.id_subactividad}`, values)
                          .then((response)=>{
                              this.createNotaActividad(values);
                              // this.props.history.push(`/curso/${curso}/actividad/${actividad}/subactividad/new`);
                          });
                }else{
                    notif.warning('')
                }
            });
        }else{
            console.log('Ya existe');

        }
    };

    createNotaActividad = async (values) =>{
        const {id_actividad, id_curso, id_subactividad, puntaje} = values;

        const valuesActividad = {
            id_actividad: id_actividad,
            id_usuario: this.user,
            puntos: puntaje
        };
    // console.log(valuesActividad)
        await api.post(`/nota/usuario/${this.user}/actividad/${id_actividad}`, valuesActividad)
            .then((response)=>{
                console.log(response)
                notif.success();
                this.setState({saving: false})
            })
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const {subactividad, puntosMaximos} = this.props;
        const {subactividadNota, saving} = this.state;
        return (
            <Form
                className="login-form"
                layout="inline"
                onSubmit={this.handleSubmit}
            >
                <Form.Item label={`Puntos (${puntosMaximos})`}>
                    {getFieldDecorator('puntaje', {
                        initialValue: get(subactividadNota, 'puntaje', ''),
                        rules: [{required: true, message: 'Asigna un puntaje total'}],
                    })(
                        <InputNumber
                            min={1}
                            max={puntosMaximos}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button loading={saving} type="primary" htmlType="submit">Asignar Nota</Button>
                </Form.Item>

            </Form>
        )
    }
}

export default NotaAddEditForm = withRouter(Form.create({})(NotaAddEditForm));
