import { Link, withRouter } from "react-router-dom";
import React from "react";
import { Menu, Icon, Layout } from "antd";
import Badge from "antd/es/badge";
import api from '../services/api';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class SidebarSubActividad extends React.Component{

  render(){
    const { curso, subactividades} = this.props;
    return(
      <Sider width={350} style={{ borderRight: '2px solid #f2f2f2' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['-1']}
          defaultOpenKeys={[`1`]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item>
            Subactividades
          </Menu.Item>
            {subactividades.map((sub, i) => (
              <Menu.Item key={i}>
                <Link to={`/curso/${curso.id_curso}/actividad/${sub.id_actividad}/subactividad/new`}><Icon
                  type="diff"/>{i + 1}. {sub.titulo}</Link>
              </Menu.Item>
            ))}
            <Menu.Item key={-1}>
              <Icon type="plus"/>Nueva Subactividad
            </Menu.Item>

        </Menu>
      </Sider>
    )
  }

}

export default withRouter(SidebarSubActividad)
