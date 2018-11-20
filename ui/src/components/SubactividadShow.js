import React, { Component, Fragment } from 'react';
import { Tabs, Radio, Layout, Col, Row, List, Avatar, Badge } from 'antd';
import { withRouter } from "react-router-dom";
import SpinGral from "../components/SpinGral";
import api from "../services/api";


class SubactividadShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      subactividades: []
    }
  }

  async componentDidMount(){
    const {actividadID, cursoID} = this.props;
    const subactividades = await api.get(`/curso/${cursoID}/actividad/${actividadID}/subactividades`);
    this.setState({subactividades: subactividades.data});
    console.log(this.state.subactividades)
  };


  render(){
    const {subactividades} =this.state;

    return(
      <Fragment>

       <List
        itemLayout="vertical"
        size="large"

        dataSource={subactividades}
        footer={<div><b>Fin de la Actividad</b></div>}
        renderItem={(item, i) => (
        <List.Item
          key={item.id_subactividad}
          actions={[<Badge count={`Puntos: ${item.puntaje}`} style={{ backgroundColor: '#378844' }} />]}
        >
          <List.Item.Meta
            title={`${i+1}. ${item.titulo}`}
            description={item.fecha_editada}
          />
          {item.instrucciones}
        </List.Item>
      )}
        />
      </Fragment>
    )
  }
}

export default SubactividadShow;
