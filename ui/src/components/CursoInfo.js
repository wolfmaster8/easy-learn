import React, {Component, Fragment} from 'react';
import { Badge, Button, Card, Col, Divider, Progress, Tooltip, Skeleton } from "antd";
import api from "../services/api";


export default class CursoInfo extends Component{
  constructor( props ) {
    super(props);
    this.renderNota = this.renderNota.bind(this);
  this.state = {
    cursoInfo: {},
    actividades: [],
    loadingAct: true,
  
  };
  }
  async componentDidMount(){
    if(!this.props.info){
        const {cursos} = this.props;
        this.setState({cursoInfo: cursos});
        const actividades = await api.get(`/curso/${cursos.id_curso}/actividades`);
        this.setState({actividades: actividades.data, loadingAct: false});
        console.log(this.state.actividades)
      }else{
    const {id_curso} = this.props.info;

        const curso = await api.get(`/curso/${id_curso}`);
        this.setState({cursoInfo: curso.data[0]});
        const actividades = await api.get(`/curso/${id_curso}/actividades`);
        this.setState({actividades: actividades.data, loadingAct: false});
      }
    
  }
  
  renderNota(){
    console.log('Ver nota');
    this.setState({nota: !this.state.nota});
  }
  
  render(){
    const {nota, cursoInfo, actividades, loadingAct} = this.state;
    return(
      <Fragment>
        <Col span={8}>
          <Card
            loading={loadingAct}
            title={cursoInfo.titulo ? cursoInfo.titulo : <Skeleton/>}
            extra={<Button disabled type="primary" href="#">Entrar</Button>}
          >
            <p>Actividades <Badge className="pull-right" count={actividades.length} /></p>
            {/*<Divider />
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