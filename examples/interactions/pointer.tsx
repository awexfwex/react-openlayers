import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import { interaction, Interactions, layer, Layers, Map } from "react-openlayers";

import Highlighter from "../Highlighter";

interface PointerState {
  action: string
}

export class Pointer extends React.Component<{}, PointerState> {
  public state: PointerState = {
    action: "No action"
  }

  public timeout: number;

  public handleEvent = (e: ol.MapBrowserPointerEvent) => {
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => this.setState({action: "No action"}), 1000);
    if (this.state.action !== e.type) {
      this.setState({ action: e.type })
    }

    return true;
  }

  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>Pointer interaction</Typography>
        <Typography variant="subtitle1">The <code>Pointer</code> interaction allows to handle mouse pointer event, such as click down, click up, mouse move and drag. You can create custom map behaviors by using those events.</Typography>
        <p><b>Pointer action : </b>{this.state.action}</p>
        <Map view={{ center: [0, 0], zoom: 2 }}>
          <Layers>
            <layer.Tile />
          </Layers>
          <Interactions>
            <interaction.Pointer
              handleDownEvent={this.handleEvent}
              handleDragEvent={this.handleEvent}
              handleMoveEvent={this.handleEvent}
              handleUpEvent={this.handleEvent}
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
  <Interactions>
    <interaction.Pointer 
      handleDownEvent={this.handleEvent}
      handleDragEvent={this.handleEvent}
      handleMoveEvent={this.handleEvent}
      handleUpEvent={this.handleEvent}
    />
  </Interactions>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/pointer.tsx">source</a>
      </div>
    );
  }
}