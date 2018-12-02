import React, {Component} from "react";
import { Layout, Row, Col } from 'antd';
const {  Footer } = Layout;


class FooterGral extends Component{
  render(){
    return (
      <Layout>
        <Footer style={{textAlign:'center'}}>
          <Row gutter={16}>
            <Col span={12}>
              <p className="text-left">All rights reserved 2018. Felipe Lobo & Alexis Chacón & Sergio Barón</p>
            </Col>
            <Col span={12}>
              <p className="text-right">Versión 0.9a</p>
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}

export default FooterGral;
