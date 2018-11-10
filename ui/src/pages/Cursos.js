import React, { Fragment } from 'react';
import api from '../services/api';
import {Layout, Card, Row, Col, Badge, Divider, Progress, Tooltip, Button} from "antd";
const { Content } = Layout;


export default class Cursos extends React.Component{
  constructor( props ) {
    super(props);
    this.renderNota = this.renderNota.bind(this);
    this.state = {
      usuario:{},
      nota: false,
      loading: true,
    }
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/show/${id}`);
    this.setState({ usuario: response.data, loading: false });
    console.log(response);
  }
  renderNota(){
    console.log('Ver nota')
    this.setState({nota: !this.state.nota});
  }
  render(){
    const {nota, usuario} = this.state;
    return(
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card
                title="Sistemas de Información"
                extra={<Button type="primary" href="#">Entrar</Button>}
              >
                <p>Notificaciones <Badge className="pull-right" count={25} /></p>
                <Divider />
                <h4 className="text-center">Próxima Entrega</h4>
                <p className="text-center"><Badge status="processing" />18 de Noviembre</p>
                <Divider />
                <Button type="primary" block onClick={this.renderNota} size="default">{nota ? 'Ocultar Nota' : 'Ver Nota'}</Button>
                {nota &&
                <Fragment>
                  <Tooltip title="30 de 60 puntos disponibles">
                    <h2 className="text-center">30 puntos</h2>
                    <Progress showInfo={false} percent={60} successPercent={30} />
                  </Tooltip>
                </Fragment>}
              </Card>
            </Col>
            <Col span={8}>
            
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}