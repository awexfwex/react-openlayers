import * as React from 'react';

import olZoomSlider, { Options } from 'ol/control/ZoomSlider'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type ZoomSliderOptions = Options;
export interface ZoomSliderProps extends ZoomSliderOptions, ControlType<olZoomSlider> {
  onChange?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface ZoomSliderEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class ZoomSlider extends React.Component<ZoomSliderProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: olZoomSlider;

  public options: ZoomSliderOptions = {
    duration: undefined,
    className: undefined,
    render: undefined
  };

  public events: ZoomSliderEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<ZoomSliderOptions, ZoomSliderProps>(this.options, this.props);
    this.control = new olZoomSlider(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    });
  }

}