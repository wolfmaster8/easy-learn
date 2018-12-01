import React, { Fragment } from 'react';
import api from '../services/api';
import {Layout, Card, Row, Col, Badge, Divider, Progress, Tooltip, Button, Icon} from "antd";
import CursoInfo from "../components/CursoInfo";
import SpinGral from "../components/SpinGral";
import {Menu} from "antd/lib/menu";
import {Link} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import SidebarCursos from "../containers/SidebarCursos";
const { Content } = Layout;


export default class AsignarCursos extends React.Component{
  constructor( props ) {
    super(props);
    this.state = {
      cursos: [],
      usuario:{},
      nota: false,
      loading:true,
    }
  }
  async componentDidMount() {
    this.id = this.props.match.params;
    const cursos = await api.get(`/usuario/${this.id}/cursos`);
    this.setState({ cursos: cursos.data, loading:false});
  }

  
  render(){
    const { cursos, loading} = this.state;
    if(loading) return <SpinGral/>;
    return(
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
          <Row gutter={16}>
            {cursos.map(curso =>(
              <CursoInfo key={curso.id} info={curso}/>
            ))}
            <Col span={8}>
            
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}