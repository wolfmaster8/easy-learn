import React, { Fragment } from 'react';
import api from '../services/api';
import SpinGral from '../components/SpinGral';
import { Layout, Row, Col, List, Button, Divider, Form, Drawer, Input, Icon } from "antd";
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
import Link from "react-router-dom/es/Link";

const { Content } = Layout;
const FormItem = Form.Item;


export default class Usuarios extends React.Component {
  constructor( props ) {
    super(props);
    this.showDrawer = this.showDrawer.bind(this);
/*    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);*/
    this.state = {
      data: {},
      loading: true,
      nombre: '',
    }
  }
  
  async componentDidMount() {
    // const { id } = this.props.match.params;
    const response = await api.get(`/usuarios`);
    this.setState({ data: response.data, loading: false });
    console.log(response);
  }
  
  showDrawer = () => {
    this.setState({ drawer: true, })
  };
  closeDrawer = () => {
    this.setState({ drawer: false, })
  };
/*  handleChange(event){
    this.state({
      nombre: event.target.nombre
    })
  }*/
 /* handleSubmit(e){
    e.preventDefault();
    
  }*/
  renderAddNewUser() {
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
            onSubmit={this.handleSubmit()}
          >
            <FormItem label="Nombre">
              <Input onChange={this.handleChange()} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} />
            </FormItem>
            <FormItem label="Apellido">
              <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }}/>} />
            </FormItem>
            <FormItem label="Email">
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>} />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">Crear</Button>
            </FormItem>
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
                <List.Item actions={[<Link to={`/usuario/editar/${item.id_usuario}`}>Editar</Link>]}>
                  <List.Item.Meta title={`${item.nombre} ${item.apellido}`} description={item.email}/>
                </List.Item>
              )}>
                {/*{this.renderAddNewUser()}*/}
              </List>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}