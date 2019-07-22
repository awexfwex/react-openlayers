import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import olEventConditions from 'ol/events/condition';

import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

export class DragZoom extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>DragZoom interaction</Typography>
        <Typography variant="subtitle1">This example have disabled default <code>DragZoom</code> interaction using <code>SHIFT + Drag</code>, but it implements one that force you to use <code>CTRL + Drag</code> to select an area to zoom.</Typography>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions shiftDragZoom={false}>
            <interaction.DragZoom
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
  <Interactions shiftDragZoom={false}>
    <interaction.DragZoom
      condition={olEventConditions.platformModifierKeyOnly}
    />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/drag-zoom.tsx">source</a>
      </div>
    );
  }
}