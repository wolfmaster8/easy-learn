import React from 'react';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Logo from './../assets/images/logo-horizontal.png';
import { Layout, Menu, Avatar } from 'antd';
import Link from "react-router-dom/es/Link";
const { Header} = Layout;

export default class HeaderGral extends React.Component{

  render(){
    const menu = [
      {
        title: 'Mis Cursos',
        to: '/',
        disabled: false,
      },
      {
        title: 'Actividades Pendientes',
        to: '/',
        disabled: true,
      },
      {
        title: 'Mensajes',
        to: '/',
        disabled: true,
      },
      
    ];
    return(
      <Layout>
        <Header className="header background-ean">
          <Row gutter={16}>
            <Col span={3}>
              <img src={Logo} height="40px" alt="Logo Universidad Ean" />
            </Col>
            <Col span={15}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{lineHeight: '64px'}}>
                {menu.map((item, i) => (
                  <Menu.Item disabled={item.disabled} key={i}><Link to={item.to}>{item.title}</Link></Menu.Item>
                ))
                }
              </Menu>
            </Col>
            <Col span={6}>
              <Avatar icon="user" /> <span className="text-white">Felipe Lobo</span>
            </Col>
          </Row>

        </Header>
      </Layout>
    )
  }
}