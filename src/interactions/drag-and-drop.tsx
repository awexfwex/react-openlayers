import * as React from 'react';

import olDragAndDrop, { Options, DragAndDropEvent, DragAndDropEventType } from 'ol/interaction/DragAndDrop';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type DragAndDropOptions = Options;
export interface DragAndDropProps extends DragAndDropOptions, InteractionType<olDragAndDrop> {
  onAddfeatures?: ReactOpenlayersEvent<DragAndDropEvent>;
  onChange?: ReactOpenlayersEvent;
  onChangeActive?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface DragAndDropEvents extends ReactOpenlayersEvents {
  'addfeatures': ReactOpenlayersEvent<DragAndDropEvent>;
  'change': ReactOpenlayersEvent;
  'change:active': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class DragAndDrop extends React.Component<DragAndDropProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olDragAndDrop;

  public options: DragAndDropOptions = {
    formatConstructors: undefined,
    projection: undefined,
    target: undefined
  };

  public events: DragAndDropEvents = {
    'addfeatures': undefined,
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<DragAndDropOptions, DragAndDropProps>(this.options, this.props);
    this.interaction = new olDragAndDrop(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DragAndDropProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<DragAndDropOptions, DragAndDropProps>(this.options, nextProps);
      this.interaction = new olDragAndDrop(options);
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

  private initInteraction(props: DragAndDropProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}