import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import {
  control, Controls, layer, Layers, Map
} from "react-openlayers";

import Highlighter from "../Highlighter";

export class OverviewMap extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>OverviewMap control</Typography>
        <Map>
          <Layers><layer.Tile/></Layers>
          <Controls>
            <control.OverviewMap />
          </Controls>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers><layer.Tile/></Layers>
  <Controls>
    <control.OverviewMap />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/overview-map.tsx">source</a>
      </div>
    );
  }
}