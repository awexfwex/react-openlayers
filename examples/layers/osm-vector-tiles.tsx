import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import Attribution from 'ol/attribution';
import olFeature from 'ol/feature';
import TopoJSONFormat from 'ol/format/topojson';
import olProj from 'ol/proj';
import VectorTileSource from 'ol/source/vectortile';
import FillStyle from 'ol/style/fill';
import StrokeStyle from 'ol/style/stroke';
import Style from 'ol/style/style';
import olTilegrid from 'ol/tilegrid';

import { layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

const key = 'mapzen-2pRGhe5';

const attribution = [new Attribution({
  html: '&copy; OpenStreetMap contributors, Who’s On First, Natural Earth, and openstreetmapdata.com'
})];
const format = new TopoJSONFormat();
const tileGrid = olTilegrid.createXYZ({ maxZoom: 19 });
const roadStyleCache = {};
const roadColor = {
  'major_road': '#776',
  'minor_road': '#ccb',
  'highway': '#f39'
};
const buildingStyle = new Style({
  fill: new FillStyle({
    color: '#666',
    // opacity: 0.4
  }),
  stroke: new StrokeStyle({
    color: '#444',
    width: 1
  })
});

const source1 = new VectorTileSource({
  projection: undefined,
  attributions: attribution,
  format: format,
  tileGrid: tileGrid,
  url: `https://tile.mapzen.com/mapzen/vector/v1/water/{z}/{x}/{y}.topojson?api_key=${key}`
});
const style1 = new Style({
  fill: new FillStyle({
    color: '#9db9e8'
  })
});
const source2 = new VectorTileSource({
  projection: undefined,
  attributions: attribution,
  format: format,
  tileGrid: tileGrid,
  url: `https://tile.mapzen.com/mapzen/vector/v1/roads/{z}/{x}/{y}.topojson?api_key=${key}`
});
const style2 = (feature: olFeature) => {
  const kind = feature.get('kind');
  const railway = feature.get('railway');
  const sortKey = feature.get('sort_key');
  const styleKey = `${kind}/${railway}/${sortKey}`;

  let style = roadStyleCache[styleKey];
  
  if (!style) {
    let color;
    let width;
    if (railway) {
      color = '#7de';
      width = 1;
    } else {
      color = roadColor[kind];
      width = kind === 'highway' ? 1.5 : 1;
    }
    style = new Style({
      stroke: new StrokeStyle({
        color: color,
        width: width
      }),
      zIndex: sortKey
    });
    roadStyleCache[styleKey] = style;
  }

  return style;
};
const source3 = new VectorTileSource({
  projection: undefined,
  attributions: attribution,
  format: format,
  tileGrid: tileGrid,
  url: `https://tile.mapzen.com/mapzen/vector/v1/buildings/{z}/{x}/{y}.topojson?api_key=${key}`
});
const style3 = (_f: olFeature, resolution: number) => {
  return (resolution < 10) ? buildingStyle : new Style();
};


export class OSMVectorTiles extends React.Component {
  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>OSM Vector Tiles layer</Typography>
        <Map view={{ center: olProj.fromLonLat([-74.0064, 40.7142]), maxZoom: 19, zoom: 15 }}>
          <Layers>
            <layer.VectorTile source={source1} style={style1} />
            <layer.VectorTile source={source2} style={style2} />
            <layer.VectorTile source={source3} style={style3} />
          </Layers>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map view={{center: olProj.fromLonLat([-74.0064, 40.7142]), maxZoom: 19, zoom: 15 }}>
  <Layers>
    <layer.VectorTile source={source1} style={style1} />
    <layer.VectorTile source={source2} style={style2} />
    <layer.VectorTile source={source3} style={style3} />
  </Layers>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/osm-vector-tiles.tsx">Source Code</a>
      </div>
    );
  }
}
