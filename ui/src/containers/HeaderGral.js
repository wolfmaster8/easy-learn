import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class HeaderGral extends React.Component{

  render(){
    return(
      <Layout>
        <Header className="header">
          <Row>
            <Col span={18}>
              <Menu theme="dark" mode="horizontal" style={{lineheight: '44px'}}>
                <Menu.Item>Usuarios</Menu.Item>
                <Menu.Item>Cursos</Menu.Item>
              </Menu>
            </Col>
            <Col span={6}>
              <Avatar icon="user" />
            </Col>
          </Row>

        </Header>
      </Layout>
    )
  }
}