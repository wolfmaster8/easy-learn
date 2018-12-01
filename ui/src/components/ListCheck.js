import React from 'react';
import { List, Checkbox } from 'antd';
import api from '../services/api';
import CheckItem from "./CheckItem";

export default class ListCheck extends React.Component {
  constructor(props) {
    super(props);
    // this.id = props.match.params.id;
    this.state ={
      estudiantes: [],
      asociaciones: [],
      loading: true,
    }
  }

  async componentDidMount() {
    const estudiantes = await api.get('/usuario/rol/2');
    const asociaciones = await api.get('/usuarios/cursos/');
    this.setState({estudiantes: estudiantes.data, asociaciones: asociaciones.data, loading: false});
    // console.log(this.state.estudiantes)

  };


  render() {
    const { estudiantes, loading } = this.state;
    const {curso} = this.props;

    return (
      <List
        loading={loading}
        size="small"
        header={<div>Añadir Estudiantes al Curso</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={estudiantes}
        renderItem={est =>(
          <List.Item>
            <CheckItem estudiante={est} curso={curso} />
          </List.Item>
        )}
      />
    )
  }

}