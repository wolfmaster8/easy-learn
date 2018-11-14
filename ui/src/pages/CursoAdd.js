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
import CursoAddForm from "../components/forms/CursoAddForm";

const {TextArea} = Input;

const { Content } = Layout;
const Step = Steps.Step;

export default class CursoAdd extends React.Component {

handleChange(){

}
  render() {

    return (
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                <Breadcrumb.Item>Administrador</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/cursos">Cursos</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Nuevo</Breadcrumb.Item>
              </Breadcrumb>
            </Col>

          </Row>
          <Divider/>
          <Row gutter={16}>
            {/*<Col span={24} style={{marginBottom: 20}}>
              <Steps size="small" current={0}>
                <Step title="Datos Principales"/>
                <Step title="Actividades"/>
                <Step title="Subactividades"/>
              </Steps>
            </Col>*/}
            <Col span={24}>
              <CursoAddForm/>
            </Col>

          </Row>
        </Content>
      </Layout>
    )
  }
}