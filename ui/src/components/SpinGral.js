import React, {Component} from 'react';
import {Icon, Spin, Layout} from 'antd';
import {get} from 'lodash'

const loaderIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
const {Content} = Layout;
export default class SpinGral extends Component {

    render() {
        return (
            <Layout>
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 680}}>
                    <div className="spin">
                        <Spin size={"large"} style={{color: '#3BAC53'}} indicator={loaderIcon}/>
                        <p>Cargando {get(this.props, 'text', '')}</p>
                    </div>
                </Content>
            </Layout>
        )
    }
}
