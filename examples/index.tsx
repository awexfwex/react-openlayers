import * as React from "react";
import * as ReactDOM from "react-dom";

import { HashRouter, Route } from 'react-router-dom';

// Material-UI
import { CssBaseline } from "@material-ui/core";

import App from './app';

ReactDOM.render((
  <>
    <CssBaseline />
    <HashRouter>
      <Route path="/" component={App} />
    </HashRouter>
  </>
), document.getElementById('app'));
