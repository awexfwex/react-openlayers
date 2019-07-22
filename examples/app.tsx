import * as React from 'react';
import { Route } from 'react-router-dom';
import './app.css';

// Material-UI
import {
  AppBar,
  Button,
  createStyles,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';

import Controls from './controls';
import Custom from './custom';
import Interactions from './interactions';
import Layers from './layers';
import Overlays from './overlays';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    justifyContent: "space-between"
  }
})

class App extends React.Component<WithStyles> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap>react-openlayers</Typography>
            <div>
              <Button color="inherit" href="#/layers">Layers</Button>
              <Button color="inherit" href="#/controls">Controls</Button>
              <Button color="inherit" href="#/overlays">Overlays</Button>
              <Button color="inherit" href="#/interactions">Interactions</Button>
              <Button color="inherit" href="#/custom">Custom examples</Button>
            </div>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={Layers}/>
        <Route path="/layers" component={Layers}/>
        <Route path="/controls" component={Controls}/>
        <Route path="/interactions" component={Interactions}/>
        <Route path="/overlays" component={Overlays}/>
        <Route path="/custom" component={Custom} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App)