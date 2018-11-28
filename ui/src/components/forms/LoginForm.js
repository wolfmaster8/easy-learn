import React from 'react';
import { Button, Icon, Input, Form } from "antd";
import api from "../../services/api";
import { withRouter } from "react-router-dom";


class LoginForm extends React.Component{

  handleSubmitLogin = async (e) =>{
    e.preventDefault();
    await this.props.form.validateFields((err, values) => {
      if (!err) {

        console.log(values);
        api.post('/auth/user', values)
          .then((response)=>{
            console.log(response);
            const { history } = this.props;
            localStorage.setItem('token', response.data.token);
            history.push('/usuarios');
          })
        // this.props.history.push('/usuarios');

      }else{
        this.errorGuardando('Ocurrió un error inesperado al guardar. Intenta de nuevo.');
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;

    return(
      <Form className="login-form"
            layout="vertical"
            onSubmit={this.handleSubmitLogin}>
        <Form.Item label="Email">
          {getFieldDecorator('email',{initialValue: 'as@s.com',
            rules: [{ required: true, message: 'Email' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
          )}
        </Form.Item>

        <Form.Item label="Contraseña">
          {getFieldDecorator('pwd',{initialValue: 'astr34rtgr',
            rules: [{ required: true, message: 'Contraseña' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
          )}
        </Form.Item>

        <Button style={{ marginTop: 20 }} type="primary"  htmlType="submit">Iniciar Sesión</Button>


      </Form>
    )
  }
}

export default LoginForm = withRouter(Form.create({})(LoginForm)) ;
