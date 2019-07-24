import * as React from 'react';

import olDragBox, { Options as DragBoxOptions } from 'ol/interaction/DragBox';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface DragBoxProps extends interaction.DragBoxOptions, InteractionType<olDragBox> {
  onBoxdrag?: ReactOpenlayersEvent<ol.interaction.DragBox.Event>;
  onBoxend?: ReactOpenlayersEvent<ol.interaction.DragBox.Event>;
  onBoxstart?: ReactOpenlayersEvent<ol.interaction.DragBox.Event>;
  onChange?: ReactOpenlayersEvent;
  onChangeActive?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface DragBoxEvents extends ReactOpenlayersEvents {
  'boxdrag': ReactOpenlayersEvent<ol.interaction.DragBox.Event>;
  'boxend': ReactOpenlayersEvent<ol.interaction.DragBox.Event>;
  'boxstart': ReactOpenlayersEvent<ol.interaction.DragBox.Event>;
  'change': ReactOpenlayersEvent;
  'change:active': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class DragBox extends React.Component<DragBoxProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olDragBox;

  public options: DragBoxOptions = {
    className: undefined,
    condition: undefined,
    boxEndCondition: undefined
  };

  public events: DragBoxEvents = {
    'boxdrag': undefined,
    'boxend': undefined,
    'boxstart': undefined,
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<DragBoxOptions, DragBoxProps>(this.options, this.props);
    this.interaction = new olDragBox(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DragBoxProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<DragBoxOptions, DragBoxProps>(this.options, nextProps);
      this.interaction = new olDragBox(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      })
    }
  }

  public componentWillUnmount() {
    this.context.map.removeInteraction(this.interaction);
  }

  private initInteraction(props: DragBoxProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}