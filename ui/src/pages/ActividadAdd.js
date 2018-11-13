import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Layout,
  Card,
  Row,
  Col,
  Form,
  Divider,
  Progress,
  Tooltip,
  Button,
  Skeleton,
  Breadcrumb,
  Steps,
  Input, Icon,
} from "antd";
import SpinGral from "../components/SpinGral";
import ActividadAddForm from "../components/forms/ActividadAddForm";

const {TextArea} = Input;

const { Content } = Layout;
const Step = Steps.Step;

export default class ActividadAdd extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      infoCurso: {}
    }
  }

  async componentDidMount(){
  const idCurso = this.id;
  const response = await api.get(`/curso/${idCurso}`);
  this.setState({infoCurso: response.data[0]});
  console.log(this.state.infoCurso)
}

handleChange(){

}
  render() {
  const {infoCurso} = this.state;
    return (
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                <Breadcrumb.Item>Administrador</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/cursos">Cursos</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{infoCurso.titulo}</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/cursos">Actividades</Link></Breadcrumb.Item>
              </Breadcrumb>
            </Col>

          </Row>
          <Divider/>
          <Row gutter={16}>
            {/*<Col span={24} style={{marginBottom: 20}}>
              <Steps size="small" current={1}>
                <Step title="Datos Principales"/>
                <Step title="Actividades"/>
                <Step title="Subactividades"/>
              </Steps>
            </Col>*/}
            <Col span={24}>
              <ActividadAddForm/>
            </Col>

          </Row>
        </Content>
      </Layout>
    )
  }
}