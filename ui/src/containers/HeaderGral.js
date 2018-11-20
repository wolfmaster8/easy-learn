import React from 'react';
import Logo from './../assets/images/logo-horizontal.png';
import { Layout, Menu, Avatar, Row, Col, Badge } from 'antd';
import Link from "react-router-dom/es/Link";
const { Header} = Layout;

export default class HeaderGral extends React.Component{

  render(){
    const menu = [
      {
        title: 'Usuarios',
        to: '/usuarios',
        disabled: false,
      },
      {
        title: 'Cursos',
        to: '/cursos',
        disabled: false,
      },
      {
        title: 'Mensajes',
        to: '/',
        disabled: true,
      },
      
    ];
    const nombre = localStorage.getItem('@EasyLearn:phraseDemo');
    return(
      <Layout>
        <Header className="header background-ean">
          <Row gutter={16}>
            <Col span={3}>
              <Link to="/">
                <img src={Logo} height="40px" alt="Logo Universidad Ean" />
              </Link>
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
              <div className="text-right">
                <a style={{marginRight: 15}} href="#">
                  <Badge count={5} style={{background: '#ff8a65', top: '-5px', height: '15px', minWidth: '15px', padding: '0 3px', fontSize: 11, borderRadius: 15, lineHeight: '17px'}}>
                    <Avatar icon="user" />
                  </Badge>
                </a>
                 <span className="text-white">{nombre ? nombre : 'Usuario'}</span>
              </div>
            </Col>
          </Row>

        </Header>
      </Layout>
    )
  }
}