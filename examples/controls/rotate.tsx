import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import {
  control, Controls, layer, Layers, Map
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class Rotate extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Rotate control</Typography>
        <p>Use Alt+Shift+Drag to rotate the map.</p>
        <Map>
          <Layers><layer.Tile/></Layers>
          <Controls>
            <control.Rotate />
          </Controls>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.Rotate />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/rotate.tsx">source</a>
      </div>
    );
  }
}