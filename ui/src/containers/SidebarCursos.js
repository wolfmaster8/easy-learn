import React from 'react';
import {Link} from "react-router-dom";
import {Badge, Icon, Menu, Layout} from "antd";

const {Sider} = Layout;

export default class SidebarCursos extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.idCurso;
    }

    render() {
        const menu = [
            {title: 'Ver Actividades', to: `/ver/curso/${this.id}`, icon: 'book'},
            {title: 'Ver Usuarios Inscritos', to: `/inscribir/curso/${this.id}`, icon: 'team'},
            {title: 'Ver Notas de Usuarios', to: '', icon: 'highlight'},
        ];
        return (
            <Sider width={300} style={{background: '#3BAC53 !important'}}>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[`-1`]}
                    defaultOpenKeys={[`1`]}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item>
                        {/*Actividades: {curso.titulo}*/}
                    </Menu.Item>
                    {menu.map((item, i) => (
                        <Menu.Item key={i}>
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