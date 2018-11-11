import React from 'react';
import { Button, Layout } from 'antd';
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";

const Content = Layout.Content;

export default class Demo extends React.Component {
  constructor( props ) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.state = {
      phraseDemo: ''
    }
  }
  handleEnter = e => {
    if(e.keyCode !== 13) return;
    const enter = 13;
    this.handleSubmit(e, enter);
  };
  handleSubmit = (e,enter) => {
    if(!enter){e.preventDefault()};
    const { phraseDemo } = this.state;
    if(!phraseDemo.length) return;
    
    localStorage.setItem('@EasyLearn:phraseDemo', phraseDemo);
    
    this.props.history.push('/cursos');
    
  };
  handleChange = e => {
    this.setState({ phraseDemo: e.target.value });
  };
  
  render() {
    const { phraseDemo } = this.state;
    return (
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 300 }}>
          <h1>Bienvenido al Demo de EasyLearn</h1>
          <p>Este es el prototipo de EasyLearn, una plataforma para profesores y estudiantes.</p>
          <p>A continuación ingresa tu nombre</p>
          <Row gutter={16}>
            <Col span={6}>
              <Form onSubmit={this.handleSubmit}>
                <Input value={phraseDemo} onChange={this.handleChange} placeholder="Nombre" onKeyDown={this.handleEnter} />
                <br/>
                <Button style={{marginTop: 20}} htmlType="submit" type="primary">Entrar</Button>
              </Form>
            </Col>
          </Row>
          {/*<Link style={{marginRight: 30}} to="/usuarios/"><Button type="primary" icon="team">Profesor Juan</Button></Link>
          <Link to="/cursos/1"><Button type="primary" icon="user">Estudiante Maria</Button></Link>*/}
        </Content>
      </Layout>
    )
  }
}