import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

const angleThreshold = Math.PI * 30 / 180;

export class PinchRotate extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>PinchRotate interaction</Typography>
        <Typography variant="subtitle1">This example have disabled default <code>PinchRotate</code> interaction to provide one that require a minimum of 30deg rotation before rotating the view.</Typography>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions pinchRotate={false} pinchZoom={false}>
            <interaction.PinchRotate threshold={angleThreshold}/>
          </Interactions>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{ center: [0, 0], zoom: 2 }}>
  <Layers>
    <layer.Tile />
  </Layers>
  <Interactions pinchRotate={false} pinchZoom={false}>
    <interaction.PinchRotate threshold={30 * Math.PI / 180}/>
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/pinch-rotate.tsx">source</a>
      </div>
    );
  }
}