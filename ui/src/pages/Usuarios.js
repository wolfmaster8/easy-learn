import React, { Fragment } from 'react';
import api from '../services/api';
import SpinGral from '../components/SpinGral';
import { Layout, Row, Col, List, Button, Divider, Form, Drawer, Input, Icon } from "antd";
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
// import Link from "react-router-dom/es/Link";
import hash from 'password-hash';
// import socket from 'socket.io-client';
import UsuarioInfo from "../components/UsuarioInfo";
const { Content } = Layout;


export default class Usuarios extends React.Component {
  constructor( props ) {
    super(props);
    this.showDrawer = this.showDrawer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: {},
      loading: true,
      nombre: '',
      apellido: '',
      email: ''
    }
  }
  
   componentDidMount() {
    // const { id } = this.props.match.params;
    //  this.subscribeToEvents();
    this.fetchData();
    // console.log(response);
  }
  
  async fetchData(){
    const response = await api.get(`/usuarios`);
    this.setState({ data: response.data, loading: false });
  }
  /* subscribeToEvents = () =>{
    const io = socket('http://apieasylearn.sierra9.com/api');
    console.log(socket);
    io.on('error', function(error){
      console.log('ouch '+error);
    });
    io.on('usuario', data =>{
      console.log(data)
    })
  };*/
  
  showDrawer = () => {
    this.setState({ drawer: true, })
  };
  closeDrawer = () => {
    this.setState({ drawer: false, })
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { nombre, apellido, email } = this.state;
    const rol = 1;
    const pwdInput = "astr34rtgr";
    const pwd = hash.generate(pwdInput);
    const insertar = {nombre, apellido, email, rol, pwd};
    await api.post('/usuario', insertar);
    this.setState({nombre: '', apellido: '', email: ''});
    this.setState({data: [insertar, ...this.state.data]})
  };
  
  renderAddNewUser() {
    const { nombre, apellido, email } = this.state;
    return (
      <Fragment>
        <Drawer
          title="Crear Usuario"
          placement="right"
          closable={true}
          onClose={this.closeDrawer}
          visible={this.state.drawer}
        >
          <Form
            className="login-form"
            layout="vertical"
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="Nombre">
              
              <Input name="nombre" onChange={this.handleChange} value={nombre}
                     prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            </Form.Item>
            
            <Form.Item label="Apellido">
              <Input name="apellido" onChange={this.handleChange} value={apellido}
                     prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            </Form.Item>
            <Form.Item label="Email">
              <Input name="email" onChange={this.handleChange} value={email}
                     prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            </Form.Item>
            <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">Crear</Button>
          
          </Form>
        </Drawer>
      </Fragment>
    )
    
  }
  
  render() {
    const { data, loading } = this.state;
    const nombreCompleto = data.nombre + ' ' + data.apellido;
    if (loading) return <SpinGral/>;
    return (
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <Row gutter={16}>
            <Col span={4}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={8}>
              <Button type="primary" onClick={this.showDrawer}>Añadir Usuario</Button>
            </Col>
          </Row>
          <Divider/>
          <Row gutter={16}>
            <Col span={24}>
              <List itemLayout="horizontal" dataSource={data} renderItem={item => (
                <UsuarioInfo key={item.id_usuario} user={item}/>
              )}>
                {this.renderAddNewUser()}
              </List>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}