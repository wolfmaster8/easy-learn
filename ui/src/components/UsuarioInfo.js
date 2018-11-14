import React, {Component} from 'react';
import api from '../services/api';
import Link from "react-router-dom/es/Link";
import { Button, List, message, Popconfirm } from "antd";
import CursosBadges from "./CursosBadges";

export default class UsuarioInfo extends Component{
  constructor( props ) {
    super(props);
    this.state = {
      cursos: []
    }
  }
  
  async componentDidMount(){
    const {user} = this.props;
    const response = await api.get(`/usuario/${user.id_usuario}/cursos`);
    this.setState({cursos: response.data});
  }
  deleteUser = async () => {
    const {user} = this.props;
    await api.delete(`/usuario/${user.id_usuario}` );
    message.success('Usuario Eliminado');
  };
  cancel = () =>{
    message.info('Uhh... casi...')
  }
  render(){
  const {user} = this.props;
  const {cursos} = this.state;
    return(
      <List.Item actions={[
        <Link disabled to={`/usuario/${user.id_usuario}/asignar/cursos/`}>Asignar Cursos</Link>,
        <Link disabled to={`/usuario/editar/${user.id_usuario}`}>Editar</Link>,
        <Popconfirm title="¿Seguro que deseas eliminar este usuario?" onConfirm={this.deleteUser} onCancel={this.cancel} okText="Sí" cancelText="No">
          <Button type="danger">Eliminar</Button>
        </Popconfirm>
      ]}>
        <List.Item.Meta title={`${user.nombre} ${user.apellido}`} description={user.email}/>
        {cursos.map(curso=>(
          <CursosBadges key={curso.id} curso={curso}/>
        ))}
      </List.Item>
    )
  }
}