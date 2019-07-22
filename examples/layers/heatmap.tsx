import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import KMLFormat from 'ol/format/kml';
import StamenSource from 'ol/source/stamen';
import VectorSource from 'ol/source/vector';

import { layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

const tileSource = new StamenSource({
  layer: 'toner'
});

const heatmapSource = new VectorSource({
  url: 'http://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
  format: new KMLFormat({
    extractStyles: false
  })
});

export class Heatmap extends React.Component {
  public render(){
    return (
      <div>
        <Typography variant="h4" paragraph>Heatmap layer</Typography>
        <Map view={{center:[0,0], zoom:1}}>
          <Layers>
            <layer.Tile source={tileSource} />
            <layer.Heatmap weight="weight" source={heatmapSource} blur={15} radius={5} />
          </Layers>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map center={[0,0]} view={{center:[0,0], zoom:1}}>
  <Layers>
    <layer.Tile source={tileSource} />
    <layer.Heatmap source={heatmapSource} blur={15} radius={5} />
  </Layers>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/heatmap.tsx">source</a>
      </div>
    );
  }
}