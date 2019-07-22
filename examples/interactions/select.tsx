import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import VectorSource from 'ol/source/vector';

import { custom, interaction, Interactions, layer, Layers, Map, Util } from "react-openlayers";

import Highlighter from "../Highlighter";

const iconFeature = new Feature(new Point([0, 0]));
const source = new VectorSource({features: [iconFeature]});
const marker = new custom.style.MarkerStyle(
  'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
);
marker.style.getImage().setOpacity(0.5);

const selectedMarkerStyle = Util.cloneStyle(marker.style);
selectedMarkerStyle.getImage().setOpacity(1);

export class Select extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Select interaction</Typography>
        <Map>
          <Layers>
            <layer.Tile />
            <layer.Vector source={source} style={marker.style} />
          </Layers>
          <Interactions>
            <interaction.Select style={selectedMarkerStyle} />
          </Interactions>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map>
  <Layers>
    <layer.Tile />
    <layer.Vector source={markers} style={markers.style} />
  </Layers>
  <Interactions>
    <interaction.Select style={selectedMarkerStyle} />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/select.tsx">source</a>
      </div>
    );
  }
}