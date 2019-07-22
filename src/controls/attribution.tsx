import * as React from 'react';

import olAttribution from 'ol/control/Attribution';

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type AttributionOptions = ol.olx.control.AttributionOptions;
export interface AttributionProps extends AttributionOptions, ControlType<olAttribution> {
  onChange: ReactOpenlayersEvent
  onPropertychange: ReactOpenlayersEvent
};
export interface AttributionEvents extends ReactOpenlayersEvents {
  change?: ReactOpenlayersEvent
  propertychange?: ReactOpenlayersEvent
};

export class Attribution extends React.Component<AttributionProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: olAttribution;

  public options: AttributionOptions = {
    className: undefined,
    target: undefined,
    collapsible: undefined,
    collapsed: undefined,
    tipLabel: undefined,
    label: undefined,
    collapseLabel: undefined,
    render: undefined
  };

  public events: AttributionEvents = {
    change: undefined,
    propertychange: undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<AttributionOptions, AttributionProps>(this.options, this.props);
    this.control = new olAttribution(options);
    this.context.controls.push(this.control);

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    });
  }

}