import React, { Fragment } from 'react';
import api from '../services/api';
import {Layout, Card, Row, Col, Badge, Divider, Progress, Tooltip, Button} from "antd";
import CursoInfo from "../components/list-itens/CursoInfo";
import SpinGral from "../components/SpinGral";
const { Content } = Layout;


export default class Cursos extends React.Component{
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
    const { id } = this.props.match.params;
    const cursos = await api.get(`/usuario/${id}/cursos`);
    this.setState({ cursos: cursos.data, loading:false});
  }

  
  render(){
    const { cursos, loading} = this.state;
    if(loading) return <SpinGral size={690}/>;
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