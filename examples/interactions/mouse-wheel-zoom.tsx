import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

export class MouseWheelZoom extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>MouseWheelZoom interaction</Typography>
        <Typography variant="subtitle1">This example have disabled default <code>MouseWheel</code> interaction, and replace it with a customized one having a logner duration for a slower zoom.</Typography>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions mouseWheelZoom={false}>
            <interaction.MouseWheelZoom
              duration={2000}
            />
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
  <Interactions mouseWheelZoom={false}>
    <interaction.MouseWheelZoom
      duration={2000}
    />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/mouse-wheel-zoom.tsx">source</a>
      </div>
    );
  }
}