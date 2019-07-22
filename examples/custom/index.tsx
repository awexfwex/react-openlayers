import * as React from 'react';
import {Link, Route} from 'react-router-dom';

import { Drawer, List, ListItem, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import sharedStyles from '../shared-styles';

import {EarthquakeClusters} from './earthquake-clusters';
import {GoogleStreetViewPanorama} from './google-street-view-panorama';
import {MarkerStyle} from './marker-style';
// import {GeoCoder} from './geo-coder';

export {EarthquakeClusters} from './earthquake-clusters';
export {MarkerStyle} from './marker-style';
export {GoogleStreetViewPanorama} from './google-street-view-panorama';
// export {GeoCoder} from './geo-coder';

class Custom extends React.Component<WithStyles> {
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
          <ListItem button { ...{ to: "/custom/earthquake-clusters" }} component={Link}>
            <ListItemText primary="Earthquake clusters" />
          </ListItem>
          <ListItem button { ...{ to: "/custom/marker-style" }} component={Link}>
            <ListItemText primary="Marker style" />
          </ListItem>
          <ListItem button { ...{ to: "/custom/google-street-view-panorama" }} component={Link}>
            <ListItemText primary="Google Street View panorama" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Route path="/custom" exact component={EarthquakeClusters} />
          <Route path="/custom/earthquake-clusters" component={EarthquakeClusters} />
          <Route path="/custom/marker-style" component={MarkerStyle} />
          <Route path="/custom/google-street-view-panorama" component={GoogleStreetViewPanorama} />
          {/* <Route path="/custom/geo-code" component={GeoCoder} /> */}
      </main>
    </div>
    );
  }
}

export default withStyles(sharedStyles, { withTheme: true })(Custom)