import React from 'react';
import {Button, Layout} from 'antd';
import Link from "react-router-dom/es/Link";
const Content = Layout.Content;

export default class Demo extends React.Component{
  
  render(){
    return(
      <Layout>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 300 }}>
          <h1>Bienvenido al Demo de EasyLearn</h1>
          <p>Este es el prototipo de EasyLearn, una plataforma para profesores y estudiantes.</p>
          <p>A continuación puedes elegir si entrar como Profesor o como Estudiante</p>
          <Link style={{marginRight: 30}} to="/usuarios/"><Button type="primary" icon="team">Profesor Juan</Button></Link>
          <Link to="/cursos/1"><Button type="primary" icon="user">Estudiante Maria</Button></Link>
        </Content>
      </Layout>
    )
  }
}