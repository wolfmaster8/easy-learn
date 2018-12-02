import React from 'react';
import {Form} from "antd/lib/form";
import {Col, InputNumber, Row} from "antd";
import {withRouter} from "react-router-dom";

class NotaAddEditForm extends React.Component{

    render(){

        return(
            <Form
                className="login-form"
                layout="vertical"
                onSubmit={this.handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={18}>
                        <h4>{actividad.titulo}</h4>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={`Puntos (${puntosMaximos})`}>
                            {getFieldDecorator('puntos', {
                                initialValue: '',
                                rules: [{required: true, message: 'Asigna un puntaje total'}],
                            })(
                                <InputNumber
                                    min={1}
                                    max={puntosMaximos}
                                />
                            )}
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        )
    }
}

export default NotaAddEditForm = withRouter(Form.create({})(NotaAddEditForm));
