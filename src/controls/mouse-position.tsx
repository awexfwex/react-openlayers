import * as React from 'react';

import olMousePosition from 'ol/control/mouseposition'

import { ControlType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type MousePositionOptions = control.MousePositionOptions;
export interface MousePositionProps extends MousePositionOptions, ControlType<olMousePosition> {
  onChange?: ReactOpenlayersEvent;
  onChangeCoordinateFormat?: ReactOpenlayersEvent;
  onChangeProjection?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface MousePositionEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:coordinateFormat': ReactOpenlayersEvent;
  'change:projection': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class MousePosition extends React.Component<MousePositionProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public control: olMousePosition;

  public options: MousePositionOptions = {
    className: undefined,
    coordinateFormat: undefined,
    projection: undefined,
    render: undefined,
    target: undefined,
    undefinedHTML: undefined
  };

  public events: MousePositionEvents = {
    'change': undefined,
    'change:coordinateFormat': undefined,
    'change:projection': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<MousePositionOptions, MousePositionProps>(this.options, this.props);
    this.control = new olMousePosition(options);
    this.context.controls.push(this.control)

    if (this.props.controlRef) this.props.controlRef(this.control);


    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.control.on(eventName, olEvents[eventName]);
    });
  }
}