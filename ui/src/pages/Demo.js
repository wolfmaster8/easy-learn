import React from 'react';
import { Button, Layout, Form, Input, Row, Col, Alert, List, Icon } from 'antd';

import api from '../services/api';
import LoginForm from "../components/forms/LoginForm";


const Content = Layout.Content;

export default class Demo extends React.Component {
  constructor( props ) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.state = {
      phraseDemo: ''
    }
  }
  handleEnter = e => {
    if(e.keyCode !== 13) return;
    const { phraseDemo } = this.state;
    if(!phraseDemo.length) return;
    localStorage.setItem('@EasyLearn:phraseDemo', phraseDemo);
  
    this.props.history.push('/usuarios');
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { phraseDemo } = this.state;
    if(!phraseDemo.length) return;
    localStorage.setItem('@EasyLearn:phraseDemo', phraseDemo);
    this.props.history.push('/usuarios');
    
  };
  handleChange = e => {
    this.setState({ phraseDemo: e.target.value });
  };



  render() {
    const { phraseDemo } = this.state;
    const data = [
      {
        title: 'Inicio de sesión',
        description: 'Inicio de sesión para administradores, estudiantes y profesores',
        icon: <Icon type="sync" spin />,
      },
      {
        title: 'CRUD Notas Estudiantes',
        description: 'Ver, editar y asignar nota a los estudiantes',
        icon: <Icon type="pause-circle" theme="twoTone" twoToneColor="#ffe58f" />
      },
      {
        title: 'Editar Cursos',
        description: 'Editar cursos y su contenido (actividades y subactividades)',
        icon: <Icon type="pause-circle" theme="twoTone" twoToneColor="#ffe58f" />


      },
      {
        title: 'Manejo de Usuarios',
        description: 'Ver, editar y asignar usuarios',
        icon: <Icon type="pause-circle" theme="twoTone" twoToneColor="#ffe58f" />


      },
      {
        title: 'CRUD Mensajes',
        description: 'Ver, enviar y eliminar mensajes',
        icon: <Icon type="pause-circle" theme="twoTone" twoToneColor="#ffe58f" />


      },
      {
        title: 'Rerender on Update',
        description: 'Actualizar la lista cuando es eliminado/creado un item.',
        icon: <Icon type="sync" spin />,



      },
    ];
    return (
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>

          <Row justify="between" gutter={48}>

            <Col span={12}>
              <h1>Bienvenido al Demo de EasyLearn</h1>
              <p>Este es el prototipo de EasyLearn, una plataforma para profesores y estudiantes.</p>
              <p>A continuación ingresa tu nombre</p>
              <LoginForm />
              <Form onSubmit={this.handleSubmit}>
                <Input autoFocus={true} value={phraseDemo} onChange={this.handleChange} placeholder="Nombre" onKeyDown={this.handleEnter} />
                <br/>

                <Button style={{marginTop: 20}} htmlType="submit" type="primary">Entrar</Button>
              </Form>
            </Col>
            <Col span={12}>
              <h2>Lista de Features en Desarrollo</h2>

              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                    {item.icon}
                  </List.Item>
                )}
              />
              <Alert style={{marginTop: '30px'}} message="Este proyecto aún está en fase alfa" type="warning" showIcon />

            </Col>
          </Row>
          {/*<Link style={{marginRight: 30}} to="/usuarios/"><Button type="primary" icon="team">Profesor Juan</Button></Link>
          <Link to="/cursos/1"><Button type="primary" icon="user">Estudiante Maria</Button></Link>*/}
        </Content>
      </Layout>
    )
  }
}