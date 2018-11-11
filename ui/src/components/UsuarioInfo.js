import React, {Component} from 'react';
import api from '../services/api';
import Link from "react-router-dom/es/Link";
import { Button, List } from "antd";

export default class UsuarioInfo extends Component{
  constructor( props ) {
    super(props);
    this.state = {
      cursos: {}
    }
  }
  
  async componentDidMount(){
    const response = await api.get(`/usuario/${this.props.id_usuario}/cursos`);
    this.setState({cursos: response.data[0]});
    console.log(this.state.cursos)
  }
  deleteUser = async () => {
    const {user} = this.props;
    
    await api.delete(`/usuario/${user.id_usuario}` );
  };
  render(){
  const {user} = this.props;
  const {cursos} = this.state;
    return(
      <List.Item actions={[ <Link to={`/usuario/editar/${user.id_usuario}`}>Editar</Link>, <Button onClick={this.deleteUser} type="default">Eliminar</Button> ]}>
        <List.Item.Meta title={`${user.nombre} ${user.apellido}`} description={user.email}/>
        {console.log('-->'+cursos+' id:'+user.id_usuario)}
      </List.Item>
    )
  }
}