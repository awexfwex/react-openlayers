import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

export class PinchZoom extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>PinchZoom interaction</Typography>
        <Typography variant="subtitle1" >This example have disabled default <code>PinchZoom</code> interaction to provide one that zoom to the closest integer zoom level after gesture ends.</Typography>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions pinchRotate={false} pinchZoom={false}>
            <interaction.PinchZoom constrainResolution={true}/>
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
    <interaction.PinchZoom constrainResolution={true}/>
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/pinch-zoom.tsx">source</a>
      </div>
    );
  }
}