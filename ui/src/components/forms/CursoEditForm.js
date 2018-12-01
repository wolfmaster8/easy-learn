import React from 'react';
import {Button, Form, Icon, Input, Select, Row, Col} from "antd";
import api from '../../services/api';
import {
    withRouter
} from 'react-router-dom';
import * as notif from '../Notificaciones';
const Option = Select.Option;
const {TextArea} = Input;

class CursoEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.idCurso;
        this.state = {
            profesores: [],
            loadingProf: true,
            saving: false
        }
    }

    async componentDidMount() {
        const response = await api.get('/usuario/rol/3');
        this.setState({profesores: response.data, loadingProf: false})
    }

    handleSubmit = async e => {
        e.preventDefault();
        notif.saving();
        this.setState({saving: true});
        await this.props.form.validateFields((err, values) => {
            if (!err) {
                api.post(`/curso/${this.id}/update`, values)
                    .then((response) => {
                        if(response.status === 200){
                            notif.success();
                            this.setState({saving:false});
                            this.props.history.push(`/editar/curso/${this.id}`);
                        }else{
                            notif.error('404')
                        }
                    })

            } else {
                notif.warning(err)
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {cursoInfo} = this.props;
        const {profesores, loadingProf, saving} = this.state;
        return (
            <Form
                className="login-form"
                layout="vertical"
                onSubmit={this.handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="Titulo del Curso">
                            {getFieldDecorator('titulo', {
                                initialValue: cursoInfo.titulo,
                                rules: [{required: true, message: 'Ingresa el título del curso'}],
                            })(
                                <Input autoFocus={true} placeholder="Titulo"/>
                            )}
                        </Form.Item>

                        <Form.Item label="Profesor">
                            {getFieldDecorator('id_profesor', {
                                initialValue: cursoInfo.id_profesor,
                                rules: [{required: true, message: 'Elige un profesor'}],
                            })(
                                <Select loading={loadingProf}>
                                    {profesores.map(profe => (
                                        <Option value={profe.id_usuario}>{profe.nombre} {profe.apellido}</Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Form.Item label="Descripción">
                            {getFieldDecorator('descripcion', {
                                initialValue: cursoInfo.descripcion,
                                rules: [{required: true, message: 'Debes ingresar una descripción al curso'}],
                            })(
                                <TextArea rows={9} placeholder="Descripción"/>
                            )}
                        </Form.Item>

                        <Button loading={saving} style={{marginTop: 20}} type="primary" htmlType="submit">Actualizar Curso</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default CursoEditForm = withRouter(Form.create({})(CursoEditForm));