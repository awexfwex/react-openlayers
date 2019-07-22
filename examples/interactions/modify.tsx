import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import GeoJSONFormat from 'ol/format/geojson';
import SelectInteraction from 'ol/interaction/select';
import VectorSource from 'ol/source/vector';
import CircleStyle from 'ol/style/circle';
import FillStyle from 'ol/style/fill';
import StrokeStyle from 'ol/style/stroke';
import Style from 'ol/style/style';

import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

const source = new VectorSource({
  url: 'https://rawgit.com/boundlessgeo/ol3-workshop/master/src/data/layers/7day-M2.5.json',
  format: new GeoJSONFormat()
});
const style = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new FillStyle({ color: [0, 153, 255, 1] }),
    stroke: new StrokeStyle({ color: [255, 255, 255, 0.75], width: 1.5 })
  }),
  zIndex: 100000
});
const selectStyle = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new FillStyle({ color: [109, 158, 61, 1] }),
    stroke: new StrokeStyle({ color: [255, 255, 255, 0.75], width: 1.5 })
  }),
  zIndex: 100000
});
const select = new SelectInteraction({style: selectStyle});

export class Modify extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Modify interaction</Typography>
        <Map>
          <Layers>
            <layer.Tile />
            <layer.Vector source={source} style={style} />
          </Layers>
          <Interactions>
            <interaction.Select instance={select} />
            <interaction.Modify features={select.getFeatures()} /> 
          </Interactions>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers>
    <layer.Tile />
    <layer.Vector source={source} style={style} />
  </Layers>
  <Interactions>
    <interaction.Select instance={select} />
    <interaction.Modify features={select.getFeatures()} /> 
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/modify.tsx">source</a>
      </div>
    );
  }
}