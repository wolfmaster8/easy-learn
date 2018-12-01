import React, {Component, Fragment} from 'react';
import { Badge, Button, Card, Col, Divider, Progress, Tooltip, Skeleton, Icon, message, Popconfirm } from "antd";
import {Link} from 'react-router-dom'
import api from "../../services/api";
import {get} from 'lodash';
import {
  withRouter
} from 'react-router-dom';

 class CursoInfo extends Component{
  constructor( props ) {
    super(props);
    this.renderNota = this.renderNota.bind(this);
  this.state = {
    cursoInfo: {},
    actividades: [],
    loadingAct: true,
    usuariosInscritos: []
  };
  }
  async componentDidMount(){
    if(!this.props.info){
        const {cursos} = this.props;
        this.setState({cursoInfo: cursos});
        const actividades = await api.get(`/curso/${cursos.id_curso}/actividades`);
        this.setState({actividades: actividades.data});
        api.get(`/curso/${cursos.id_curso}/usuarios`)
            .then((response)=>{
                // console.log(response.data)
                this.setState({usuariosInscritos: response.data, loadingAct: false})
            })
      }else{
    const {id_curso} = this.props.info;

        const curso = await api.get(`/curso/${id_curso}`);
        this.setState({cursoInfo: curso.data[0]});
        const actividades = await api.get(`/curso/${id_curso}/actividades`);
        this.setState({actividades: actividades.data, loadingAct: false});


      }
  }

  countActivities = (actividades) => {
    let numeroActividades = actividades.length;
    // console.log(numeroActividades);
    if(numeroActividades === 0){
      return "Sin Actividades";
    }else{
      return numeroActividades;
    }
  };

  countEstudiantes = (estudiantes)=>{
      let numero =  estudiantes.length;
      if(numero === 0){
          return "Sin Estudiantes"
      }else{
        return get(estudiantes, 'length', "No hay");
      }
  };

  renderNota(){
    // console.log('Ver nota');
    this.setState({nota: !this.state.nota});
  }

  deleteCurso = async () =>{
    const id_curso = this.props.cursos.id_curso;
    await api.delete(`/curso/${id_curso}`);
    message.success('Curso Eliminado');
    this.props.history.push('/cursos');

  };

  cancel = () =>{
    message.info('Uhh... casi...')
  };
  render(){
    const {nota, cursoInfo, actividades, loadingAct, usuariosInscritos} = this.state;
    return(
      <Fragment>
        <Col span={8} style={{marginBottom: 40}}>
          <Card
            loading={loadingAct}
            title={cursoInfo.titulo ? <Link to={`/ver/curso/${cursoInfo.id_curso}`}>{cursoInfo.titulo}</Link> : <Skeleton/>}
            extra={ <Tooltip title="Añadir Actividad & Subactividad"><Link to={`/cursos/${cursoInfo.id_curso}/actividades/new`}><Icon type="plus-circle" /></Link></Tooltip>}
          actions={[ <Link to={`/inscribir/curso/${cursoInfo.id_curso}`}><Icon type="user-add" /></Link>,
              <Link to={`/editar/curso/${cursoInfo.id_curso}`}><Icon type="edit" /></Link>,
           <Popconfirm placement="topRight" title="¿Seguro que deseas eliminar este curso?" onConfirm={this.deleteCurso} onCancel={this.cancel} okText="Sí" cancelText="No">
          <Icon type="close-circle" />
        </Popconfirm>
           ]}
          >
            <p>Actividades <Badge className="pull-right" style={{ backgroundColor: '#ff8a65' }} count={this.countActivities(actividades)} /></p>
            <p>Estudiantes <Badge className="pull-right" style={{ backgroundColor: '#ff8a65' }} count={this.countEstudiantes(usuariosInscritos)} /></p>
              <Divider />

              {/*
            <h4 className="text-center">Próxima Entrega</h4>
            <p className="text-center"><Badge status="processing" />18 de Noviembre</p>*/}
            {this.props.info && 
              <Fragment>
<Divider />
            <Button type="primary" block onClick={this.renderNota} size="default">{nota ? 'Ocultar Nota' : 'Ver Nota'}</Button>
            {nota &&
            <Fragment>
              <Tooltip title="30 de 60 puntos disponibles">
                <h2 className="text-center">30 puntos</h2>
                <Progress showInfo={false} percent={60} successPercent={30} />
              </Tooltip>
            </Fragment>}
              </Fragment>
            }
            
          </Card>
        </Col>
      </Fragment>
    )
  }
}

export default withRouter(CursoInfo);
