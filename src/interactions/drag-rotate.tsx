import * as React from 'react';

import olDragRotate, { Options as DragRotateOptions } from 'ol/interaction/DragRotate';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface DragRotateProps extends DragRotateOptions, InteractionType<olDragRotate> {
  onChange?: ReactOpenlayersEvent;
  onChangeActive?: ReactOpenlayersEvent;
  onpropertychange?: ReactOpenlayersEvent;
}

export interface DragRotateEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:active': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class DragRotate extends React.Component<DragRotateProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olDragRotate;

  public options: DragRotateProps = {
    condition: undefined,
    duration: undefined
  };

  public events: DragRotateEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<DragRotateOptions, DragRotateProps>(this.options, this.props);
    this.interaction = new olDragRotate(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DragRotateProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<DragRotateOptions, DragRotateProps>(this.options, nextProps);
      this.interaction = new olDragRotate(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      });
    }
  }

  public componentWillUnmount() {
    this.context.map.removeInteraction(this.interaction);
  }

  private initInteraction(props: DragRotateProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}