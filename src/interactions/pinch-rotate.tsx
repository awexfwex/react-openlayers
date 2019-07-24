import * as React from 'react';

import olPinchRotate, { Options as PinchRotateOptions } from 'ol/interaction/PinchRotate';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface PinchRotateProps extends PinchRotateOptions, InteractionType<olPinchRotate> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};
export interface PinchRotateEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class PinchRotate extends React.Component<PinchRotateProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olPinchRotate;

  public options: PinchRotateOptions = {
    duration: undefined,
    threshold: undefined
  };

  public events: PinchRotateEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<PinchRotateOptions, PinchRotateProps>(this.options, this.props);
    this.interaction = new olPinchRotate(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(this.events).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: PinchRotateProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<PinchRotateOptions, PinchRotateProps>(this.options, nextProps);
      this.interaction = new olPinchRotate(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(this.events).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      });
    }
  }

  public componentWillUnmount() {
    this.context.map.removeInteraction(this.interaction);
  }

  private initInteraction(props: PinchRotateProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}