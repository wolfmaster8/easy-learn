import { Link } from "react-router-dom";
import React from "react";
import { Menu, Icon, Layout } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default class SidebarSubActividad extends React.Component{


  render(){
    const { curso, subactividades} = this.props;
    return(
      <Sider width={300} style={{ background: '#3BAC53 !important' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['-1']}
          defaultOpenKeys={[`1`]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key={1} title={<span><Icon type="snippets"/>Subactividades</span>}>
            {subactividades.map((sub, i) => (
              <Menu.Item key={i}>
                <Link to={`/curso/${curso.id_curso}/actividad/${sub.id_actividad}/subactividad/new`}><Icon
                  type="diff"/>{i + 1}. {sub.titulo}</Link>
              </Menu.Item>
            ))}
            <Menu.Item key={-1}>
              <Icon type="plus"/>Nueva Subactividad
            </Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>
    )
  }

}
