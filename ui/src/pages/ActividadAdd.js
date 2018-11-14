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
  Menu,
  notification
} from "antd";
import SpinGral from "../components/SpinGral";
import ActividadAddForm from "../components/forms/ActividadAddForm";
import SidebarActividad from "../containers/SidebarActividad";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

const Step = Steps.Step;

export default class ActividadAdd extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      infoCurso: {},
      actividades: [],
      subactividades: [],
      loading: true
    }
  }

  async componentDidMount() {
    const idCurso = this.id;
    const response = await api.get(`/curso/${idCurso}`);
    const actividades = await api.get(`/curso/${idCurso}/actividades`);

    this.setState({ infoCurso: response.data[0], actividades: actividades.data, loading: false });

    // console.log(this.state.actividades);
  this.openNotification()
  }

  getSubactividades = async (id_actividad) => {
    // this.setState({subactividades: []})
    let subactividades = await api.get(`/curso/${this.id}/actividad/${id_actividad}/subactividades/`);
    this.setState({ subactividades: subactividades.data })

  }

  openNotification = () => {
    const args = {
      message: 'Notification Title',
      description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
      duration: 0,
    };
    notification.open(args);
  };

  render() {
    const { infoCurso, actividades, loading } = this.state;
    if(loading) return <SpinGral/>;
    return (
      <Layout>
        <SidebarActividad curso={infoCurso} actividades={actividades}/>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                <Breadcrumb.Item>Administrador</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/cursos">Cursos</Link></Breadcrumb.Item>
                {/*<Breadcrumb.Item>{infoCurso.titulo}</Breadcrumb.Item>*/}
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
              <ActividadAddForm curso={this.id}/>
            </Col>

          </Row>
        </Content>
      </Layout>
    )
  }
}