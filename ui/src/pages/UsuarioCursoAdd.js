import React, {Fragment, Component} from 'react';
import {Checkbox, Layout, Row, Col, message} from 'antd';
import {withRouter} from "react-router-dom";
import api from '../services/api';
import SpinGral from "../components/SpinGral";
const { Content } = Layout;


class UsuarioCursoAdd extends Component{
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        console.log(this.id);
        this.state = {
            usuarios: [],
            loading: true
        }
    }

     onChange =(e)=> {
        console.log(`checked = ${e.target.value}`);
        let usuario = e.target.value;
        let data = {
            id_usuario:  usuario,
            id_curso: this.id
        }
        console.log(data);
         api.post(`/usuario/${usuario}/curso/`, data)
             .then((response)=>{
                 console.log(response);
                 this.successGuardando();
             })
    }

    successGuardando = () => {
        message.success('Usuario Anadido al curso');
    };

    async componentDidMount() {
        const usuarios = await api.get('/usuarios');
        this.setState({usuarios: usuarios.data, loading: false})
    }

    render(){
        const {usuarios, loading} = this.state;
        if(loading) return <SpinGral/>;
        return(
            <Layout>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
                <Row gutter={16}>
                    <Col span={12}>
                        {usuarios.map((user, i)=>(
                            <Checkbox key={i} value={user.id_usuario} onChange={this.onChange}>{user.nombre} {user.apellido}</Checkbox>
                        ))}
                    </Col>
                </Row>
                </Content>
            </Layout>
        )
    }
}

export default withRouter(UsuarioCursoAdd)