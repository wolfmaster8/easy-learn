import React from 'react';
import { Checkbox, message } from "antd";
import { List } from "antd/lib/list";
import api from "../services/api";
import {get} from 'lodash';

export default class CheckItem extends React.Component{
  constructor(props) {
    super(props);
    this.id = parseInt(this.props.curso);
    this.state = {
      checked: false,
      asociaciones: {}
    }
  }

  async componentDidMount() {
    const {estudiante} = this.props;

    await api.get(`/usuario/${estudiante.id_usuario}/cursos/${this.id}`)
      .then((response)=>{
        const datos = response.data[0];
        const checked = get(datos, 'id_usuario', false);
        this.setState({
          asociaciones: datos,
          checked: checked,
          loading: false,
        });
        // console.log(this.state.asociaciones);

      })

  };



  onChange =(e)=> {
    const value = e.target.checked;
    const {estudiante} = this.props;
    if(!value){
      api.delete(`/usuario/${estudiante.id_usuario}/curso/${this.id}`)
        .then((response)=>{
          this.setState({checked: !this.state.checked});
          this.successEliminando()
        })
    }else{
      let usuario = e.target.value;
      let data = {
        id_usuario: usuario,
        id_curso: this.id
      };
      api.post(`/usuario/${data.id_usuario}/curso/`, data)
        .then((response)=>{
          console.log(response);
          this.setState({checked: !this.state.checked});
          this.successGuardando()
        })
    }

  };

  successGuardando = () => {
    message.success('Usuario Añadido al curso');
  };

  successEliminando = () => {
    message.success('Usuario Eliminado del curso');
  };

  render(){
    const {estudiante} = this.props;
    const {checked} = this.state;
    return(
      <Checkbox
        checked={checked}
        value={estudiante.id_usuario}
        onChange={this.onChange}
      >
        {estudiante.nombre} {estudiante.apellido}
        </Checkbox>

    )
  }
}