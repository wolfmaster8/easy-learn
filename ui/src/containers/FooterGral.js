import React, {Component} from "react";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;


class FooterGral extends Component{
  render(){
    return (
      <Layout>
        <Footer style={{textAlign:'center'}}>
          All rights reserved 2018. Felipe Lobo & Alexis Chacón & Sergio Barón
        </Footer>
      </Layout>
    );
  }
}

export default FooterGral;
