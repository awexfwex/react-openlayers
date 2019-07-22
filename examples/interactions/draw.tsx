import * as React from "react";

import { Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";

import OSMSource from 'ol/source/osm';
import VectorSource from 'ol/source/vector';

import { MapProps } from "map";
import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

const rasterTile = new OSMSource();

const vectorSource = new VectorSource({wrapX: false});

interface DrawState {
  view: MapProps['view']
  interactionType: ol.geom.GeometryType
}

export class Draw extends React.Component<{}, DrawState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      view: {
        zoom: 4,
        center: [-11000000, 4600000],
      },
      interactionType: 'Circle',
    };
  }

  public handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => this.setState({interactionType: event.target.value as ol.geom.GeometryType});

  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Draw interaction</Typography>
        <Map view={this.state.view}>
          <Layers>
            <layer.Tile source={rasterTile} />
            <layer.Vector source={vectorSource} />
          </Layers>
          <Interactions>
            <interaction.Draw
              source={vectorSource}
              type={this.state.interactionType} />
          </Interactions>
        </Map>
        <br/>
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            onChange={this.handleTypeChange}
            value={this.state.interactionType}
          >
            <MenuItem value="Point">Point</MenuItem>
            <MenuItem value="Polygon">Polygon</MenuItem>
            <MenuItem value="LineString">Line</MenuItem>
            <MenuItem value="Circle">Circle</MenuItem>
          </Select>
        </FormControl>
        <br/>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map view={this.state.view}>
  <Layers>
    <layer.Tile source={rasterTile} />
    <layer.Vector source={vectorSource} />
  </Layers>
  <Interactions>
    <interaction.Draw
      onDrawend={this.drawend}
      source={vectorSource}
      type={this.state.interactionType} />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/draw.tsx">source</a>
      </div>
    );
  }
}
