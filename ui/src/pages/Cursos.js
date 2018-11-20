import React, { Fragment } from 'react';
import api from '../services/api';
import {Link} from 'react-router-dom';

import {Layout, Card, Row, Col, Badge, Divider, Progress, Tooltip, Button, Skeleton,  Breadcrumb} from "antd";
import CursoInfo from "../components/CursoInfo";
import SpinGral from "../components/SpinGral";
const { Content } = Layout;


export default class Cursos extends React.Component{
  constructor( props ) {
    // this.getActividades = this.getActividades.bind(this);
    super(props);
    this.state = {
      cursos: [],
      loading:true,
      loadingAct:true,
      actividades: {},

    }
  }
  async componentDidMount() {
    const cursos = await api.get(`/cursos`);
    this.setState({ cursos: cursos.data, loading:false});
    
  }


  
  render(){
    const { cursos, loading, loadingAct} = this.state;
    if(loading) return <SpinGral/>;
    return(
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
        <Row gutter={16}>
            <Col span={12}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                <Breadcrumb.Item>Administrador</Breadcrumb.Item>
                <Breadcrumb.Item>Cursos</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={12} >
              <div className="text-right">
              <Link to="/cursos/new"><Button type="primary">Añadir Curso</Button></Link>
              </div>
            </Col>
          </Row>
          <Divider/>
          <Row gutter={16}>
           {cursos.map(curso =>(
              <CursoInfo key={curso.id} cursos={curso}/>
            ))}
            
          </Row>
        </Content>
      </Layout>
    )
  }
}