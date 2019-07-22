import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import StamenSource from 'ol/source/stamen';

import { layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

export class Tile extends React.Component {
  public render(){
    return (
      <div>
        <Typography variant="h4" paragraph>Tile layer</Typography>
        <Map>
          <Layers>
            <layer.Tile source={new StamenSource({ layer: 'watercolor' })}/>
          </Layers>
        </Map>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx" code={
`<Map>
  <Layers>
    <layer.Tile source={new StamenSource({ layer: 'watercolor' })}/>
  </Layers>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/tile.tsx">Source Code</a>
      </div>
    );
  }
}