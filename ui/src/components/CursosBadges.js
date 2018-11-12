import React, { Fragment, Component } from "react";
import api from "../services/api";
import Badge from "antd/es/badge";


export default class CursosBadges extends Component{
  constructor( props ) {
    super(props);
    this.state={
      cursoInfo: {},
      loading: true,
    }
  }
  async componentDidMount(){
    const {id_curso} = this.props.curso;
    const curso = await api.get(`/curso/${id_curso}`);
    this.setState({cursoInfo: curso.data[0], loading: false});
    // console.log(this.state.cursoInfo)
  }
  
  render(){
    const {cursoInfo, loading} = this.state;
    return(
      <Fragment>
        {cursoInfo.length ? 'No hay cursos asignados' : <Badge  count={cursoInfo.titulo} style={{backgroundColor: "#52c41a", marginRight: 10}}/>}
      
      </Fragment>
    )
  }
  
}