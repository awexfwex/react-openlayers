import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

export class DoubleClickZoom extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>DoubleClickZoom interaction</Typography>
        <Map>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions doubleClickZoom={false}>
            <interaction.DoubleClickZoom />
          </Interactions>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map>
  <Layers>
    <layer.Tile />
  </Layers>
  <Controls>
    <interaction.DoubleClickZoom />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/double-click-zoom.tsx">source</a>
      </div>
    );
  }
}