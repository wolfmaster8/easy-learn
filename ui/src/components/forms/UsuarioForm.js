import React from 'react';
import { Button, Form, Icon, Input, Select, message } from "antd";
import api from '../../services/api';
const bcrypt = require('bcryptjs');

const Option = Select.Option;

 class UsuarioForm extends React.Component{

   handleSubmit = async e => {
    e.preventDefault();
    await this.props.form.validateFields((err, values) => {
      if (!err) {
        const pwdInput = "astr34rtgr";
        const saltRounds =10;
        values["pwd"] = bcrypt.genSalt(saltRounds, function(err, salt){
          bcrypt.hash(pwdInput, salt, function(err, hash){
            if(err){
              console.log(err)
            }else{
              console.log(hash)
            }
          })
        });
        // console.log(values);
        // api.post('/usuario', values);
        this.successGuardando();
      }else{
        this.errorGuardando();
      }
    });
  };
  successGuardando = () => {
    message.success('Usuario Guardado con éxito');
  };
   errorGuardando = () =>{
     message.error('Error Guardando');
   };

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form
        className="login-form"
        layout="vertical"
        onSubmit={this.handleSubmit}
      >
        <Form.Item label="Nombre">
          {getFieldDecorator('nombre',{initialValue: '',
            rules: [{ required: true, message: 'Ingresa un nombre' }],
          })(
            <Input
                   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
          )}
        </Form.Item>

        <Form.Item label="Rol">
          {getFieldDecorator('rol',{initialValue: '2',
            rules: [{ required: true, message: 'Elige el Rol' }],
          })(
              <Select  >
                <Option value="1">Administrador</Option>
                <Option value="2">Estudiante</Option>
                <Option value="3">Profesor</Option>
              </Select>
          )}
        </Form.Item>

        <Form.Item label="Apellido">
          {getFieldDecorator('apellido',{initialValue: '',
            rules: [
              { required: true, message: 'Ingresa un apellido' }],
          })(
            <Input
              prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
          )}
        </Form.Item>

        <Form.Item label="Email">
          {getFieldDecorator('email',{initialValue: '',
            rules: [{
              type: 'email', message: 'Parece que el email no es válido',
            },
              { required: true, message: 'Ingresa un email' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
          )}
        </Form.Item>

        <Button style={{ marginTop: 20 }} type="primary"  htmlType="submit">Crear</Button>

      </Form>
    )
  }
}

export default UsuarioForm = Form.create({})(UsuarioForm);