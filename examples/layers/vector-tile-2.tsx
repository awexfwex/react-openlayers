import * as React from "react";

import MVTFormat from 'ol/format/mvt';
import olVectorTile from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import Style from 'ol/style/style';
import olTilegrid from 'ol/tilegrid';

import {stylefunction as mb2olstyle} from 'ol-mapbox-style'; // in case we use olms
// console.log('mb2olstyle', mb2olstyle)

import { layer, Layers, Map } from "react-openlayers";

// const key = 'pk.eyJ1IjoiYWxsZW5od2tpbSIsImEiOiJjajBlbzkzazYwMWh1Mndya3R2amw0ang1In0.QU0YtPQ0-IgHMLt574HGlw';
const source = new VectorTileSource({
  projection: undefined,
  attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
    '© <a href="https://www.openstreetmap.org/copyright">' +
    'OpenStreetMap contributors</a>',
  format: new MVTFormat(),
  tileGrid: olTilegrid.createXYZ({maxZoom: 22}),
  // tilePixelRatio: 16,
  url: 'https://free-0.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=tXiQqN3lIgskyDErJCeY'
  ///url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=' + key
});

const view = {
  center: [732602.1417165294, 5864590.06411005] as [number, number],
  resolution: 2445,
  maxResolution: 78271.51696402048
};

interface VectorTile2State {
  style: Style | void
}

export class VectorTile2 extends React.Component<{}, VectorTile2State> {
  public state: VectorTile2State = {
    style: undefined
  };

  public addLayerStyle = (l: olVectorTile) => {
    fetch('https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json')
      .then((response: Response) => {
        // tslint:disable-next-line
        response.json().then((glStyle: any) => {
          const styleFunc = mb2olstyle.default(glStyle, 'openmaptiles');
          l.setStyle(styleFunc);
          // applyStyle(layer, glStyle, 'openmaptiles').then(function() {
          //   console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
          //   // map.addLayer(layer);
          // });
        });
      });
  }

  public render() {
    return (
      <div>
        <Map view={view}>
          <Layers>
            <layer.VectorTile source={source} layerRef={this.addLayerStyle} />
          </Layers>
        </Map>
      </div>
    );
  }
}

