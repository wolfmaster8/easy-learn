import React, { Fragment, Component } from "react";
import api from "../services/api";
import Badge from "antd/es/badge";
import SpinGral from "./SpinGral";


export default class CursosBadges extends Component{
  constructor( props ) {
    super(props);
     this.cursoAssoc = this.props.curso
    this.state={
      cursoInfo: {},
      loading: true,
    }
  }

  async componentDidMount(){
    const {id_curso} = this.props.curso;
    // console.log(this.cursoAssoc);
    if(this.cursoAssoc){
      await api.get(`/curso/${id_curso}`)
        .then((response)=>{
          this.setState({cursoInfo: response.data[0], loading: false});
        })
    }

  }

  renderCurso = () =>{
    const {cursoInfo} = this.state;
    /* QUE RENDERICE UN LETRERO CUANDO NO TENGA CURSOS ASIGNADOS */
    return <Badge count={cursoInfo.titulo} style={{backgroundColor: "#3BAC53", marginRight: 10}}/>

  };

  
  render(){
    const {cursoInfo, loading} = this.state;
    if(loading) return <SpinGral/>;
    return(
      <Fragment>
        {this.renderCurso()}
      </Fragment>
    )
  }
  
}