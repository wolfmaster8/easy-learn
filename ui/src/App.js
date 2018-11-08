import React, { Component, Fragment } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
import "antd/dist/antd.css";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  suma(){
    const a= 2;
    const b=3;
    return a+b;
  }
  render() {
    return (
      <Fragment>
        <Layout>
          <Header className="header">
            <Row>
              <Col span={18}>
                <Menu theme="dark" mode="horizontal" style={{lineheight: '44px'}}>
                  <Menu.Item>Usuarios</Menu.Item>
                  <Menu.Item>Cursos</Menu.Item>
                </Menu>
              </Col>
              <Col span={6}>
                <Avatar icon="user" />
              </Col>
            </Row>
          
          </Header>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
