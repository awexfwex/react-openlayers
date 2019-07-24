import * as React from 'react';

import olPointer, { Options as PointerOptions } from 'ol/interaction/Pointer';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface PointerProps extends PointerOptions, InteractionType<olPointer> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface PointerEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class Pointer extends React.Component<PointerProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olPointer;

  public options: PointerOptions = {
    handleDownEvent: undefined,
    handleDragEvent: undefined,
    handleEvent: undefined,
    handleMoveEvent: undefined,
    handleUpEvent: undefined
  };

  public events: PointerEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<PointerOptions, PointerProps>(this.options, this.props);
    this.interaction = new olPointer(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(this.events).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: PointerProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<PointerOptions, PointerProps>(this.options, nextProps);
      this.interaction = new olPointer(options);
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

  private initInteraction(props: PointerProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}