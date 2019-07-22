import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import {
  control, Controls, //name spaces
  layer, Layers, //group
  Map //objects
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class FullScreen extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>FullScreen control</Typography>
        <Map>
          <Layers><layer.Tile /></Layers>
          <Controls>
            <control.FullScreen />
          </Controls>
        </Map>
        <br />
        <Divider />
        <br />
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.FullScreen />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/full-screen.tsx">source</a>
      </div>
    );
  }
}