import React, { Component, Fragment } from 'react';
import "antd/dist/antd.css";
import Routes from './routes';

import BrowserRouter from "react-router-dom/es/BrowserRouter";

import HeaderGral from "./containers/HeaderGral";


class App extends Component {

  render() {
    return (
      <BroserRouter>
        <Fragment>
          <HeaderGral/>

        </Fragment>
      </BroserRouter>
    );
  }
}

export default App;
