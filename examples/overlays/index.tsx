import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import { Drawer, List, ListItem, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import sharedStyles from '../shared-styles';

import { AppOverlay } from './app-overlay';

class Overlays extends React.Component<WithStyles> {
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
            <ListItem button { ...{ to: "/overlays/overlay" }} component={Link}>
              <ListItemText primary="Overlay" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/overlays" exact component={AppOverlay} />
          <Route path="/overlays/overlay" component={AppOverlay} />
        </main>
      </div>
    );
  }
}

export default withStyles(sharedStyles, { withTheme: true })(Overlays)