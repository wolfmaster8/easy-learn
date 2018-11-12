import React from 'react';
import { Button, Layout, Form, Input, Row, Col, Alert } from 'antd';


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
    const { phraseDemo } = this.state;
    if(!phraseDemo.length) return;
    localStorage.setItem('@EasyLearn:phraseDemo', phraseDemo);
  
    this.props.history.push('/usuarios');
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { phraseDemo } = this.state;
    if(!phraseDemo.length) return;
    localStorage.setItem('@EasyLearn:phraseDemo', phraseDemo);
    this.props.history.push('/usuarios');
    
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
                <Input autoFocus={true} value={phraseDemo} onChange={this.handleChange} placeholder="Nombre" onKeyDown={this.handleEnter} />
                <br/>
        <Alert style={{marginTop: '30px'}} message="Este proyecto aún está en fase alfa" type="warning" showIcon />

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