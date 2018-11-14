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
  Menu
} from "antd";
import SpinGral from "../components/SpinGral";
import ActividadAddForm from "../components/forms/ActividadAddForm";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const {TextArea} = Input;

const Step = Steps.Step;

export default class ActividadAdd extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      infoCurso: {},
      actividades: [],
      subactividades: []
    }
  }

  async componentDidMount(){
  const idCurso = this.id;
  const response = await api.get(`/curso/${idCurso}`);
  const actividades = await api.get(`/curso/${idCurso}/actividades`);

  this.setState({infoCurso: response.data[0], actividades: actividades.data});

  // console.log(this.state.actividades);

}

 getSubactividades = async (id_actividad) =>{
  // this.setState({subactividades: []})
  let subactividades = await api.get(`/curso/${this.id}/actividad/${id_actividad}/subactividades/`);
  this.setState({subactividades: subactividades.data})


}

renderSideRight = () =>{
  const {actividades, subactividades} = this.state;
 return(
    <Sider width={300} style={{ background: '#3BAC53 !important' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['-1']}
          defaultOpenKeys={[`1`]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {actividades.map((act, i) =>{
            this.getSubactividades(act.id_actividad);
            return (
            <SubMenu key={i} title={<span><Icon type="snippets" />{i+1}. {act.titulo}</span>}>
              {subactividades.map((suba, i)=>(
                <Menu.Item key={i}>{suba.titulo}</Menu.Item>
              ))}
              <Menu.Item >
              <Link to={`/curso/${this.id}/actividad/${act.id_actividad}/subactividad/new`}><Icon type="plus" /> Nueva Subactividad</Link>
          </Menu.Item>
            </SubMenu>
            )
            
          })}
          <Menu.Item key={-1} >
              <Icon type="plus" />Nueva Actividad
          </Menu.Item>
          
        </Menu>
      </Sider>
 )
}
  render() {
  const {infoCurso} = this.state;
    return (
      <Layout>
      {this.renderSideRight()}
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
              <ActividadAddForm curso={this.id}/>
            </Col>

          </Row>
        </Content>
      </Layout>
    )
  }
}