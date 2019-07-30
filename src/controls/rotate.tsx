import * as React from 'react';

import olRotate, { Options } from 'ol/control/Rotate'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type RotateOptions = Options;
export interface RotateProps extends RotateOptions, ControlType<olRotate> {
  onChange?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface RotateEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class Rotate extends React.Component<RotateProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: olRotate;

  public options: RotateOptions = {
    className: undefined,
    label: undefined,
    tipLabel: undefined,
    duration: undefined,
    autoHide: undefined,
    render: undefined,
    resetNorth: undefined,
    target: undefined
  };

  public events: RotateEvents = {
    'change': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<RotateOptions, RotateProps>(this.options, this.props);
    this.control = new olRotate(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    })
  }

}