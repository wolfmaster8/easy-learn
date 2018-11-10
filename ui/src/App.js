import React, { Component } from 'react';
import "antd/dist/antd.css";
import './assets/css/main.css';
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import {HeaderGral, FooterGral} from "./containers/";
import Routes from "./routes";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <HeaderGral/>
            <Routes />
          <FooterGral/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
