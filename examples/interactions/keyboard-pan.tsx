import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import olEventConditions from 'ol/events/condition';

import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

export class KeyboardPan extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>KeyboardPan interaction</Typography>
        <Typography variant="subtitle1">This example have disabled default <code>KeyboardPan</code> interaction which use arrow keys, but it implements one that force you to use <code>CTRL + [Arrow key]</code> to pan the map.</Typography>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions keyboard={false}>
            <interaction.KeyboardZoom />
            <interaction.KeyboardPan
              condition={olEventConditions.platformModifierKeyOnly}
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
  <Interactions keyboard={false}>
    <interaction.KeyboardZoom />
    <interaction.KeyboardPan
      condition={olEventConditions.platformModifierKeyOnly}
    />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/keyboard-pan.tsx">source</a>
      </div>
    );
  }
}