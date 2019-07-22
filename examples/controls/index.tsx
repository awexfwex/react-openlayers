import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import { Drawer, List, ListItem, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import sharedStyles from '../shared-styles';

import { Attribution } from './attribution';
import { FullScreen } from './full-screen';
import { MousePosition } from './mouse-position';
import { OverviewMap } from './overview-map';
import { Rotate } from './rotate';
import { ScaleLine } from './scale-line';
import { Zoom } from './zoom';
import { ZoomSlider } from './zoom-slider';
import { ZoomToExtent } from './zoom-to-extent';

export { Attribution } from './attribution';
export { FullScreen } from './full-screen';
export { MousePosition } from './mouse-position';
export { OverviewMap } from './overview-map';
export { Rotate } from './rotate';
export { ScaleLine } from './scale-line';
export { ZoomSlider } from './zoom-slider';
export { ZoomToExtent } from './zoom-to-extent';
export { Zoom } from './zoom';

class Controls extends React.Component<WithStyles> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.categoryRoot}>
        <Drawer open
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper
          }}
        >
           <div className={classes.toolbar} />
          <List>
            <ListItem button component={Link} { ...{ to: "/controls/attribution" }}>
              <ListItemText primary="Attribution" />
            </ListItem>
            <ListItem button component={Link} { ...{ to: "/controls/full-screen" }}>
              <ListItemText primary="FullScreen" />
            </ListItem>
            <ListItem button component={Link} { ...{ to: "/controls/mouse-position" }}>
              <ListItemText primary="MousePosition" />
            </ListItem>
            <ListItem button component={Link} { ...{ to: "/controls/overview-map" }}>
              <ListItemText primary="OverviewMap" />
            </ListItem>
            <ListItem button component={Link} { ...{ to: "/controls/rotate" }}>
              <ListItemText primary="Rotate" />
            </ListItem>
            <ListItem button component={Link} { ...{ to: "/controls/scale-line" }}>
              <ListItemText primary="ScaleLine" />
            </ListItem>
            <ListItem button component={Link} { ...{ to: "/controls/zoom-slider" }}>
              <ListItemText primary="ZoomSlider" />
            </ListItem>
            <ListItem button component={Link} { ...{ to: "/controls/zoom-to-extent" }}>
              <ListItemText primary="ZoomToExtent" />
            </ListItem>
            <ListItem button component={Link} { ...{ to: "/controls/zoom" }}>
              <ListItemText primary="Zoom" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/controls" exact component={Attribution} />
          <Route path="/controls/attribution" component={Attribution} />
          <Route path="/controls/full-screen" component={FullScreen} />
          <Route path="/controls/mouse-position" component={MousePosition} />
          <Route path="/controls/overview-map" component={OverviewMap} />
          <Route path="/controls/rotate" component={Rotate} />
          <Route path="/controls/scale-line" component={ScaleLine} />
          <Route path="/controls/zoom-slider" component={ZoomSlider} />
          <Route path="/controls/zoom-to-extent" component={ZoomToExtent} />
          <Route path="/controls/zoom" component={Zoom} />
        </main>
      </div>
    );
  }
}

export default withStyles(sharedStyles, { withTheme: true })(Controls)
