import React, {Component} from 'react';
import { Icon, Spin } from 'antd';

const loaderIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default class SpinGral extends Component{
  
  render(){
    return(
      <div className="spin"><Spin size={"large"} indicator={loaderIcon}/></div>
    )
  }
}
