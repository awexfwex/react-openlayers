import * as React from 'react';
import {Link, Route} from 'react-router-dom';

import { Drawer, List, ListItem, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import sharedStyles from '../shared-styles';

import {Heatmap} from './heatmap';
import {Image} from './image';
import {OSMVectorTiles} from './osm-vector-tiles';
import {Tile} from './tile';
import {Vector} from './vector';
import {VectorTile} from './vector-tile';
import {VectorTile2} from './vector-tile-2';

export {Tile} from './tile';
export {Vector} from './vector';
export {Heatmap} from './heatmap';
export {Image} from './image';
export {VectorTile} from './vector-tile';
export {VectorTile2} from './vector-tile-2';
export {OSMVectorTiles} from './osm-vector-tiles';

class Layers extends React.Component<WithStyles> {
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
            <ListItem button { ...{ to: "/layers/tile" }} component={Link}>
              <ListItemText primary="Tile" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/vector" }} component={Link}>
              <ListItemText primary="Vector" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/vector-tile" }} component={Link}>
              <ListItemText primary="Vector Tile" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/osm-vector-tiles" }} component={Link}>
              <ListItemText primary="OSM Vector Tiles" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/heatmap" }} component={Link}>
              <ListItemText primary="Heatmap" />
            </ListItem>
            <ListItem button { ...{ to: "/layers/image" }} component={Link}>
              <ListItemText primary="Image" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/" exact component={Tile} />
          <Route path="/layers" exact component={Tile} />
          <Route path="/layers/tile" component={Tile} />
          <Route path="/layers/vector" component={Vector} />
          <Route path="/layers/heatmap" component={Heatmap} />
          <Route path="/layers/image" component={Image} />
          <Route path="/layers/vector-tile" component={VectorTile} />
          <Route path="/layers/vector-tile-2" component={VectorTile2} />
          <Route path="/layers/osm-vector-tiles" component={OSMVectorTiles} />
        </main>
      </div>
    );
  }
}

export default withStyles(sharedStyles, { withTheme: true })(Layers)
