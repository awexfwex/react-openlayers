import * as React from 'react';

import olZoom from 'ol/control/zoom'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type ZoomOptions = control.ZoomOptions;
export interface ZoomProps extends ZoomOptions, ControlType<olZoom> {
  onChange?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface ZoomPropsEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};


export class Zoom extends React.Component<ZoomProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: olZoom;

  public options: ZoomOptions = {
    duration: undefined,
    className: undefined,
    zoomInLabel: undefined,
    zoomOutLabel: undefined,
    zoomInTipLabel: undefined,
    zoomOutTipLabel: undefined,
    delta: undefined
  };

  public events: ZoomPropsEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<ZoomOptions, ZoomProps>(this.options, this.props);
    this.control = new olZoom(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    });
  }
}