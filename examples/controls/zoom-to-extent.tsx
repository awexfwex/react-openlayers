import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import {
  control, Controls, layer, Layers, Map
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class ZoomToExtent extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>ZoomToExtent control</Typography>
        <Map>
          <Layers><layer.Tile/></Layers>
          <Controls>
            <control.ZoomToExtent />
          </Controls>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.ZoomToExtent />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/zoom-to-extent.tsx">source</a>
      </div>
    );
  }
}