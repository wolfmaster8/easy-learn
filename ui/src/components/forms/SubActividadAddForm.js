import React, {Fragment} from 'react';
import { Button, Form, Icon, Input, Select, message, InputNumber, Row, Col, Alert } from "antd";
import api from '../../services/api';
import {
  withRouter
} from 'react-router-dom';
import * as notif from '../Notificaciones'
const Option = Select.Option;
const {TextArea} = Input;

 class SubActividadAddForm extends React.Component{
     constructor(props) {
         super(props);
     }


     handleSubmit = async e => {
    e.preventDefault();
    notif.saving();
     let {curso, actividad} = this.props;
     // console.log(curso);
     await this.props.form.validateFields((err, values) => {
      if (!err) {
        values["id_actividad"] = parseInt(actividad);
        api.post(`/curso/${curso}/actividad/${actividad}/sub/`, values)
            .then((response)=>{
                message.destroy();
                notif.success();
                this.props.history.push(`/curso/${curso}/actividad/${actividad}/subactividad/new`);
            });

      }else{
        notif.error(err)
      }
    });
  };


   renderForm = (puntosMaximos)=>{
       const { getFieldDecorator } = this.props.form;
       return(
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
       )
   };

   renderNoMore = ()=>{
        const {puntos} = this.props.actividad;
       return(
           <Alert
               message="No hay más puntos disponibles"
               description={`Ya se han asignado los ${puntos} puntos disponibles para esta actividad.`}
               type="info"
               showIcon
           />
       )
   };

  render(){
    const { puntosMaximos } = this.props;
    return (
        <Fragment>
            {puntosMaximos === 0 ? this.renderNoMore() : this.renderForm(puntosMaximos)}
        </Fragment>

    );
  }
}

export default SubActividadAddForm = withRouter(Form.create({})(SubActividadAddForm));