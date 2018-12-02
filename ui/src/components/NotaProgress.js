import React, {Fragment} from 'react';
import {Button, Form, Icon, Input, Select, message, InputNumber, Row, Col, Progress, Alert, List, Tooltip} from "antd";
import api from '../services/api';
import {get} from 'lodash'
import {
    withRouter
} from 'react-router-dom';

const Option = Select.Option;
const {TextArea} = Input;

class NotaProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: false,
            notaActividad: {},
            nota: 0,
        }
    }

    componentDidMount = async () => {
        const {actividad, estudianteID} = this.props;
        await api.get(`/nota/usuario/${estudianteID}/actividad/${actividad.id_actividad}`)
            .then((response) => {
                this.setState({notaActividad: response.data[0]});
                // console.log(this.state.notaActividad);
                this.porcentajeActividad();
            })
    };

    porcentajeActividad = () => {
        const {actividad} = this.props;
        const {notaActividad} = this.state;
        let porcentaje = (get(notaActividad, 'puntos', 0) * 100) / actividad.puntos;
        this.setState({nota: porcentaje})
        // console.log(this.state.nota)

    };

    render() {
        const {actividad} = this.props;
        const {notaActividad, nota} = this.state;

        return (
            <Row>
                <Col span={6}>
                   <p className="text-center">{get(notaActividad, 'puntos', 0)} de {actividad.puntos}</p>
                </Col>
                <Col span={18}>
                    <Tooltip title={`${get(notaActividad, 'puntos', 0)} de ${actividad.puntos}`}>
                        <Progress showInfo={false} percent={nota}/>
                    </Tooltip>
                </Col>
            </Row>
        )
    }
}

export default NotaProgress;