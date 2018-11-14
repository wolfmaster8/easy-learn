import React from 'react';
import { Button, Form, Icon, Input, Select, message, InputNumber } from "antd";
import api from '../../services/api';
import hash from 'password-hash';
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import {
  withRouter
} from 'react-router-dom';
import Badge from "antd/es/badge";
const Option = Select.Option;
const {TextArea} = Input;

 class SubActividadAddForm extends React.Component{




   handleSubmit = async e => {
    e.preventDefault();
     const {curso, actividad} = this.props;
     console.log(curso);
     await this.props.form.validateFields((err, values) => {
      if (!err) {
        values["id_actividad"] = parseInt(actividad.id_actividad);
        // console.log(values);
        api.post(`/curso/${curso}/actividad/${actividad.id_actividad}/sub/`, values);
        this.successGuardando();
        this.props.history.push(`/cursos/${curso}/actividades/new`);

      }else{
        this.errorGuardando();
      }
    });
  };
  successGuardando = () => {
    message.success('Actividad Guardada con éxito');
  };
   errorGuardando = () =>{
     message.error('Error Guardando');
   };


  render(){
    const { getFieldDecorator } = this.props.form;
    const { puntosMaximos } = this.props;
    return (
      <Form
        className="login-form"
        layout="vertical"
        onSubmit={this.handleSubmit}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Titulo de la Subactividad">
              {getFieldDecorator('titulo', {
                initialValue: '',
                rules: [{ required: true, message: 'Ingresa el título la Subactividad' }],
              })(
                <Input autoFocus={true} placeholder="Subactividad"/>
              )}
            </Form.Item>

            <Form.Item label={`Puntos (${puntosMaximos})`}>
              {getFieldDecorator('puntaje', {
                initialValue: '',
                rules: [{ required: true, message: 'Asigna un puntaje total' }],
              })(
                <InputNumber
                  min={1}
                  max={puntosMaximos}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item label="Instrucciones">
              {getFieldDecorator('instrucciones', {
                initialValue: '',
                rules: [{ required: true, message: 'Debes ingresar una instrucción para la subactividad' }],
              })(
                <TextArea rows={6} placeholder="Descripción"/>
              )}
            </Form.Item>

            <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">Crear Subactividad</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SubActividadAddForm = withRouter(Form.create({})(SubActividadAddForm));