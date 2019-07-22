import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import KMLFormat from 'ol/format/kml';
import ClusterSource from 'ol/source/cluster';
import StamenSource from 'ol/source/stamen';
import VectorSource from 'ol/source/vector';

import {
  custom, interaction, Interactions, layer, Layers, Map
} from "react-openlayers";

import Highlighter from "../Highlighter";

const vectorSource= new ClusterSource({
  distance: 40,
  source: new VectorSource({
    url: 'http://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
    format: new KMLFormat({
      extractStyles: false
    })
  })
});

const tileSource = new StamenSource({
  layer: 'toner'
});

const selectCondition = (evt: ol.MapBrowserEvent) => {
  return evt.originalEvent.type === 'mousemove' ||
    evt.type === 'singleclick';
};

const cluster = new custom.style.ClusterStyle(vectorSource);

export class EarthquakeClusters extends React.Component {
  public render(){
    return (
      <div>
        <Typography variant="h4" paragraph>Earthquake clusters</Typography>
        <Typography variant="subtitle1">This example parses a KML file and renders the features as clusters on a vector layer. The styling in this example is quite involved. Single earthquake locations (rendered as stars) have a size relative to their magnitude. Clusters have an opacity relative to the number of features in the cluster, and a size that represents the extent of the features that make up the cluster. When clicking or hovering on a cluster, the individual features that make up the cluster will be shown.
        To achieve this, we make heavy use of style functions and <code>ol.style.Style#geometry.</code></Typography>
        <Map view={{center: [0,0], zoom:2}}>
          <Interactions>
            <interaction.Select
             condition={selectCondition} 
             style={cluster.selectStyleFunction} />
          </Interactions>
          <Layers>
            <layer.Tile source={tileSource}/>
            <layer.Vector 
              source={vectorSource} 
              style={cluster.vectorStyleFunction}/>
          </Layers>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{center: [0,0], zoom:2}}>
  <Interactions>
    <interaction.Select
      condition={selectCondition} 
      style={cluster.selectStyleFunction} />
  </Interactions>
  <Layers>
    <layer.Tile source={tileSource}/>
    <layer.Vector 
      source={vectorSource} 
      style={cluster.vectorStyleFunction}/>
  </Layers>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/custom/earthquake-clusters.tsx">source</a>
      </div>
    );
  }
}