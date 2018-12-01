import React from 'react';
import {Button, Form, Icon, Input, Select, message, InputNumber} from "antd";
import api from '../../services/api';
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import * as notif from '../Notificaciones';

import {
    withRouter
} from 'react-router-dom';

const Option = Select.Option;
const {TextArea} = Input;

class ActividadEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.id_curso = this.props.info.id_curso;
        this.id_actividad = this.props.info.id_actividad;
        this.state = {
            // newValues: []
            saving: false
        }
    }


    handleSubmit = async e => {
        e.preventDefault();
        this.setState({saving: true});
        await this.props.form.validateFields((err, values) => {
            if (!err) {
                api.post(`/curso/${this.id_curso}/actividad/${this.id_actividad}/update`, values)
                    .then(()=>{
                        notif.success();
                        this.props.history.push(`/editar/curso/${this.id_curso}`);
                        this.setState({saving: false})
                    });


            } else {

            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {info} = this.props;
        const {saving} = this.state;
        return (
            <Form
                className="login-form"
                layout="vertical"
                onSubmit={this.handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={18}>
                        <Form.Item label="Titulo de la Actividad">
                            {getFieldDecorator('titulo', {
                                initialValue: info.titulo,
                                rules: [{required: true, message: 'Ingresa el título la Actividad'}],
                            })(
                                <Input autoFocus={true} placeholder="Actividad"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Puntos">
                            {getFieldDecorator('puntos', {
                                initialValue: info.puntos,
                                rules: [{required: true, message: 'Asigna un puntaje total'}],
                            })(
                                <InputNumber
                                    min={0}
                                    max={100}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Descripción">
                            {getFieldDecorator('descripcion', {
                                initialValue: info.descripcion,
                                rules: [{required: true, message: 'Debes ingresar una descripción al curso'}],
                            })(
                                <TextArea rows={6} placeholder="Descripción"/>
                            )}
                        </Form.Item>

                        <Button loading={saving} style={{marginTop: 20}} type="primary" htmlType="submit">Actualizar Actividad</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default ActividadEditForm = withRouter(Form.create({})(ActividadEditForm));