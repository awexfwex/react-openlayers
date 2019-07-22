import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import {
  control, Controls, //name spaces
  layer, Layers, //group
  Map //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class MousePosition extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>MousePosition control</Typography>
        <Map>
          <Layers><layer.Tile/></Layers>
          <Controls>
            <control.MousePosition projection="EPSG:3857"/>
          </Controls>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.MousePosition projection="EPSG:3857"/>
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/mouse-position.tsx">source</a>
      </div>
    );
  }
}