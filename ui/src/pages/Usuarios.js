import React, { Fragment } from 'react';
import api from '../services/api';
import SpinGral from '../components/SpinGral';
import { Layout, Row, Col, List, Button, Divider, Form, Drawer, Input, Icon, Select } from "antd";
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
// import Link from "react-router-dom/es/Link";
import hash from 'password-hash';
// import socket from 'socket.io-client';
import UsuarioInfo from "../components/UsuarioInfo";
import CursosAutocomplete from "../components/CursosAutocomplete";
import * as ReactDOM from "react";
import UsuarioForm from "../components/forms/UsuarioForm";
const { Content } = Layout;
const Option = Select.Option;

export default class Usuarios extends React.Component {
  constructor( props ) {
    super(props);
    this.showDrawer = this.showDrawer.bind(this);
    this.state = {
      data: {},
      loading: true,
      nombre: '',
      apellido: '',
      email: '',
      rol: 2,
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
    /*this.setState(
      { rol: e.target.value,
        },

      );*/
    // console.log(e.target)
  };
  /*handleSubmit = async e => {
    e.preventDefault();
    const { nombre, apellido, email } = this.state;
    const rol = this.state.rol;
    const pwdInput = "astr34rtgr";
    const pwd = hash.generate(pwdInput);
    const insertar = {nombre, apellido, email, rol, pwd};
    await api.post('/usuario', insertar);
    this.setState({nombre: '', apellido: '', email: '', rol: 2});
    this.setState({data: [insertar, ...this.state.data]})
  };*/


  
  renderAddNewUser() {
    const { nombre, apellido, email, rol } = this.state;
    return (
      <Fragment>
        <Drawer
          title="Crear Usuario"
          placement="right"
          closable={true}
          onClose={this.closeDrawer}
          visible={this.state.drawer}
        >
          <UsuarioForm/>
        </Drawer>
      </Fragment>
    )
    
  }
  
  render() {
    const { data, loading } = this.state;
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
