import React from 'react';
import {Link} from "react-router-dom";
import {Badge, Icon, Menu, Layout} from "antd";
import Divider from "antd/es/divider";

const {Sider} = Layout;

export default class SidebarCursos extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.idCurso;
        this.selected = this.props.selected;
    }

    render() {
        const menu = [
            {title: 'Ver Actividades', to: `/ver/curso/${this.id}`, icon: 'book', key: '1'},
            {title: 'Ver Usuarios Inscritos', to: `/inscribir/curso/${this.id}`, icon: 'team', key: '2'},
            {title: 'Ver Notas de Usuarios', to: `/notas/curso/${this.id}`, icon: 'highlight', key: '3'},
        ];
        return (
            <Sider width={300} style={{background: '#3BAC53 !important'}}>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[`${this.selected}`]}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item>
                        <Link to='/cursos'><Icon
                            type="left-circle"/> Volver</Link>
                    </Menu.Item>
                    {menu.map((item) => (
                        <Menu.Item key={item.key}>
                            <Link to={item.to}><Icon
                                type={item.icon}/>{item.title}</Link>
                        </Menu.Item>
                    ))}
                    {/*<Menu.Item key={-1}>
                        <Link to={`s`}><Icon type="plus"/>Nueva Actividad</Link>
                    </Menu.Item>*/}
                </Menu>
            </Sider>

        )
    }
}