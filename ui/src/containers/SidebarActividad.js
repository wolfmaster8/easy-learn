import { Link } from "react-router-dom";
import React from "react";
import { Menu, Icon, Layout, Popover, Badge } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default class SidebarActividad extends React.Component{


  render(){
    const {actividades, curso} = this.props;
    return(
      <Sider width={300} style={{ background: '#3BAC53 !important' }}>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['-1']}
          defaultOpenKeys={[`1`]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item>
            Actividades: {curso.titulo}
          </Menu.Item>
            {actividades.map((act, i) => (
              <Menu.Item key={i}>
                <Link to={`/curso/${curso.id_curso}/actividad/${act.id_actividad}/subactividad/new`}><Icon
                  type="diff"/>{i + 1}. {act.titulo} <Badge  count={`Puntos: ${act.puntos}`} style={{backgroundColor: "#3BAC53", marginLeft: '20px'}}/></Link>
              </Menu.Item>
            ))}
            <Menu.Item key={-1}>
              <Link to={`/cursos/${curso.id_curso}/actividades/new`}><Icon type="plus"/>Nueva Actividad</Link>
            </Menu.Item>




        </Menu>
      </Sider>
    )
  }

}
