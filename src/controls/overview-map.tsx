import * as React from 'react';

import olOverviewMap from 'ol/control/overviewmap'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type OverviewMapOptions = control.OverviewMapOptions;
export interface OverviewMapProps extends OverviewMapOptions, ControlType<olOverviewMap> {
  onChange?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface OverviewMapEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class OverviewMap extends React.Component<OverviewMapProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: olOverviewMap;

  public options: OverviewMapOptions = {
    collapsed: undefined,
    collapseLabel: undefined,
    collapsible: undefined,
    label: undefined,
    layers: undefined,
    render: undefined,
    target: undefined,
    tipLabel: undefined,
    view: undefined
  };

  public events: OverviewMapEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<OverviewMapOptions, OverviewMapProps>(this.options, this.props);
    this.control = new olOverviewMap(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    });
  }

}