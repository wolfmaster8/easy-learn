import { Link } from "react-router-dom";
import React from "react";
import { Menu, Icon, Layout } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default class SidebarActividad extends React.Component{


  render(){
    const {actividades, curso} = this.props;
    return(
      <Sider width={300} style={{ background: '#3BAC53 !important' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['-1']}
          defaultOpenKeys={[`1`]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key={1} title={<span><Icon type="snippets"/>Actividades</span>}>
            {actividades.map((act, i) => (
              <Menu.Item key={i}>
                <Link to={`/curso/${curso.id_curso}/actividad/${act.id_actividad}/subactividad/new`}><Icon
                  type="diff"/>{i + 1}. {act.titulo}</Link>
              </Menu.Item>
            ))}
            <Menu.Item key={-1}>
              <Icon type="plus"/>Nueva Actividad
            </Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>
    )
  }

}
