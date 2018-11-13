import React from 'react';
import { Button, Form, Icon, Input, Select, message } from "antd";
import api from '../../services/api';
import hash from 'password-hash';
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";

const Option = Select.Option;
const {TextArea} = Input;

 class CursoAddForm extends React.Component{
   constructor(props) {
     super(props);
     this.state = {
       profesores: [],
       loadingProf: true
     }
   }

   async componentDidMount(){
     const response = await api.get('/usuario/rol/3');
     this.setState({profesores: response.data, loadingProf: false})
   }

   handleSubmit = async e => {
    e.preventDefault();
    await this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        api.post('/curso', values);
        this.successGuardando();
        this.props.history.push('/cursos');

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
    const {profesores, loadingProf} = this.state;
    return(
      <Form
        className="login-form"
        layout="vertical"
        onSubmit={this.handleSubmit}
      >
        <Row gutter={16}>
          <Col span={6}>
        <Form.Item label="Titulo del Curso">
          {getFieldDecorator('titulo',{initialValue: '',
            rules: [{ required: true, message: 'Ingresa el título del curso' }],
          })(
            <Input autoFocus={true} placeholder="Titulo"/>

          )}
        </Form.Item>

            <Form.Item label="Profesor">
              {getFieldDecorator('id_profesor',{initialValue: '',
                rules: [{ required: true, message: 'Elige un profesor' }],
              })(
                <Select loading={loadingProf} >
                  {profesores.map(profe =>(
                    <Option value={profe.id_usuario}>{profe.nombre} {profe.apellido}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={18}>
        <Form.Item label="Descripción">
          {getFieldDecorator('descripcion',{initialValue: '',
            rules: [{ required: true, message: 'Debes ingresar una descripción al curso' }],
          })(
            <TextArea rows={6} placeholder="Descripción"/>
          )}
        </Form.Item>

        <Button style={{ marginTop: 20 }} type="primary"  htmlType="submit">Crear Curso</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default CursoAddForm = Form.create({})(CursoAddForm);