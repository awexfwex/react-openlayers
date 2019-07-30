import * as React from 'react';

import olZoomToExtent, {Options} from 'ol/control/ZoomToExtent'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type ZoomToExtentOptions = Options;
export interface ZoomToExtentProps extends ZoomToExtentOptions, ControlType<olZoomToExtent> {
  onChange?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface ZoomToExtentEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class ZoomToExtent extends React.Component<ZoomToExtentProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: olZoomToExtent;

  public options: ZoomToExtentOptions = {
    className: undefined,
    target: undefined,
    label: undefined,
    tipLabel: undefined,
    extent: undefined
  };

  public events: ZoomToExtentEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<ZoomToExtentOptions, ZoomToExtentProps>(this.options, this.props);
    this.control = new olZoomToExtent(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    })
  }
}